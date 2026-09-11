'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
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
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6">
        <p className="cohere-mono-label text-[#93939f]">Album collections</p>
        <h1 className="cohere-display text-[40px] sm:text-[72px] text-[#17171c] mt-3">
          Albums &amp; events.
        </h1>
        <p className="mt-4 text-[16px] sm:text-[18px] text-[#616161] max-w-3xl leading-[1.5]">
          Student albums grouped by event, competition or festival — from Annual
          Day to morning assemblies.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-16 space-y-6">
        <div className="bg-white rounded-[22px] border border-[#d9d9dd] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80 md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93939f]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search albums..."
                className="w-full pl-10 pr-10 py-3 bg-white border border-[#d9d9dd] rounded-[8px] text-[14px] focus:outline-none focus:border-[#CC0000] focus:ring-2 focus:ring-[#CC0000]/15"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#93939f] hover:text-[#212121]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <span className="text-[12px] text-[#93939f] self-end sm:self-center">
              {filteredAlbums.length} {filteredAlbums.length === 1 ? 'album' : 'albums'} found
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-[#d9d9dd]">
            {ALBUM_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-[8px] text-[14px] whitespace-nowrap transition-all border ${
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
        </div>

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
