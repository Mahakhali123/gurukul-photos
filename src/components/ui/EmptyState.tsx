import React from 'react';
import Link from 'next/link';
import { ImageOff, RefreshCw, Cloud, UploadCloud, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function EmptyState({
  title = 'No photos yet',
  description = 'Upload photos or create albums to display them here.',
  onReset,
  resetLabel = 'Refresh Gallery',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center max-w-lg mx-auto bg-white rounded-[22px] border border-[#d9d9dd]">
      <div className="w-16 h-16 rounded-[8px] bg-[#eeece7] border border-[#d9d9dd] flex items-center justify-center text-[#17171c] mb-4">
        <UploadCloud className="w-8 h-8" />
      </div>
      <h3 className="text-[24px] text-[#212121] mb-2">{title}</h3>
      <p className="text-[14px] text-[#616161] mb-6 leading-[1.5]">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-[32px] bg-[#17171c] text-white text-[14px] font-medium transition"
        >
          <Cloud className="w-4 h-4" />
          <span>View Collection</span>
        </a>

        {onReset ? (
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-[32px] bg-[#eeece7] hover:bg-[#d9d9dd] text-[#212121] text-[14px] font-medium transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{resetLabel}</span>
          </button>
        ) : (
          <Link
            href="/admin"
            className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-[32px] bg-[#eeece7] hover:bg-[#d9d9dd] text-[#212121] text-[14px] font-medium transition"
          >
            <span>Settings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function ErrorMessage({
  message = 'Unable to load photos.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto bg-white rounded-[22px] border border-[#d9d9dd]">
      <div className="w-16 h-16 rounded-[8px] bg-[#eeece7] border border-[#d9d9dd] flex items-center justify-center text-[#75758a] mb-4">
        <ImageOff className="w-8 h-8" />
      </div>
      <h3 className="text-[24px] text-[#212121] mb-2">Notice</h3>
      <p className="text-[14px] text-[#616161] mb-6 leading-[1.5]">{message}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-[32px] bg-[#17171c] text-white text-[14px] font-medium transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Sync</span>
          </button>
        )}

        <Link
          href="/admin"
          className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-[32px] bg-[#eeece7] text-[#212121] text-[14px] font-medium transition"
        >
          <span>Configure API Key</span>
        </Link>
      </div>
    </div>
  );
}
