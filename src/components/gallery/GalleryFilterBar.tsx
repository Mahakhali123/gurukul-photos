'use client';

import React from 'react';
import { Search, ArrowUpDown, X, Folder, Video, Image as ImageIcon, Music } from 'lucide-react';
import { Album, PhotoCategory } from '@/types';

interface GalleryFilterBarProps {
  categories: { label: string; value: PhotoCategory }[];
  activeCategory: PhotoCategory;
  onSelectCategory: (category: PhotoCategory) => void;
  mediaTypeFilter?: 'all' | 'image' | 'video' | 'audio';
  onSelectMediaType?: (type: 'all' | 'image' | 'video' | 'audio') => void;
  albums: Album[];
  selectedAlbumId: string;
  onSelectAlbum: (albumId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'oldest' | 'name';
  onSortChange: (sort: 'newest' | 'oldest' | 'name') => void;
  onResetFilters: () => void;
  totalPhotosCount: number;
}

export function GalleryFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  mediaTypeFilter = 'all',
  onSelectMediaType,
  albums,
  selectedAlbumId,
  onSelectAlbum,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalPhotosCount,
}: GalleryFilterBarProps) {
  const hasActiveFilters =
    activeCategory !== 'all' ||
    mediaTypeFilter !== 'all' ||
    selectedAlbumId !== 'all' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'newest';

  return (
    <div className="bg-white rounded-[22px] border border-[#d9d9dd] p-4 sm:p-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93939f]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search photos, videos, audios, events or albums..."
            className="w-full pl-10 pr-10 py-3 bg-white border border-[#d9d9dd] rounded-[8px] text-[14px] text-[#212121] placeholder:text-[#93939f] focus:outline-none focus:border-[#CC0000] focus:ring-2 focus:ring-[#CC0000]/15 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#93939f] hover:text-[#212121]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onSelectMediaType && (
            <div className="flex items-center bg-[#eeece7]/60 p-1 rounded-[30px] border border-[#d9d9dd] text-[12px] font-medium">
              <button
                onClick={() => onSelectMediaType('all')}
                className={`px-3 py-1.5 rounded-full transition ${
                  mediaTypeFilter === 'all' ? 'bg-[#CC0000] text-white' : 'text-[#616161] hover:text-[#17171c]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onSelectMediaType('image')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition ${
                  mediaTypeFilter === 'image' ? 'bg-[#CC0000] text-white' : 'text-[#616161] hover:text-[#17171c]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => onSelectMediaType('video')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition ${
                  mediaTypeFilter === 'video' ? 'bg-[#CC0000] text-white' : 'text-[#616161] hover:text-[#17171c]'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Videos</span>
              </button>
              <button
                onClick={() => onSelectMediaType('audio')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition ${
                  mediaTypeFilter === 'audio' ? 'bg-[#CC0000] text-white' : 'text-[#616161] hover:text-[#17171c]'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Audios</span>
              </button>
            </div>
          )}

          <div className="relative">
            <select
              value={selectedAlbumId}
              onChange={(e) => onSelectAlbum(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2.5 min-h-[44px] bg-white border border-[#d9d9dd] rounded-[8px] text-[12px] font-medium text-[#212121] focus:outline-none cursor-pointer max-w-[45vw] sm:max-w-none truncate"
            >
              <option value="all">All Albums</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name} ({album.photoCount + (album.videoCount || 0) + (album.audioCount || 0)})
                </option>
              ))}
            </select>
            <Folder className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#93939f] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'name')}
              className="appearance-none pl-8 pr-8 py-2.5 min-h-[44px] bg-white border border-[#d9d9dd] rounded-[8px] text-[12px] font-medium text-[#212121] focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#93939f] pointer-events-none" />
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center space-x-1 px-3 py-2.5 text-[12px] font-medium text-[#a00000] bg-[#CC0000]/10 hover:bg-[#CC0000]/20 rounded-[8px] transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Gurukul-red taxonomy chips — oversized hero-level control */}
      <div className="flex items-center justify-between pt-3 border-t border-[#d9d9dd] overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center space-x-2 shrink-0 py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-4 py-2 min-h-[36px] rounded-[8px] text-[14px] whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#CC0000] border-[#CC0000] text-white font-medium shadow-sm'
                    : 'bg-transparent border-[#CC0000]/40 text-[#CC0000] hover:bg-[#CC0000]/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <span className="text-[12px] text-[#93939f] shrink-0 pl-2">
          {totalPhotosCount} {totalPhotosCount === 1 ? 'item' : 'items'}
        </span>
      </div>
    </div>
  );
}
