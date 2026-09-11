import React from 'react';
import Link from 'next/link';
import { ImageOff, SearchX, RefreshCw, Cloud, UploadCloud, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 shadow-soft">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-gurukul-saffron-500 mb-4 shadow-soft">
        <UploadCloud className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl saffron-gradient text-white text-xs font-bold shadow-md hover:shadow-lg transition"
        >
          <Cloud className="w-4 h-4" />
          <span>View Collection</span>
        </a>

        {onReset ? (
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{resetLabel}</span>
          </button>
        ) : (
          <Link
            href="/admin"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
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
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-soft">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-4 shadow-soft">
        <ImageOff className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">Notice</h3>
      <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">{message}</p>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl saffron-gradient text-white text-xs font-semibold shadow-md transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Sync</span>
          </button>
        )}

        <Link
          href="/admin"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
        >
          <span>Configure API Key</span>
        </Link>
      </div>
    </div>
  );
}
