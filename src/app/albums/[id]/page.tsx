'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  FolderOpen,
  Image as ImageIcon,
  Share2,
  Check,
  Download,
  Sparkles,
} from 'lucide-react';
import { Album, DriveFile } from '@/types';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { AlbumGrid } from '@/components/albums/AlbumGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/EmptyState';

export default function SingleAlbumPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<DriveFile[]>([]);
  const [subAlbums, setSubAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadAlbumData = async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55000);
    try {
      const res = await fetch(`/api/albums/${albumId}`, { signal: controller.signal });
      if (!res.ok) throw new Error(`Album server responded ${res.status}. Please tap Retry.`);
      const data = await res.json();
      if (data.success && data.data) {
        setAlbum(data.data.album);
        setPhotos(data.data.photos || []);
        setSubAlbums(data.data.subAlbums || []);
      } else {
        throw new Error(data.error || 'Album not found');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setError('Taking longer than expected — the server is still reading your Google Drive. Please tap Retry.');
      } else {
        setError(err.message || 'Failed to load album');
      }
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (albumId) {
      loadAlbumData();
    }
  }, [albumId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading album photos..." />;
  }

  if (error || !album) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorMessage
          message={error || 'Album not found.'}
          onRetry={loadAlbumData}
        />
        <div className="text-center mt-4">
          <Link
            href="/albums"
            className="inline-flex items-center space-x-2 text-sm text-gurukul-saffron-600 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Albums</span>
          </Link>
        </div>
      </div>
    );
  }

  const GTL_ID = '17aUq0tbmExJFFmNFR61SyBqbzcWElv-6';
  const isGTLAlbum = album.id === GTL_ID || album.folderId === GTL_ID || album.name.toLowerCase().includes('gtl');
  const displayAlbumName = isGTLAlbum ? 'GTL' : album.name;
  const displayAlbumDesc = isGTLAlbum ? 'Grand Talent League • Swaminarayan Gurukul — Live performance and talent showcase.' : album.description;

  return (
    <div className="space-y-10 pb-16">
      
      {/* Album Hero Header */}
      <div className="relative bg-gradient-to-b from-gurukul-navy-950 to-gurukul-navy-900 text-white py-12 sm:py-16 overflow-hidden">
        
        {/* Background artwork glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/albums" className="hover:text-white transition">Albums</Link>
            <span>/</span>
            <span className="text-amber-300 font-medium truncate max-w-xs" title={displayAlbumName}>{displayAlbumName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {album.category}
                </span>
                <span className="flex items-center text-xs text-slate-300 font-medium">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-gurukul-saffron-400" />
                  {new Date(album.date || album.createdTime).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight" title={displayAlbumName}>
                {displayAlbumName}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {displayAlbumDesc}
              </p>
            </div>

            {/* Album Header Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Album Link Copied!' : 'Share Album'}</span>
              </button>

              <Link
                href="/albums"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-gurukul-navy-950 hover:bg-slate-100 text-xs font-bold transition shadow-soft"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Albums</span>
              </Link>
            </div>

          </div>

          {/* Photo Count Pill */}
          <div className="pt-2 flex items-center space-x-2 text-xs text-amber-200">
            <ImageIcon className="w-4 h-4 text-gurukul-saffron-400" />
            <span className="font-semibold">
              {photos.filter((p) => p.mediaType !== 'audio').length} Photos & Videos • {photos.filter((p) => p.mediaType === 'audio').length} Audios • {photos.length} total
            </span>
          </div>

        </div>

      </div>

      {/* Subfolders inside this album (e.g., Dashavatar Assembly separator folders) */}
      {subAlbums.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center space-x-2 text-gurukul-saffron-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-3">
            <FolderOpen className="w-4 h-4" />
            <span>Folders inside {displayAlbumName} ({subAlbums.length})</span>
          </div>
          <AlbumGrid albums={subAlbums} />
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Tap a folder to open its images and videos - each folder keeps its own photos/videos separately.
          </div>
        </div>
      )}

      {/* Photos Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="font-bold text-lg text-gurukul-navy-950">
            {subAlbums.length > 0 ? `All Media in ${displayAlbumName} (including subfolders)` : `Photos, Videos & Audios in ${displayAlbumName}`}
          </h2>
          <span className="text-xs text-slate-500">Click any photo to view, play video/audio, or download</span>
        </div>

        <PhotoGrid photos={photos} />
      </div>

    </div>
  );
}
