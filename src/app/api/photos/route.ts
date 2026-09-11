import { NextRequest, NextResponse } from 'next/server';
import { getDrivePhotos } from '@/lib/drive';
import { PhotoCategory } from '@/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get('albumId') || undefined;
    const category = (searchParams.get('category') as PhotoCategory) || undefined;
    const mediaType = (searchParams.get('mediaType') as 'all' | 'image' | 'video' | 'audio') || (searchParams.get('type') as 'all' | 'image' | 'video' | 'audio') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = (searchParams.get('sortBy') as 'newest' | 'oldest' | 'name') || 'newest';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;

    let photos = await getDrivePhotos({ albumId, category, mediaType, search, sortBy });

    const total = photos.length;

    if (limit) {
      const startIndex = (page - 1) * limit;
      photos = photos.slice(startIndex, startIndex + limit);
    }

    return NextResponse.json({
      success: true,
      data: photos,
      pagination: {
        total,
        page,
        limit: limit || total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      }
    }, {
      // Vercel Edge caches this for 5 min + serves stale for 10 min while
      // revalidating — repeat visits never trigger a full Drive crawl.
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
