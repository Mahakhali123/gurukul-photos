'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cloud, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { DriveSyncStatus } from '@/types';

export function DriveStatusBanner() {
  const [status, setStatus] = useState<DriveSyncStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/drive/status');
      const data = await res.json();
      if (data.success) {
        setStatus(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSync = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch('/api/drive/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setStatus(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!status || isDismissed) return null;

  return (
    <div className="bg-[#EFF2F6] text-[#212529] text-[12px] leading-4 py-2.5 px-4 border-b border-[#e9ecef]">
      <div className="max-w-[1140px] mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {status.isConfigured ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#d1e7dd] text-[#0f5132] border border-[#a3cfbb]">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Google Drive Live
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#fff3cd] text-[#664d03] border border-[#ffec99]">
              <AlertCircle className="w-3 h-3 mr-1" />
              Drive Setup Required
            </span>
          )}
          <span className="hidden sm:inline text-[#6c757d]">
            {status.totalPhotos > 0
              ? `${status.totalPhotos} photos • ${status.totalVideos} videos • ${status.totalAudios || 0} audios • ${status.totalAlbums} albums • All folders synced — pagination fixed (pageSize=1000, nextPageToken)`
              : `Target Folder: 1Dh9AjndTTraanzUak4bPKO4mJe71IJux • Add GOOGLE_DRIVE_API_KEY for >50 per folder`}
          </span>
        </div>

        <div className="flex items-center space-x-3 ml-auto">
          <button
            onClick={handleSync}
            disabled={loading}
            className="inline-flex items-center space-x-1 text-[#212529] hover:text-[#CC0000] transition-colors bg-white hover:bg-[#EFF2F6] border border-[#ced4da] px-2.5 py-1 rounded text-[12px]"
            title="Sync latest photos from Drive"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-[#CC0000]' : ''}`} />
            <span>{loading ? 'Syncing…' : 'Sync'}</span>
          </button>

          <Link href="/admin" className="text-[#CC0000] hover:underline font-medium text-[12px]">
            {status.isConfigured ? 'Settings' : 'Connect API Key →'}
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-[#6c757d] hover:text-[#212529] text-[16px] leading-none pl-1"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
