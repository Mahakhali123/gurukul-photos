'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { SearchModal } from '../gallery/SearchModal';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const mainNav: { name: string; href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'Photos', href: '/photos' },
    { name: 'Albums', href: '/albums' },
    { name: 'Videos', href: '/photos?type=video' },
    { name: 'Audios', href: '/photos?type=audio' },
  ];

  return (
    <>

      {/* Main header — like gurukul.org #header .header */}
      <header className="gurukul-header sticky top-0 z-40 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo — gurukul.org head-logo-1.svg */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="https://gurukul.org/wp-content/uploads/2023/09/head-logo-1.svg"
                alt="Shree Swaminarayan Gurukul"
                className="h-10 w-auto hidden sm:block"
              />
              <div className="flex flex-col sm:hidden">
                <span className="text-[16px] font-bold leading-none text-[#212529]">SHREE SWAMINARAYAN</span>
                <span className="text-[11px] tracking-[0.15em] text-[#CC0000] font-semibold">GURUKUL</span>
              </div>
              <span className="hidden lg:block text-xs text-[#6c757d] border-l border-[#e9ecef] pl-3 ml-1 leading-tight">
                International School<br />
                <span className="text-[#CC0000] font-semibold">G-Arts Gallery</span>
              </span>
            </Link>

            {/* Desktop nav — like gurukul.org #navbar */}
            <nav className="hidden lg:flex items-center gap-6">
              {mainNav.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14px] font-medium flex items-center gap-1 text-[#212529] hover:text-[#CC0000] min-h-[44px] flex items-center"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/photos"
                className="text-[14px] font-semibold text-white bg-[#CC0000] hover:bg-[#a00000] rounded px-4 py-2 min-h-[44px] inline-flex items-center"
              >
                View Gallery
              </Link>
            </nav>

            {/* Right — Search + Built by Nomin */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center text-[11px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full bg-[#FFF1E6] text-[#CC0000] border border-[#FFD8B5]">
                Built by Nishanth
              </span>
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-[#e9ecef] text-[#212529] hover:text-[#CC0000] hover:border-[#CC0000]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 text-[#212529]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#212529]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e9ecef] bg-white px-4 py-2 space-y-1 max-h-[70vh] overflow-y-auto">
            {mainNav.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-2 text-[15px] font-semibold border-b border-[#e9ecef]/60 text-[#212529] hover:text-[#CC0000] min-h-[44px] flex items-center"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/photos"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 mb-2 text-center text-[15px] font-bold text-white bg-[#CC0000] hover:bg-[#a00000] rounded-lg px-4 py-3 min-h-[48px]"
            >
              View Gallery
            </Link>
            <div className="pt-1 pb-3 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#CC0000]">Built by Nomin</div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
