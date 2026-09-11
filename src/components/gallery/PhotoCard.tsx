'use client';

import React, { useState } from 'react';
import { Download, Music } from 'lucide-react';
import { DriveFile } from '@/types';

interface PhotoCardProps {
  photo: DriveFile;
  index: number;
  onClick: (index: number) => void;
}

export function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
  const fallbackUnsplash = 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop';
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(photo.thumbnailLink || photo.directUrl || fallbackUnsplash);
  const [fallbackStep, setFallbackStep] = useState(0);

  const isVideo = photo.mediaType === 'video';
  const isAudio = photo.mediaType === 'audio';

  const handleImgError = () => {
    if (fallbackStep === 0) {
      setFallbackStep(1);
      setImgSrc(`https://drive.google.com/thumbnail?id=${photo.id}&sz=w800`);
    } else if (fallbackStep === 1) {
      setFallbackStep(2);
      setImgSrc(`https://drive.google.com/uc?export=view&id=${photo.id}`);
    } else if (fallbackStep === 2) {
      setFallbackStep(3);
      // Try lh3 with different size
      setImgSrc(`https://lh3.googleusercontent.com/d/${photo.id}=w800`);
    } else {
      setHasError(true);
      setImgSrc(fallbackUnsplash);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const downloadUrl = `/api/download?id=${photo.id}&name=${encodeURIComponent(photo.name)}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = photo.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={() => onClick(index)}
      className="group cursor-pointer rounded overflow-hidden bg-white border border-[#e9ecef] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200"
    >
      <div className="relative w-full aspect-[1] bg-[#EFF2F6] overflow-hidden">
        {isAudio ? (
          /* Audio tile — no <img> (Drive gives no thumbnail for mp3/wav).
             Music artwork placeholder, tap opens the player lightbox. */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1d1d1f] via-[#2d2d30] to-[#CC0000]/80 text-white p-3">
            <span className="w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur">
              <Music className="w-6 h-6 text-white" />
            </span>
            <span className="mt-2 max-w-full truncate text-[12px] font-semibold px-2" title={photo.name}>
              {photo.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/60">
              {(photo.name.split('.').pop() || 'audio').toUpperCase()} • Audio
            </span>
            {/* Decorative equalizer bars */}
            <span className="mt-2 flex items-end gap-1 h-5" aria-hidden="true">
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '10px' }} />
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '18px', animationDelay: '0.15s' }} />
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '12px', animationDelay: '0.3s' }} />
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '20px', animationDelay: '0.45s' }} />
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '8px', animationDelay: '0.6s' }} />
            </span>
          </div>
        ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imgSrc}
          alt={photo.name}
          title={photo.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleImgError}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        )}

        {hasError && imgSrc === fallbackUnsplash && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-black/10 text-white text-[10px] text-center pointer-events-none">
            <span className="truncate max-w-full px-2">{photo.name}</span>
          </div>
        )}

        {/* Apple tiny category pill */}
        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold tracking-[0.04em] uppercase px-2 py-1 rounded-full bg-white/90 text-[#1d1d1f] backdrop-blur">
          {photo.category}
        </span>
        {isVideo && (
          <>
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-[0.04em] uppercase px-1.5 py-1 rounded-full bg-black text-white">
              Video
            </span>
            {/* Always-visible play button — hover overlays never show on touch screens */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-11 h-11 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/30">
                <span className="ml-0.5 w-0 h-0 border-t-[7px] border-t-transparent border-l-[11px] border-l-white border-b-[7px] border-b-transparent" />
              </span>
            </span>
          </>
        )}
        {isAudio && (
          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-[0.04em] uppercase px-1.5 py-1 rounded-full bg-[#CC0000] text-white">
            Audio
          </span>
        )}

        {/* Hover quick actions - Apple subtle (desktop only; mobile uses lightbox buttons) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 hidden sm:flex items-end justify-between">
          <p className="text-[12px] font-medium text-white truncate pr-2">
            {photo.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
          </p>
          <button
            onClick={handleDownload}
            className="shrink-0 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1d1d1f] flex items-center justify-center backdrop-blur"
            aria-label="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3 py-2.5">
        <p className="text-[12px] font-semibold tracking-[-0.01em] leading-4 text-[#1d1d1f] truncate" title={photo.name}>
          {photo.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
        </p>
        <p className="text-[12px] leading-4 text-[#6e6e73] truncate" title={photo.albumName}>{photo.albumName}</p>
      </div>
    </div>
  );
}
