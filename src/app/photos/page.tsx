'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Image as ImageIcon, Cloud, Filter } from 'lucide-react';
import { DriveFile, Album, PhotoCategory } from '@/types';
import { GalleryFilterBar } from '@/components/gallery/GalleryFilterBar';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/EmptyState';

const CATEGORIES: { label: string; value: PhotoCategory }[] = [
  { label: 'All Media', value: 'all' },
  { label: 'Events & Fests', value: 'events' },
  { label: 'Celebrations', value: 'celebrations' },
  { label: 'Sports & Athletics', value: 'sports' },
  { label: 'Competitions', value: 'competitions' },
  { label: 'Spiritual & Assemblies', value: 'spiritual' },
  { label: 'Student Activities', value: 'activities' },
  { label: 'Classrooms & Labs', value: 'classes' },
  { label: 'Videos', value: 'videos' },
  { label: 'Audios & Music', value: 'audios' },
];

function PhotosGalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [photos, setPhotos] = useState<DriveFile[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const initialCategory = (searchParams.get('category') as PhotoCategory) || 'all';
  const initialAlbumId = searchParams.get('albumId') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sortBy') as 'newest' | 'oldest' | 'name') || 'newest';
  const initialMediaType = (searchParams.get('type') as 'all' | 'image' | 'video' | 'audio') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>(initialCategory);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(initialAlbumId);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video' | 'audio'>(initialMediaType);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>(initialSort);

  useEffect(() => {
    const cat = searchParams.get('category') as PhotoCategory;
    if (cat) setSelectedCategory(cat);
    const alb = searchParams.get('albumId');
    if (alb) setSelectedAlbumId(alb);
    const s = searchParams.get('search');
    if (s !== null) setSearchQuery(s);
    const t = searchParams.get('type') as 'all' | 'image' | 'video' | 'audio';
    if (t) setMediaTypeFilter(t);
  }, [searchParams]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    // Vercel cold starts can take a while on first crawl — allow up to 55s
    // (matches maxDuration=60) instead of the browser's default hang.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55000);
    try {
      const [photosRes, albumsRes] = await Promise.all([
        fetch('/api/photos', { signal: controller.signal }),
        fetch('/api/albums', { signal: controller.signal }),
      ]);

      if (!photosRes.ok) throw new Error(`Gallery server responded ${photosRes.status}. First load after deploy can take ~30s while Drive warms up — please tap Retry.`);
      if (!albumsRes.ok) throw new Error(`Albums server responded ${albumsRes.status}. Please tap Retry.`);

      const photosData = await photosRes.json();
      const albumsData = await albumsRes.json();

      if (photosData.success) {
        setPhotos(photosData.data || []);
      } else {
        throw new Error(photosData.error || 'Failed to fetch media');
      }

      if (albumsData.success) {
        setAlbums(albumsData.data || []);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setError('Taking longer than expected — the server is still reading your Google Drive (cold start). Please tap Retry; the second attempt is usually instant once the cache warms up.');
      } else {
        setError(err.message || 'An error occurred while loading gallery');
      }
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPhotos = useMemo(() => {
    let result = [...photos];

    if (mediaTypeFilter !== 'all') {
      result = result.filter((p) => p.mediaType === mediaTypeFilter);
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'videos') {
        result = result.filter((p) => p.mediaType === 'video');
      } else if (selectedCategory === 'audios') {
        result = result.filter((p) => p.mediaType === 'audio');
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    if (selectedAlbumId !== 'all') {
      result = result.filter((p) => p.albumId === selectedAlbumId);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.albumName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime());
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
    }

    return result;
  }, [photos, mediaTypeFilter, selectedCategory, selectedAlbumId, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedAlbumId('all');
    setMediaTypeFilter('all');
    setSearchQuery('');
    setSortBy('newest');
    router.push('/photos');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gurukul-saffron-600">
          <Cloud className="w-4 h-4" />
          <span>Gallery</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-gurukul-navy-950 tracking-tight">
          Student Photo, Video &amp; Audio Gallery
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
          Browse student photos, videos and audios/music from Gurukul events. Click any photo to open the viewer, play videos inline, or tap an audio to listen — or download directly to your computer.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <GalleryFilterBar
        categories={CATEGORIES}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        mediaTypeFilter={mediaTypeFilter}
        onSelectMediaType={setMediaTypeFilter}
        albums={albums}
        selectedAlbumId={selectedAlbumId}
        onSelectAlbum={setSelectedAlbumId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        totalPhotosCount={filteredPhotos.length}
      />

      {/* Main Gallery Area */}
      {loading ? (
        <LoadingSpinner label="Loading gallery..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadData} />
      ) : (
        <PhotoGrid photos={filteredPhotos} onResetFilters={handleResetFilters} />
      )}

    </div>
  );
}

export default function PhotosPage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading gallery..." />}>
      <PhotosGalleryContent />
    </Suspense>
  );
}
