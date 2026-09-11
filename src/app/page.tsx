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
      {/* ========== Gurukul hero — like gurukul.org/events header ========== */}
      <section className="w-full bg-white pt-6 sm:pt-10 pb-8 sm:pb-12 text-center border-b border-[#e9ecef]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.04em] text-[#CC0000] uppercase">Shree Swaminarayan Gurukul • Official Events Archive</p>
          <h1 className="mt-1 text-[30px] sm:text-[48px] font-bold tracking-[-0.015em] leading-tight sm:leading-none text-[#212529]">
            G-Arts Gallery.
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link
              href="/photos"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#CC0000] hover:bg-[#a00000] text-white text-[15px] font-semibold px-[22px] py-[12px] tracking-[-0.01em] min-h-[48px]"
            >
              Explore Gallery
            </Link>
            <Link href="/events" className="text-[14px] font-semibold tracking-[-0.01em] text-[#CC0000] hover:underline min-h-[44px] inline-flex items-center">
              View Events timeline &gt;
            </Link>
          </div>

          {/* Hero figure — Main image from user (G-Arts editing studio) */}
          <div className="mt-8 sm:mt-10 relative">
            <div className="mx-auto max-w-[980px] rounded overflow-hidden bg-[#EFF2F6] border border-[#e9ecef] aspect-[16/9] sm:aspect-[2.2/1] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-main.jpg"
                alt="G-Arts Studio — Student editing Gurukul photos"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-[12px] text-[#6c757d] tracking-[-0.01em] text-center">
              Main image: G-Arts team editing • {totalPhotos} photos • {totalAlbums} albums
            </p>
          </div>
        </div>
      </section>

      {/* ========== Gurukul product grid — 2 columns (ALBUMS FIRST per request) ========== */}
      <section className="w-full bg-[#EFF2F6] py-4">
        <div className="max-w-[1140px] mx-auto px-3 sm:px-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Tile 1 - Popular Albums (NOW FIRST) */}
          <div className="rounded bg-[#212529] border border-[#343a40] overflow-hidden flex flex-col sm:min-h-[500px] text-white">
            <div className="pt-8 pb-2 text-center px-6 border-b border-white/10">
              <h3 className="text-[18px] font-bold">Popular Albums.</h3>
              <p className="mt-1 text-[14px] text-[#adb5bd]">Curated collections, updated daily.</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-[12px]">
                <Link href="/albums" className="rounded bg-[#CC0000] text-white px-4 py-1.5 font-semibold">
                  View all {totalAlbums}
                </Link>
                <Link href="/albums" className="text-[#CC0000] hover:underline font-medium">
                  Browse &gt;
                </Link>
              </div>
            </div>
            <div className="flex-1 p-3">
              <div className="rounded overflow-hidden bg-[#343a40] border border-white/10 p-3">
                <AlbumGrid albums={featuredAlbums} />
              </div>
            </div>
          </div>

          {/* Tile 2 - Latest Photos (NOW SECOND) */}
          <div className="rounded bg-white border border-[#e9ecef] overflow-hidden flex flex-col sm:min-h-[500px]">
            <div className="pt-8 pb-2 text-center px-6 border-b border-[#e9ecef]">
              <h3 className="text-[18px] font-bold text-[#212529]">Latest Photos.</h3>
              <p className="mt-1 text-[14px] text-[#495057]">Fresh moments from Gurukul.</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-[12px]">
                <Link href="/photos" className="rounded bg-[#CC0000] text-white px-4 py-1.5 font-semibold">
                  View all {totalPhotos}
                </Link>
                <Link href="/photos" className="text-[#CC0000] hover:underline font-medium">
                  Learn more &gt;
                </Link>
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col bg-[#EFF2F6]/30">
              <div className="flex-1 rounded overflow-hidden bg-white border border-[#e9ecef] p-3">
                <PhotoGrid photos={latestPhotos.slice(0, 4)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Albums FIRST, Photos SECOND — per request ========== */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        <div className="space-y-4">
          <div className="flex items-end justify-between border-b border-[#e9ecef] pb-3">
            <h2 className="text-[18px] font-bold text-[#212529]">Albums.</h2>
            <Link href="/albums" className="text-[13px] text-[#CC0000] hover:underline font-medium">
              View all albums ({totalAlbums}) &gt;
            </Link>
          </div>
          <AlbumGrid albums={featuredAlbums} />
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between border-b border-[#e9ecef] pb-3">
            <h2 className="text-[18px] font-bold text-[#212529]">Latest Photos.</h2>
            <Link href="/photos" className="text-[13px] text-[#CC0000] hover:underline font-medium">
              View all photos ({totalPhotos}) &gt;
            </Link>
          </div>
          <PhotoGrid photos={latestPhotos} />
        </div>
      </section>

    </div>
  );
}
