import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getDriveData } from '@/lib/drive';
import { AlbumGrid } from '@/components/albums/AlbumGrid';
import { HomeMediaWall } from '@/components/gallery/HomeMediaWall';

export const revalidate = 600;

const BRANCHES = [
  'Hyderabad', 'Bengaluru', 'Mumbai', 'Nagpur', 'Raipur', 'Delhi', 'Ahmedabad', 'Jadcherla',
];

const VALUES = [
  { title: 'Vidya', sub: 'Modern education — dynamism, curiosity, leadership.' },
  { title: 'Sadvidya', sub: 'Traditional character — gratitude, integrity, discipline.' },
  { title: 'Brahmavidya', sub: 'Spiritual grounding — faith, devotion, self-realization.' },
];

export default async function HomePage() {
  const data = await getDriveData();
  const { photos, albums } = data;

  const totalPhotos = photos.length;
  const totalVideos = photos.filter((p) => p.mediaType === 'video').length;
  const totalAudios = photos.filter((p) => p.mediaType === 'audio').length;
  const totalAlbums = albums.length;
  const featuredAlbums = albums.slice(0, 3);

  const stats: { n: string; label: string }[] = [
    { n: totalPhotos.toLocaleString('en-IN'), label: 'Photos' },
    { n: String(totalVideos), label: 'Videos' },
    { n: String(totalAudios), label: 'Audios' },
    { n: String(totalAlbums), label: 'Albums' },
  ];

  return (
    <div className="bg-white">
      {/* ---------- Compact hero — the media is the hero ---------- */}
      <section className="w-full bg-white pt-10 sm:pt-14 pb-6 sm:pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <p className="cohere-mono-label text-[#93939f]">
            Shree Swaminarayan Gurukul · Official events archive
          </p>
          <h1 className="cohere-display text-[44px] sm:text-[64px] lg:text-[88px] text-[#17171c] mt-3">
            Gurukul, frame by frame.
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.5] text-[#616161] max-w-2xl mx-auto">
            Every Annual Day, Yatra, match and morning assembly — captured and
            preserved by students, for students.
          </p>

          {/* Live archive stats — hairline-divided editorial row */}
          <div className="mt-7 flex items-stretch justify-center divide-x divide-[#d9d9dd]">
            {stats.map((s) => (
              <div key={s.label} className="px-4 sm:px-8">
                <p className="cohere-display text-[24px] sm:text-[36px] text-[#17171c]">{s.n}</p>
                <p className="cohere-mono-label !text-[11px] text-[#CC0000] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link href="/photos" className="cohere-btn-primary w-full sm:w-auto">
              Explore the gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/albums" className="cohere-btn-secondary">
              Browse albums
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- THE WALL — photos, videos & audios first ---------- */}
      <HomeMediaWall photos={photos} />

      {/* ---------- Albums preview ---------- */}
      <section className="bg-[#eeece7]/50 border-y border-[#d9d9dd]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4 pb-5">
            <div>
              <p className="cohere-mono-label text-[#CC0000]">Curated collections</p>
              <h2 className="cohere-display text-[32px] sm:text-[48px] text-[#17171c] mt-2">
                Albums &amp; events.
              </h2>
            </div>
            <Link href="/albums" className="hidden sm:inline-flex cohere-btn-secondary shrink-0">
              View all {totalAlbums} <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <AlbumGrid albums={featuredAlbums} />
          <div className="mt-6 text-center sm:hidden">
            <Link href="/albums" className="cohere-btn-secondary">
              View all {totalAlbums} albums
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Slim value band — quiet supporting act ---------- */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="rounded-[22px] bg-[#003c33] text-white px-7 py-9 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="lg:max-w-xs shrink-0">
              <p className="cohere-mono-label text-white/60">Why Gurukul</p>
              <h2 className="cohere-display text-[28px] sm:text-[36px] mt-2">
                Vidya. Sadvidya. Brahmavidya.
              </h2>
              <a
                href="https://gurukul.org/why-swaminarayan-gurukul/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center text-[14px] underline underline-offset-4 text-white/85 hover:text-white"
              >
                Read more <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-[16px] border border-white/15 bg-black/20 p-5">
                  <h3 className="text-[22px] leading-none">{v.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/70">{v.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip + CTA ---------- */}
      <section className="border-t border-[#d9d9dd] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-[13px] text-[#616161]">Trusted across 20+ Gurukul campuses in India &amp; the USA</p>
          <div className="trust-strip mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] font-semibold uppercase text-[#93939f]">
            {BRANCHES.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="rounded-[22px] bg-[#f1f5ff] border border-[#d9d9dd] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="cohere-mono-label text-[#75758a]">For parents &amp; alumni</p>
            <h2 className="cohere-display text-[28px] sm:text-[40px] text-[#17171c] mt-2">
              Find your child&apos;s moment in seconds.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link href="/photos" className="cohere-btn-primary">Search photos</Link>
            <a href="https://gurukul.org/admissions/" target="_blank" rel="noreferrer" className="cohere-btn-maroon">Apply online</a>
          </div>
        </div>
      </section>
    </div>
  );
}
