'use client';

import React from 'react';
import Link from 'next/link';
import { Music } from 'lucide-react';
import { Album } from '@/types';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const fallbackCover = 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop';
  const GTL_ID = '17aUq0tbmExJFFmNFR61SyBqbzcWElv-6';
  const gtlPoster = '/gtl-main.jpg';
  // Keep GTL album image title as "GTL" — detect by id or name containing gtl (case-insensitive)
  const isGTL = album.id === GTL_ID || album.folderId === GTL_ID || album.name.toLowerCase().includes('gtl');
  const displayName = isGTL ? 'GTL' : album.name;
  const coverUrl = isGTL ? gtlPoster : (album.coverPhotoUrl || album.coverPhoto?.directUrl || fallbackCover);
  const totalItems = album.photoCount + (album.videoCount || 0) + (album.audioCount || 0);
  const audioCount = album.audioCount || 0;
  // Audio-only album: Drive gives no image thumbnail, so render a music
  // placeholder instead of a broken <img> (audio URL as img src would fail).
  const isAudioOnly = !isGTL && !album.coverPhotoUrl && (album.coverPhoto?.mediaType === 'audio' || (totalItems > 0 && album.photoCount === 0 && (album.videoCount || 0) === 0));

  return (
    <Link
      href={`/albums/${album.id}`}
      className="group flex flex-col rounded bg-white border border-[#e9ecef] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200"
    >
      {/* Cover — gurukul.org style */}
      <div className="relative aspect-[1.25] bg-[#EFF2F6] overflow-hidden">
        {isAudioOnly ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1d1d1f] via-[#2d2d30] to-[#CC0000]/80 text-white">
            <span className="w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </span>
            <span className="mt-2 text-[12px] font-semibold">{audioCount} {audioCount === 1 ? 'audio' : 'audios'}</span>
          </div>
        ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={coverUrl}
          alt={displayName}
          title={displayName}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackCover) {
              target.src = fallbackCover;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        )}
        {/* subtle bottom fade only - hidden for GTL to keep image clean */}
        {!isGTL && <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />}
        {/* Apple pill count */}
        <span className="absolute top-3 right-3 text-[11px] leading-none font-medium tracking-[-0.01em] px-2.5 py-1.5 rounded-full bg-white/90 text-[#1d1d1f] backdrop-blur">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
        {album.category && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.06em] uppercase px-2 py-1 rounded-full bg-black/60 text-white backdrop-blur">
            {album.category}
          </span>
        )}
        {!isGTL && (
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.02em] leading-tight text-white line-clamp-1" title={displayName}>
              {displayName}
            </h3>
            <p className="text-[12px] leading-4 text-white/80 line-clamp-1">{album.description?.slice(0, 48) || 'Swaminarayan Gurukul collection'}</p>
          </div>
        )}
      </div>

      {/* Body - Apple small captions */}
      <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
        <p className="text-[12px] leading-4 text-[#6e6e73] line-clamp-2 flex-1">
          {album.description || 'Collection of memorable moments captured at Gurukul.'}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[12px] text-[#06c] group-hover:underline">View &gt;</span>
          <span className="text-[12px] text-[#86868b]">
            {new Date(album.date || album.createdTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </Link>
  );
}
