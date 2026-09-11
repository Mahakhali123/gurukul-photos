'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Images, Play, Music2, LayoutGrid } from 'lucide-react';
import { DriveFile } from '@/types';
import { PhotoGrid } from './PhotoGrid';

type Tab = 'all' | 'image' | 'video' | 'audio';

const TABS: { label: string; value: Tab; icon: React.ReactNode }[] = [
  { label: 'All', value: 'all', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { label: 'Photos', value: 'image', icon: <Images className="w-3.5 h-3.5" /> },
  { label: 'Videos', value: 'video', icon: <Play className="w-3.5 h-3.5" /> },
  { label: 'Audios', value: 'audio', icon: <Music2 className="w-3.5 h-3.5" /> },
];

export function HomeMediaWall({ photos }: { photos: DriveFile[] }) {
  const [tab, setTab] = useState<Tab>('all');

  const counts = useMemo(() => {
    return {
      all: photos.length,
      image: photos.filter((p) => p.mediaType !== 'video' && p.mediaType !== 'audio').length,
      video: photos.filter((p) => p.mediaType === 'video').length,
      audio: photos.filter((p) => p.mediaType === 'audio').length,
    };
  }, [photos]);

  const wall = useMemo(() => {
    const list = tab === 'all' ? photos : photos.filter((p) => (p.mediaType || 'image') === tab);
    return list.slice(0, 24);
  }, [photos, tab]);

  const tabHref = tab === 'all' ? '/photos' : `/photos?type=${tab}`;

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-14 sm:pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#d9d9dd]">
        <div>
          <p className="cohere-mono-label text-[#CC0000]">Fresh from campus</p>
          <h2 className="cohere-display text-[32px] sm:text-[48px] text-[#17171c] mt-2">
            The wall of moments.
          </h2>
        </div>

        {/* Segmented media switcher — Gurukul red active */}
        <div className="flex items-center gap-1 rounded-full border border-[#d9d9dd] bg-white p-1 w-fit">
          {TABS.map((t) => {
            const active = tab === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-[13px] font-medium transition-all min-h-[40px] ${
                  active
                    ? 'bg-[#CC0000] text-white shadow'
                    : 'text-[#616161] hover:text-[#17171c] hover:bg-[#eeece7]'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
                <span className={`text-[11px] ${active ? 'text-white/70' : 'text-[#93939f]'}`}>
                  {counts[t.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6">
        {wall.length > 0 ? (
          <PhotoGrid photos={wall} />
        ) : (
          <p className="py-16 text-center text-[14px] text-[#93939f]">
            Nothing here yet — check back after the next event.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <Link href={tabHref} className="cohere-btn-primary w-full sm:w-auto">
          Open the full gallery
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
        <Link href="/albums" className="cohere-btn-secondary">
          Browse albums instead
        </Link>
      </div>
    </section>
  );
}
