import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Play, Music2, Images } from 'lucide-react';
import { getDriveData } from '@/lib/drive';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { AlbumGrid } from '@/components/albums/AlbumGrid';

export const revalidate = 600;

const BRANCHES = [
  'Hyderabad', 'Bengaluru', 'Mumbai', 'Nagpur', 'Raipur', 'Delhi', 'Ahmedabad', 'Jadcherla',
];

const VALUES = [
  {
    title: 'Vidya',
    sub: 'Modern Education',
    points: ['Dynamism', 'Curiosity', 'Ambition', 'Creativity', 'Leadership'],
    href: 'https://gurukul.org/why-swaminarayan-gurukul/',
  },
  {
    title: 'Sadvidya',
    sub: 'Traditional Education',
    points: ['Gratitude', 'Empathy', 'Integrity', 'Non-violence', 'Addiction-free living'],
    href: 'https://gurukul.org/why-swaminarayan-gurukul/',
  },
  {
    title: 'Brahmavidya',
    sub: 'Spiritual Education',
    points: ['Faith', 'Devotion', 'Self-realization', 'Non-attachment', 'Saints’ affection'],
    href: 'https://gurukul.org/why-swaminarayan-gurukul/',
  },
];

export default async function HomePage() {
  const data = await getDriveData();
  const { photos, albums } = data;

  const totalPhotos = photos.length;
  const totalVideos = photos.filter((p) => p.mediaType === 'video').length;
  const totalAudios = photos.filter((p) => p.mediaType === 'audio').length;
  const totalAlbums = albums.length;
  const latestPhotos = photos.slice(0, 8);
  const featuredAlbums = albums.slice(0, 4);

  return (
    <div className="bg-white">
      {/* ---------- Cohere hero: monumental type over white canvas ---------- */}
      <section className="w-full bg-white pt-12 sm:pt-20 pb-10 sm:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p className="cohere-mono-label text-[#93939f]">
            Shree Swaminarayan Gurukul · Official events archive
          </p>
          <h1 className="cohere-display text-[48px] sm:text-[72px] lg:text-[96px] text-[#17171c] mt-4">
            G-Arts Gallery.
          </h1>
          <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.5] text-[#616161] max-w-2xl mx-auto">
            Every Annual Day, Yatra, match and morning assembly — captured and
            preserved by students, for students. Vidya, Sadvidya, Brahmavidya.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link href="/photos" className="cohere-btn-primary w-full sm:w-auto">
              Explore the gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/albums" className="cohere-btn-secondary">
              Browse albums
            </Link>
          </div>

          {/* Two-card hero media composition */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 text-left">
            <div className="cohere-media-card lg:col-span-2 relative min-h-[280px] sm:min-h-[420px] bg-[#EFF2F6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-main.jpg"
                alt="G-Arts Studio — students editing Gurukul photos"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full bg-white/90 text-[#17171c] backdrop-blur">
                G-Arts studio · on campus
              </span>
            </div>
            <div className="rounded-[22px] bg-[#003c33] text-white p-7 sm:p-8 flex flex-col justify-between min-h-[280px]">
              <div>
                <p className="cohere-mono-label text-white/60">Live archive</p>
                <p className="cohere-display text-[44px] sm:text-[56px] mt-3">
                  {totalPhotos.toLocaleString('en-IN')}
                </p>
                <p className="text-[14px] text-white/70 mt-1">
                  photos · {totalVideos} videos · {totalAudios} audios across {totalAlbums} albums
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between rounded-[8px] bg-white/10 border border-white/15 px-4 py-3 text-[13px]">
                  <span className="flex items-center gap-2"><Images className="w-4 h-4" /> Latest drops</span>
                  <Link href="/photos" className="underline underline-offset-4 hover:opacity-80">Open</Link>
                </div>
                <div className="flex items-center justify-between rounded-[8px] bg-white/10 border border-white/15 px-4 py-3 text-[13px]">
                  <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Films &amp; assemblies</span>
                  <Link href="/photos?type=video" className="underline underline-offset-4 hover:opacity-80">Watch</Link>
                </div>
                <div className="flex items-center justify-between rounded-[8px] bg-white/10 border border-white/15 px-4 py-3 text-[13px]">
                  <span className="flex items-center gap-2"><Music2 className="w-4 h-4" /> Bhajans &amp; music</span>
                  <Link href="/photos?type=audio" className="underline underline-offset-4 hover:opacity-80">Listen</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Cohere trust-logo strip ---------- */}
      <section className="border-y border-[#d9d9dd] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 text-center">
          <p className="text-[14px] text-[#212121]">Trusted across 20+ Gurukul campuses in India &amp; the USA</p>
          <div className="trust-strip mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-semibold uppercase text-[#93939f]">
            {BRANCHES.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Capability cards (3-col, top rules) ---------- */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="cohere-display text-[32px] sm:text-[48px] text-[#17171c]">
            Everything the campus creates.
          </h2>
          <Link href="/photos" className="hidden sm:inline-flex cohere-btn-secondary shrink-0">
            View all media <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: 'Photos', d: 'Stage lights, trophies, classrooms and candid hostel life — full-resolution stills.', c: `${totalPhotos - totalVideos - totalAudios} items`, href: '/photos' },
            { t: 'Videos', d: 'Dramas, dances, speeches and sports finals. Plays inline, downloads in one tap.', c: `${totalVideos} films`, href: '/photos?type=video' },
            { t: 'Audios', d: 'Bhajans, assemblies and event soundtracks from the campus sound desk.', c: `${totalAudios} tracks`, href: '/photos?type=audio' },
          ].map((c) => (
            <div key={c.t} className="border-t border-[#d9d9dd] pt-6">
              <p className="cohere-mono-label text-[#ff7759]">{c.c}</p>
              <h3 className="text-[24px] leading-[1.3] text-[#212121] mt-2">{c.t}</h3>
              <p className="text-[16px] leading-[1.5] text-[#616161] mt-2">{c.d}</p>
              <Link href={c.href} className="cohere-btn-secondary mt-3 text-[14px]">Open {c.t.toLowerCase()}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Cohere dark-feature-band: Gurukul value system ---------- */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="cohere-dark-band p-8 sm:p-14 lg:p-20">
          <p className="cohere-mono-label text-white/60">Our value system</p>
          <h2 className="cohere-display text-[32px] sm:text-[60px] mt-4 max-w-3xl">
            Vidya. Sadvidya. Brahmavidya.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-white/75 max-w-2xl leading-[1.5]">
            The holistic blend behind every Gurukul album since 1948 — modern
            education, traditional character, spiritual grounding.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-[8px] border border-white/15 bg-black/20 p-6">
                <h3 className="text-[32px] leading-none">{v.title}</h3>
                <p className="mt-1 text-[14px] text-white/60">{v.sub}</p>
                <ul className="mt-4 space-y-2 text-[14px] text-white/85">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#ff7759]" /> {p}
                    </li>
                  ))}
                </ul>
                <a href={v.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center text-[14px] underline underline-offset-4 text-white hover:text-[#ffad9b]">
                  Read more <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Product tiles: albums + photos (soft-stone) ---------- */}
      <section className="bg-[#eeece7]/60 border-y border-[#d9d9dd]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-[8px] bg-[#17171c] text-white p-6 sm:p-8">
              <div className="text-center border-b border-white/10 pb-6">
                <h3 className="text-[24px]">Popular Albums.</h3>
                <p className="mt-1 text-[14px] text-[#93939f]">Curated collections, updated daily.</p>
                <div className="mt-4 flex items-center justify-center gap-4 text-[13px]">
                  <Link href="/albums" className="rounded-[32px] bg-white text-[#17171c] px-5 py-2 font-semibold">
                    View all {totalAlbums}
                  </Link>
                  <Link href="/albums" className="underline underline-offset-4 text-white/80">Browse →</Link>
                </div>
              </div>
              <div className="pt-5">
                <AlbumGrid albums={featuredAlbums} />
              </div>
            </div>
            <div className="rounded-[8px] bg-white border border-[#d9d9dd] p-6 sm:p-8">
              <div className="text-center border-b border-[#d9d9dd] pb-6">
                <h3 className="text-[24px] text-[#212121]">Latest Photos.</h3>
                <p className="mt-1 text-[14px] text-[#616161]">Fresh moments from Gurukul.</p>
                <div className="mt-4 flex items-center justify-center gap-4 text-[13px]">
                  <Link href="/photos" className="rounded-[32px] bg-[#17171c] text-white px-5 py-2 font-medium">
                    View all {totalPhotos}
                  </Link>
                  <Link href="/photos" className="text-[#1863dc] underline underline-offset-4">Learn more →</Link>
                </div>
              </div>
              <div className="pt-5">
                <PhotoGrid photos={latestPhotos.slice(0, 4)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Editorial lists with hairline rules ---------- */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-12">
        <div>
          <div className="flex items-end justify-between border-b border-[#d9d9dd] pb-3">
            <h2 className="text-[32px] leading-[1.2] text-[#212121]">Albums.</h2>
            <Link href="/albums" className="text-[14px] text-[#1863dc] hover:underline font-medium">
              View all albums ({totalAlbums}) →
            </Link>
          </div>
          <div className="pt-6">
            <AlbumGrid albums={featuredAlbums} />
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between border-b border-[#d9d9dd] pb-3">
            <h2 className="text-[32px] leading-[1.2] text-[#212121]">Latest Photos.</h2>
            <Link href="/photos" className="text-[14px] text-[#1863dc] hover:underline font-medium">
              View all photos ({totalPhotos}) →
            </Link>
          </div>
          <div className="pt-6">
            <PhotoGrid photos={latestPhotos} />
          </div>
        </div>
      </section>

      {/* ---------- Pale-blue CTA band ---------- */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-[22px] bg-[#f1f5ff] border border-[#d9d9dd] p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="cohere-mono-label text-[#75758a]">For parents &amp; alumni</p>
            <h2 className="cohere-display text-[32px] sm:text-[48px] text-[#17171c] mt-3">
              Find your child&apos;s moment in seconds.
            </h2>
            <p className="mt-3 text-[16px] text-[#616161]">
              Search by event, album or name. Open any photo to view, play, or
              download the original file.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href="/photos" className="cohere-btn-primary">Search photos</Link>
            <a href="https://gurukul.org/admissions/" target="_blank" rel="noreferrer" className="cohere-btn-maroon">Apply online</a>
          </div>
        </div>
      </section>
    </div>
  );
}
