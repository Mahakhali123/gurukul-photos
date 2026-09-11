import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ label = 'Loading photos...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#17171c]`} />
      {label && <p className="text-[14px] text-[#616161] animate-pulse">{label}</p>}
    </div>
  );
}

export function PhotoSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden bg-slate-200/80 animate-pulse aspect-[4/3] flex flex-col justify-end p-3"
        >
          <div className="h-4 bg-slate-300 rounded w-3/4 mb-1.5" />
          <div className="h-3 bg-slate-300 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
