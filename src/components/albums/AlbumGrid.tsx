'use client';

import React from 'react';
import { Album } from '@/types';
import { AlbumCard } from './AlbumCard';
import { EmptyState } from '../ui/EmptyState';

interface AlbumGridProps {
  albums: Album[];
  onResetFilters?: () => void;
}

export function AlbumGrid({ albums, onResetFilters }: AlbumGridProps) {
  if (albums.length === 0) {
    return (
      <EmptyState
        title="No albums found"
        description="No albums found."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
