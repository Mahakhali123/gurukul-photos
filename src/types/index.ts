export type MediaType = 'image' | 'video' | 'audio';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  mediaType?: MediaType;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  directUrl: string;
  downloadUrl: string;
  highResUrl: string;
  videoStreamUrl?: string;
  audioStreamUrl?: string;
  createdTime: string;
  modifiedTime: string;
  size?: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
  duration?: string;
  albumId: string;
  albumName: string;
  category: PhotoCategory;
  tags?: string[];
  description?: string;
}

export type PhotoCategory =
  | 'all'
  | 'events'
  | 'activities'
  | 'competitions'
  | 'celebrations'
  | 'classes'
  | 'sports'
  | 'spiritual'
  | 'videos'
  | 'audios';

export interface Album {
  id: string;
  folderId: string;
  name: string;
  description: string;
  coverPhoto: DriveFile | null;
  coverPhotoUrl: string;
  photoCount: number;
  videoCount?: number;
  audioCount?: number;
  category: PhotoCategory;
  date: string;
  createdTime: string;
}

export interface DriveSyncStatus {
  isConfigured: boolean;
  folderId: string;
  lastSyncTime: string;
  totalPhotos: number;
  totalVideos: number;
  totalAudios: number;
  totalAlbums: number;
  isUsingMock: boolean;
  message?: string;
  error?: string | null;
}

export interface GalleryFilterState {
  mediaType: 'all' | 'image' | 'video' | 'audio';
  category: PhotoCategory;
  albumId: string;
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'name';
}
