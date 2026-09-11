'use client';

import React from 'react';
import { Search, Filter, ArrowUpDown, X, Folder, Video, Image as ImageIcon, Music } from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-4 sm:p-5 space-y-4">
      
      {/* Top row: Search input & Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search photos, videos, audios, events or albums..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-gurukul-saffron-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Media Type, Album & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Media Type Toggle */}
          {onSelectMediaType && (
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => onSelectMediaType('all')}
                className={`px-2.5 py-1.5 rounded-lg transition ${
                  mediaTypeFilter === 'all' ? 'bg-white shadow-xs text-gurukul-navy-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onSelectMediaType('image')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition ${
                  mediaTypeFilter === 'image' ? 'bg-white shadow-xs text-gurukul-saffron-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => onSelectMediaType('video')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition ${
                  mediaTypeFilter === 'video' ? 'bg-white shadow-xs text-red-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Videos</span>
              </button>
              <button
                onClick={() => onSelectMediaType('audio')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition ${
                  mediaTypeFilter === 'audio' ? 'bg-white shadow-xs text-purple-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Audios</span>
              </button>
            </div>
          )}

          {/* Album Selector */}
          <div className="relative">
            <select
              value={selectedAlbumId}
              onChange={(e) => onSelectAlbum(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer max-w-[45vw] sm:max-w-none truncate"
            >
              <option value="all">All Albums</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.name} ({album.photoCount + (album.videoCount || 0) + (album.audioCount || 0)})
                </option>
              ))}
            </select>
            <Folder className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'name')}
              className="appearance-none pl-8 pr-8 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center space-x-1 px-3 py-2.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center space-x-1.5 shrink-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3.5 py-2 min-h-[36px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'saffron-gradient text-white shadow-sm shadow-orange-500/30'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-medium text-slate-400 shrink-0 pl-2">
          {totalPhotosCount} {totalPhotosCount === 1 ? 'item' : 'items'}
        </span>
      </div>

    </div>
  );
}
