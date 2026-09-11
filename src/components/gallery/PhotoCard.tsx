'use client';

import React, { useState } from 'react';
import { Download, Music, Maximize2, Play } from 'lucide-react';
import { DriveFile } from '@/types';

interface PhotoCardProps {
  photo: DriveFile;
  index: number;
  onClick: (index: number) => void;
}

function cleanName(name: string) {
  return name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
}

export function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
  const fallbackUnsplash = 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop';
  const [imgSrc, setImgSrc] = useState(photo.thumbnailLink || photo.directUrl || fallbackUnsplash);
  const [fallbackStep, setFallbackStep] = useState(0);

  const isVideo = photo.mediaType === 'video';
  const isAudio = photo.mediaType === 'audio';
  const isImage = !isVideo && !isAudio;

  const handleImgError = () => {
    if (fallbackStep === 0) {
      setFallbackStep(1);
      setImgSrc(`https://drive.google.com/thumbnail?id=${photo.id}&sz=w800`);
    } else if (fallbackStep === 1) {
      setFallbackStep(2);
      setImgSrc(`https://drive.google.com/uc?export=view&id=${photo.id}`);
    } else if (fallbackStep === 2) {
      setFallbackStep(3);
      setImgSrc(`https://lh3.googleusercontent.com/d/${photo.id}=w800`);
    } else {
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
      className="group cursor-pointer rounded-[16px] overflow-hidden bg-white border border-[#f2f2f2] hover:border-[#d9d9dd] hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className="relative w-full overflow-hidden bg-[#eeece7] aspect-[4/3]"
      >
        {isAudio ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#17171c] text-white p-4 overflow-hidden">
            <span
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#CC0000]/30 blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <span className="w-14 h-14 rounded-full bg-[#CC0000] flex items-center justify-center shadow-lg">
              <Music className="w-7 h-7 text-white" />
            </span>
            <span className="mt-3 max-w-full truncate text-[13px] font-medium px-2" title={photo.name}>
              {cleanName(photo.name)}
            </span>
            <span className="cohere-mono-label !text-[10px] text-white/50 mt-1">
              {(photo.name.split('.').pop() || 'audio').toUpperCase()} · Audio
            </span>
            <span className="mt-3 flex items-end gap-1 h-5" aria-hidden="true">
              <span className="w-1 rounded bg-[#CC0000] animate-pulse" style={{ height: '10px' }} />
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '18px', animationDelay: '0.15s' }} />
              <span className="w-1 rounded bg-[#CC0000] animate-pulse" style={{ height: '12px', animationDelay: '0.3s' }} />
              <span className="w-1 rounded bg-white/70 animate-pulse" style={{ height: '20px', animationDelay: '0.45s' }} />
              <span className="w-1 rounded bg-[#CC0000] animate-pulse" style={{ height: '8px', animationDelay: '0.6s' }} />
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
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
        />
        )}

        {/* Top badges */}
        {isImage ? (
          <span className="absolute top-3 left-3 text-[10px] font-medium tracking-[0.06em] uppercase px-2.5 py-1 rounded-full bg-black/55 text-white backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {photo.category}
          </span>
        ) : (
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.06em] uppercase px-2.5 py-1 rounded-full bg-[#CC0000] text-white shadow">
            {isVideo ? 'Video' : 'Audio'}
          </span>
        )}

        {isVideo && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-14 h-14 rounded-full bg-black/55 backdrop-blur flex items-center justify-center border border-white/40 group-hover:bg-[#CC0000] group-hover:border-[#CC0000] group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </span>
          </span>
        )}

        {/* Hover action bar — Pinterest-style quick actions */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 pt-8 hidden sm:flex items-end justify-between gap-2">
          <p className="text-[13px] font-medium text-white leading-snug line-clamp-2 pr-1">
            {cleanName(photo.name)}
          </p>
          <span className="flex items-center gap-1.5 shrink-0">
            <span
              role="button"
              tabIndex={0}
              aria-label="Quick view"
              className="w-9 h-9 rounded-full bg-white text-[#17171c] flex items-center justify-center hover:bg-[#CC0000] hover:text-white transition"
            >
              <Maximize2 className="w-4 h-4" />
            </span>
            <button
              onClick={handleDownload}
              className="w-9 h-9 rounded-full bg-white text-[#17171c] flex items-center justify-center hover:bg-[#CC0000] hover:text-white transition"
              aria-label="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </span>
        </div>
      </div>

      {/* Caption — always visible, Pinterest-style title under the pin */}
      <div className="px-3.5 py-3">
        <p className="text-[13px] font-medium leading-5 text-[#212121] line-clamp-2" title={photo.name}>
          {cleanName(photo.name)}
        </p>
        <p className="mt-0.5 text-[12px] leading-4 text-[#93939f] truncate" title={photo.albumName}>
          {photo.albumName}
        </p>
      </div>
    </div>
  );
}
