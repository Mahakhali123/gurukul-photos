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
      {/* Pinterest-style masonry: 2 cols mobile, 3 sm, 4 xl — cards carry
          their own bottom margin + break-inside-avoid for the stagger */}
      <div className="columns-2 sm:columns-3 xl:columns-4 gap-3 sm:gap-4">
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
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-[32px] bg-[#17171c] hover:bg-black text-white text-[14px] font-medium px-8 py-3 min-h-[48px]"
          >
            Load more ({photos.length - visibleCount} remaining)
          </button>
          <p className="text-[12px] text-[#93939f]">
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
