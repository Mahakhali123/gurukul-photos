'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FolderOpen, Search, Filter, X } from 'lucide-react';
import { Album, PhotoCategory } from '@/types';
import { AlbumGrid } from '@/components/albums/AlbumGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/EmptyState';

const ALBUM_CATEGORIES: { label: string; value: PhotoCategory }[] = [
  { label: 'All Albums', value: 'all' },
  { label: 'Celebrations', value: 'celebrations' },
  { label: 'Events & Fests', value: 'events' },
  { label: 'Sports', value: 'sports' },
  { label: 'Competitions', value: 'competitions' },
  { label: 'Spiritual', value: 'spiritual' },
  { label: 'Student Activities', value: 'activities' },
  { label: 'Classrooms', value: 'classes' },
];

function AlbumsContent() {
  const searchParams = useSearchParams();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialCat = (searchParams.get('category') as PhotoCategory) || 'all';
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');

  const loadAlbums = async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55000);
    try {
      const res = await fetch('/api/albums', { signal: controller.signal });
      if (!res.ok) throw new Error(`Albums server responded ${res.status}. First load after deploy can take ~30s — please tap Retry.`);
      const data = await res.json();
      if (data.success) {
        setAlbums(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to load albums');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setError('Taking longer than expected — the server is still reading your Google Drive (cold start). Please tap Retry; the second attempt is usually instant.');
      } else {
        setError(err.message || 'Unable to load albums');
      }
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchesCategory = selectedCategory === 'all' || album.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [albums, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gurukul-saffron-600">
          <FolderOpen className="w-4 h-4" />
          <span>Album Collections</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-gurukul-navy-950 tracking-tight">
          Photo Albums &amp; Events
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
          Browse student albums grouped by event, competition, or festival.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search albums..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <span className="text-xs font-medium text-slate-400 self-end sm:self-center">
            {filteredAlbums.length} {filteredAlbums.length === 1 ? 'album' : 'albums'} found
          </span>
        </div>

        {/* Category tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
          {ALBUM_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'saffron-gradient text-white shadow-sm shadow-orange-500/30'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Album Grid */}
      {loading ? (
        <LoadingSpinner label="Loading albums..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadAlbums} />
      ) : (
        <AlbumGrid
          albums={filteredAlbums}
          onResetFilters={() => {
            setSelectedCategory('all');
            setSearchQuery('');
          }}
        />
      )}

    </div>
  );
}

export default function AlbumsPage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading albums..." />}>
      <AlbumsContent />
    </Suspense>
  );
}
