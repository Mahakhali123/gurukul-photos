'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { SearchModal } from '../gallery/SearchModal';

const GURUKUL_LOGO =
  'https://gurukul.org/wp-content/uploads/2023/09/head-logo-1.svg';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Same five gallery destinations as the classic header.
  const mainNav = [
    { name: 'Home', href: '/' },
    { name: 'Photos', href: '/photos' },
    { name: 'Albums', href: '/albums' },
    { name: 'Videos', href: '/photos?type=video' },
    { name: 'Audios', href: '/photos?type=audio' },
  ];

  return (
    <>
      {/* Classic single-row header — white, hairline rule, red accents */}
      <header className="gurukul-header sticky top-0 z-40 bg-white">
        <div className="gurukul-header-container">
          <div className="flex items-center justify-between min-h-[72px] lg:min-h-[84px] gap-4">
            {/* Logo — clipped flush to the left margin, enlarged */}
            <Link href="/" className="gurukul-logo-anchor" aria-label="G-Arts Gurukul Gallery home">
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
              <span className="hidden lg:flex flex-col border-l border-[#e9ecef] pl-3 ml-1 leading-tight text-left">
                <span className="text-[11px] text-[#6c757d]">International School</span>
                <span className="text-[13px] text-[#CC0000] font-bold">G-Arts Gallery</span>
              </span>
            </Link>

            {/* Center nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
              {mainNav.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14px] font-medium text-[#212121] hover:text-[#CC0000] min-h-[44px] inline-flex items-center transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right zone */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden xl:inline-flex items-center text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full bg-[#ffe3e3] text-[#a00000] border border-[#CC0000]/25">
                Built by Nishanth
              </span>
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-[#e9ecef] text-[#212121] hover:text-[#CC0000] hover:border-[#CC0000] transition"
                aria-label="Search gallery"
              >
                <Search className="w-4 h-4" />
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
                className="hidden sm:inline-flex items-center justify-center rounded-[8px] bg-[#CC0000] hover:bg-[#a00000] text-white text-[14px] font-semibold px-5 min-h-[44px] transition"
              >
                View Gallery
              </Link>
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
          <div className="lg:hidden border-t border-[#e9ecef] bg-white px-4 py-2 max-h-[70vh] overflow-y-auto">
            {mainNav.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-2 text-[15px] font-semibold border-b border-[#e9ecef] text-[#212121] hover:text-[#CC0000] min-h-[44px] flex items-center"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/photos"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 mb-2 text-center text-[15px] font-bold text-white bg-[#CC0000] hover:bg-[#a00000] rounded-[8px] px-4 py-3 min-h-[48px]"
            >
              View Gallery
            </Link>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
