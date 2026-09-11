import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

// Stream a Drive file without buffering it in serverless memory.
// Forwards the Range header so mobile <video> can seek, and passes
// through Content-Type / Content-Length / Content-Range.
async function streamDriveUrl(
  driveUrl: string,
  fileName: string,
  rangeHeader: string | null,
  asAttachment: boolean
): Promise<NextResponse | null> {
  try {
    const headers: Record<string, string> = {
      // Drive blocks non-browser UAs in some cases
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };
    if (rangeHeader) headers['Range'] = rangeHeader;

    const directRes = await fetch(driveUrl, { headers, redirect: 'follow' });
    if (!directRes.ok && directRes.status !== 206) return null;

    const contentType =
      directRes.headers.get('content-type') || 'application/octet-stream';
    // Never stream an HTML error / virus-scan interstitial as video bytes
    if (contentType.includes('text/html')) return null;
    if (!directRes.body) return null;

    const passthrough: Record<string, string> = {
      'Content-Type': contentType,
      'Accept-Ranges': directRes.headers.get('accept-ranges') || 'bytes',
      'Cache-Control': 'private, max-age=3600',
      'Content-Disposition': asAttachment
        ? `attachment; filename="${encodeURIComponent(fileName)}"`
        : `inline; filename="${encodeURIComponent(fileName)}"`,
    };
    const len = directRes.headers.get('content-length');
    if (len) passthrough['Content-Length'] = len;
    const cr = directRes.headers.get('content-range');
    if (cr) passthrough['Content-Range'] = cr;

    return new NextResponse(directRes.body, {
      status: directRes.status === 206 ? 206 : 200,
      headers: passthrough,
    });
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    const fileName = searchParams.get('name') || `gurukul_media_${fileId}`;
    // ?mode=stream -> inline (for <video> seeking), default -> attachment (download button)
    const mode = searchParams.get('mode');
    const asAttachment = mode !== 'stream';
    const rangeHeader = request.headers.get('range');

    if (!fileId) {
      return new NextResponse('Missing file ID', { status: 400 });
    }

    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // If using Service Account — stream without buffering so Vercel
    // doesn't OOM on large videos. Forward Range for seeking.
    if (clientEmail && privateKey) {
      try {
        const auth = new google.auth.JWT({
          email: clientEmail,
          key: privateKey,
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        const token = await auth.authorize();
        const accessToken = (token as any)?.access_token;
        if (accessToken) {
          const gHeaders: Record<string, string> = {
            Authorization: `Bearer ${accessToken}`,
          };
          if (rangeHeader) gHeaders['Range'] = rangeHeader;
          const gRes = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
            { headers: gHeaders, redirect: 'follow' }
          );
          if ((gRes.ok || gRes.status === 206) && gRes.body) {
            const ct = gRes.headers.get('content-type') || 'application/octet-stream';
            if (!ct.includes('text/html')) {
              const h: Record<string, string> = {
                'Content-Type': ct,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'private, max-age=3600',
                'Content-Disposition': asAttachment
                  ? `attachment; filename="${encodeURIComponent(fileName)}"`
                  : `inline; filename="${encodeURIComponent(fileName)}"`,
              };
              const cl = gRes.headers.get('content-length');
              if (cl) h['Content-Length'] = cl;
              const cr = gRes.headers.get('content-range');
              if (cr) h['Content-Range'] = cr;
              return new NextResponse(gRes.body, {
                status: gRes.status === 206 ? 206 : 200,
                headers: h,
              });
            }
          }
        }
      } catch (e) {
        console.warn('Service-account stream failed, trying public URLs', e);
      }
      // fall through to public URLs below
    }

    // Stream (no blob() buffering) — tries direct Google endpoints in order.
    // drive.usercontent.google.com is first: it supports Range seeks and
    // works for "Anyone with link" files without any API key, which is why
    // localhost (with key) and Vercel (without key) behave differently.
    const driveUrls = [
      `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      // export=view serves bytes INLINE (no attachment disposition): extra
      // candidate for <video>/<audio> stream mode when download endpoints
      // return a virus-scan HTML page instead of media bytes.
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      ...(apiKey
        ? [`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`]
        : []),
      `https://lh3.googleusercontent.com/d/${fileId}`,
    ];

    for (const driveUrl of driveUrls) {
      const streamed = await streamDriveUrl(driveUrl, fileName, rangeHeader, asAttachment);
      if (streamed) return streamed;
    }

    // Final fallback: redirect to Drive viewer (still website-initiated)
    return NextResponse.redirect(`https://drive.google.com/uc?export=download&id=${fileId}`);
  } catch (error: any) {
    console.error('Download error:', error);
    return new NextResponse(error?.message || 'Failed to download file', { status: 500 });
  }
}
