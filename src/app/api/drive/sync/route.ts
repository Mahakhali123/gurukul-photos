import { NextResponse } from 'next/server';
import { syncDriveNow } from '@/lib/drive';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const status = await syncDriveNow();
    return NextResponse.json({
      success: true,
      message: 'Drive cache refreshed successfully',
      data: status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync with Google Drive' },
      { status: 500 }
    );
  }
}
