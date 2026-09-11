'use client';

import React, { useState } from 'react';
import { DriveFile } from '@/types';
import { PhotoCard } from './PhotoCard';
import { PhotoLightbox } from './PhotoLightbox';
import { EmptyState } from '../ui/EmptyState';

interface PhotoGridProps {
  photos: DriveFile[];
  onResetFilters?: () => void;
}

export function PhotoGrid({ photos, onResetFilters }: PhotoGridProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  // Incremental render: mobile browsers choke rendering 1000+ <img> at once.
  // Show 30 first, then 30 more per tap. Lightbox keeps full-list navigation.
  const PAGE_SIZE = 30;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [photos]);

  if (photos.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  const visiblePhotos = photos.slice(0, visibleCount);

  return (
    <>
      {/* Apple grid: 2 cols mobile, 3 sm, 4 lg - tighter gap on phones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {visiblePhotos.map((photo) => {
          const fullIndex = photos.indexOf(photo);
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={fullIndex}
              onClick={(i) => setActiveLightboxIndex(i)}
            />
          );
        })}
      </div>

      {visibleCount < photos.length && (
        <div className="flex flex-col items-center gap-2 pt-6 pb-2">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#CC0000] hover:bg-[#a00000] text-white text-[15px] font-semibold px-8 py-3 min-h-[48px]"
          >
            Load more ({photos.length - visibleCount} remaining)
          </button>
          <p className="text-xs text-slate-500">
            Showing {visibleCount} of {photos.length}
          </p>
        </div>
      )}

      {/* Lightbox Viewer */}
      <PhotoLightbox
        photos={photos}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(idx) => setActiveLightboxIndex(idx)}
      />
    </>
  );
}
