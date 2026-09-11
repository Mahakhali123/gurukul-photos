'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { SearchModal } from '../gallery/SearchModal';

const GURUKUL_LOGO =
  'https://gurukul.org/wp-content/uploads/2023/09/head-logo-1.svg';
const MONOGRAM =
  'https://gurukul.org/wp-content/themes/gurukularts/assets/gurukul_monogram.svg';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  const galleryNav = [
    { name: 'Home', href: '/' },
    { name: 'Photos', href: '/photos' },
    { name: 'Albums', href: '/albums' },
    { name: 'Videos', href: '/photos?type=video' },
    { name: 'Audios', href: '/photos?type=audio' },
  ];

  const gurukulNav = [
    { name: 'Why Gurukul?', href: 'https://gurukul.org/why-swaminarayan-gurukul/' },
    { name: 'Branches', href: 'https://gurukul.org/our-branches/' },
    { name: 'Admissions', href: 'https://gurukul.org/admissions/' },
    { name: 'Events', href: 'https://gurukul.org/events/' },
    { name: 'Blog', href: 'https://gurukul.org/blog/' },
  ];

  return (
    <div className="gurukul-chrome relative">
      {/* Cohere announcement-bar: black 36px strip */}
      {announcementOpen && (
        <div className="gurukul-announcement flex items-center justify-center px-10 relative">
          <p className="truncate text-center">
            Admissions open 2026–27 · Shree Swaminarayan Gurukul International School
            <a
              href="https://gurukul.org/admissions/"
              target="_blank"
              rel="noreferrer"
              className="ml-2 underline underline-offset-2 hover:opacity-80"
            >
              Learn more
            </a>
          </p>
          <button
            onClick={() => setAnnouncementOpen(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-70 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* gurukul.org top-header utility bar */}
      <div className="gurukul-topbar hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6 h-9 flex items-center justify-between">
          <a
            href="https://gurukul.org"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[#212529] hover:text-[#CC0000]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MONOGRAM} alt="" className="h-4 w-auto" />
            <span className="text-[13px]">Home</span>
          </a>
          <nav className="flex items-center gap-5 text-[13px] text-[#212529]">
            <a className="hover:text-[#CC0000]" href="https://gurukul.org/parents/" target="_blank" rel="noreferrer">Parents</a>
            <a className="hover:text-[#CC0000]" href="https://gurukul.org/alumni/" target="_blank" rel="noreferrer">Alumni</a>
            <a className="hover:text-[#CC0000]" href="https://gurukul.org/csr/" target="_blank" rel="noreferrer">CSR</a>
            <a className="hover:text-[#CC0000]" href="https://gurukul.org/our-branches/" target="_blank" rel="noreferrer">Our Branches</a>
            <a className="hover:text-[#CC0000]" href="https://gurukul.org/downloads/" target="_blank" rel="noreferrer">Downloads</a>
          </nav>
        </div>
      </div>

      {/* Main header — three-zone Cohere nav inside gurukul.org chrome.
          Logo is clipped flush to the left margin and enlarged. */}
      <header className="gurukul-header sticky top-0 z-40 bg-white">
        <div className="gurukul-header-container">
          <div className="flex items-center justify-between min-h-[76px] lg:min-h-[88px] gap-4">
            {/* Logo — white plaque clipped up over the ribbon, enlarged */}
            <Link href="/" className="gurukul-logo-anchor gurukul-logo-overlap" aria-label="G-Arts Gurukul Gallery home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GURUKUL_LOGO}
                alt="Shree Swaminarayan Gurukul"
                className="gurukul-logo-img hidden sm:block"
              />
              <span className="sm:hidden flex flex-col py-2">
                <span className="text-[16px] font-bold leading-none text-[#212121]">SHREE SWAMINARAYAN</span>
                <span className="text-[11px] tracking-[0.15em] text-[#CC0000] font-semibold">GURUKUL · G-ARTS</span>
              </span>
            </Link>

            {/* Center menu */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
              {galleryNav.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14px] font-medium text-[#212121] hover:text-[#CC0000] min-h-[44px] inline-flex items-center"
                >
                  {link.name}
                </Link>
              ))}
              <span className="h-5 w-px bg-[#d9d9dd]" aria-hidden="true" />
              {gurukulNav.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] text-[#616161] hover:text-[#17171c] min-h-[44px] inline-flex items-center"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right zone */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden xl:inline-flex items-center text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full bg-[#edfce9] text-[#003c33] border border-[#003c33]/15">
                Built by Nishanth
              </span>
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center justify-center h-10 px-4 rounded-[30px] border border-[#17171c] text-[#17171c] text-[13px] font-medium hover:bg-[#17171c] hover:text-white transition"
                aria-label="Search gallery"
              >
                <Search className="w-4 h-4 mr-1.5" />
                Search
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 text-[#212121]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/photos"
                className="hidden sm:inline-flex items-center justify-center rounded-[32px] bg-[#17171c] hover:bg-black text-white text-[14px] font-medium px-6 min-h-[44px] transition"
              >
                View Gallery
              </Link>
              <a
                href="https://gurukul.org/admissions/"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center justify-center rounded-[32px] bg-[#CC0000] hover:bg-[#a00000] text-white text-[14px] font-semibold px-5 min-h-[44px] transition"
              >
                Apply Online
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#212121]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#d9d9dd] bg-white px-4 py-2 max-h-[70vh] overflow-y-auto">
            <p className="cohere-mono-label text-[#93939f] px-2 pt-3 pb-1">Gallery</p>
            {galleryNav.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-2 text-[15px] font-semibold border-b border-[#e5e7eb] text-[#212121] min-h-[44px] flex items-center"
              >
                {link.name}
              </Link>
            ))}
            <p className="cohere-mono-label text-[#93939f] px-2 pt-4 pb-1">gurukul.org</p>
            {gurukulNav.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="block py-3 px-2 text-[15px] border-b border-[#e5e7eb] text-[#616161] min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-2 py-4">
              <Link
                href="/photos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center text-[15px] font-semibold text-white bg-[#17171c] rounded-[32px] px-4 py-3 min-h-[48px]"
              >
                View Gallery
              </Link>
              <a
                href="https://gurukul.org/admissions/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center text-[15px] font-bold text-white bg-[#CC0000] rounded-[32px] px-4 py-3 min-h-[48px]"
              >
                Apply Online
              </a>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
