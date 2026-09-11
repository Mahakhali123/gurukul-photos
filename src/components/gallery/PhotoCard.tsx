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
      className="group cursor-pointer rounded-[8px] overflow-hidden bg-white border border-[#f2f2f2] hover:border-[#d9d9dd] transition-all duration-200"
    >
      <div className="relative w-full aspect-[1] bg-[#eeece7] overflow-hidden">
        {isAudio ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#17171c] text-white p-3">
            <span className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </span>
            <span className="mt-2 max-w-full truncate text-[12px] font-medium px-2" title={photo.name}>
              {photo.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
            </span>
            <span className="cohere-mono-label !text-[10px] text-white/50">
              {(photo.name.split('.').pop() || 'audio').toUpperCase()} · Audio
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

        <span className="absolute top-2.5 left-2.5 text-[10px] font-medium tracking-[0.04em] uppercase px-2 py-1 rounded-full bg-white/90 text-[#17171c] backdrop-blur">
          {photo.category}
        </span>
        {isVideo && (
          <>
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-[0.04em] uppercase px-1.5 py-1 rounded-full bg-black text-white">
              Video
            </span>
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-11 h-11 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/30">
                <span className="ml-0.5 w-0 h-0 border-t-[7px] border-t-transparent border-l-[11px] border-l-white border-b-[7px] border-b-transparent" />
              </span>
            </span>
          </>
        )}
        {isAudio && (
          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-[0.04em] uppercase px-1.5 py-1 rounded-full bg-[#ff7759] text-[#17171c]">
            Audio
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 hidden sm:flex items-end justify-between">
          <p className="text-[12px] font-medium text-white truncate pr-2">
            {photo.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
          </p>
          <button
            onClick={handleDownload}
            className="shrink-0 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#17171c] flex items-center justify-center backdrop-blur"
            aria-label="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3 py-2.5">
        <p className="text-[12px] font-medium leading-4 text-[#212121] truncate" title={photo.name}>
          {photo.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
        </p>
        <p className="text-[12px] leading-4 text-[#93939f] truncate" title={photo.albumName}>{photo.albumName}</p>
      </div>
    </div>
  );
}
