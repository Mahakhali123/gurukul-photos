import { NextResponse } from 'next/server';
import { getDriveAlbums } from '@/lib/drive';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET() {
  try {
    const albums = await getDriveAlbums();
    return NextResponse.json({
      success: true,
      data: albums,
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}
