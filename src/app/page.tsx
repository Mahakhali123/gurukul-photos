import React from 'react';
import Link from 'next/link';
import { getDriveData } from '@/lib/drive';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { AlbumGrid } from '@/components/albums/AlbumGrid';

export const revalidate = 600; // ISR: Vercel caches homepage HTML 10 min → instant loads

export default async function HomePage() {
  const data = await getDriveData();
  const { photos, albums } = data;

  const totalPhotos = photos.length;
  const totalAlbums = albums.length;
  const latestPhotos = photos.slice(0, 8);
  const featuredAlbums = albums.slice(0, 4);

  return (
    <div className="bg-white">
      {/* ========== Hero — G-Arts highlight event + option buttons ========== */}
      <section className="w-full bg-white pt-10 sm:pt-14 pb-8 sm:pb-12 text-center border-b border-[#d9d9dd]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <p className="cohere-mono-label !text-[11px] sm:!text-[12px] text-[#CC0000]">
            Shree Swaminarayan Gurukul · Official Events Archive
          </p>
          <h1 className="cohere-display text-[44px] sm:text-[72px] text-[#17171c] mt-2">
            G-Arts Gallery.
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link
              href="/photos"
              className="cohere-btn-primary w-full sm:w-auto"
            >
              Explore Gallery
            </Link>
            <Link href="/events" className="cohere-btn-secondary">
              View Events timeline &gt;
            </Link>
          </div>

          {/* Hero figure — Main image (G-Arts editing studio highlight) */}
          <div className="mt-8 sm:mt-10 relative">
            <div className="mx-auto max-w-[980px] rounded-[22px] overflow-hidden bg-[#eeece7] border border-[#d9d9dd] aspect-[16/9] sm:aspect-[2.2/1] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-main.jpg"
                alt="G-Arts Studio — Student editing Gurukul photos"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-[12px] text-[#93939f] text-center">
              Main image: G-Arts team editing • {totalPhotos} photos • {totalAlbums} albums
            </p>
          </div>
        </div>
      </section>

      {/* ========== Feature tiles — Albums first, Photos second ========== */}
      <section className="w-full bg-[#edf0f4] border-b border-[#d9d9dd] py-6 sm:py-8">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tile 1 — Popular Albums */}
          <div className="rounded-[16px] bg-[#17171c] text-white overflow-hidden flex flex-col sm:min-h-[500px]">
            <div className="pt-8 pb-5 text-center px-6 border-b border-white/10">
              <h3 className="text-[24px]">Popular Albums.</h3>
              <p className="mt-1 text-[14px] text-[#93939f]">Curated collections, updated daily.</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-[13px]">
                <Link href="/albums" className="rounded-[32px] bg-[#CC0000] hover:bg-[#a00000] transition text-white px-5 py-2 font-semibold">
                  View all {totalAlbums}
                </Link>
                <Link href="/albums" className="text-white/80 hover:text-white underline underline-offset-4">
                  Browse &gt;
                </Link>
              </div>
            </div>
            <div className="flex-1 p-4">
              <AlbumGrid albums={featuredAlbums} />
            </div>
          </div>

          {/* Tile 2 — Latest Photos */}
          <div className="rounded-[16px] bg-white border border-[#d9d9dd] overflow-hidden flex flex-col sm:min-h-[500px]">
            <div className="pt-8 pb-5 text-center px-6 border-b border-[#d9d9dd]">
              <h3 className="text-[24px] text-[#212121]">Latest Photos.</h3>
              <p className="mt-1 text-[14px] text-[#616161]">Fresh moments from Gurukul.</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-[13px]">
                <Link href="/photos" className="rounded-[32px] bg-[#CC0000] hover:bg-[#a00000] transition text-white px-5 py-2 font-semibold">
                  View all {totalPhotos}
                </Link>
                <Link href="/photos" className="text-[#CC0000] hover:text-[#a00000] underline underline-offset-4 font-medium">
                  Learn more &gt;
                </Link>
              </div>
            </div>
            <div className="flex-1 p-4 bg-[#eeece7]/40">
              <PhotoGrid photos={latestPhotos.slice(0, 4)} />
            </div>
          </div>
        </div>
      </section>

      {/* ========== Albums first, Photos second ========== */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 sm:space-y-12">
        <div className="space-y-5">
          <div className="flex items-end justify-between border-b border-[#d9d9dd] pb-3">
            <h2 className="text-[24px] sm:text-[32px] text-[#212121]">Albums.</h2>
            <Link href="/albums" className="text-[13px] sm:text-[14px] text-[#CC0000] hover:text-[#a00000] hover:underline font-medium">
              View all albums ({totalAlbums}) &gt;
            </Link>
          </div>
          <AlbumGrid albums={featuredAlbums} />
        </div>

        <div className="space-y-5">
          <div className="flex items-end justify-between border-b border-[#d9d9dd] pb-3">
            <h2 className="text-[24px] sm:text-[32px] text-[#212121]">Latest Photos.</h2>
            <Link href="/photos" className="text-[13px] sm:text-[14px] text-[#CC0000] hover:text-[#a00000] hover:underline font-medium">
              View all photos ({totalPhotos}) &gt;
            </Link>
          </div>
          <PhotoGrid photos={latestPhotos} />
        </div>
      </section>

    </div>
  );
}
