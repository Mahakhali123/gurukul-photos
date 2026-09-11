'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="bg-[#17171c] text-white mt-20">
      {/* Cohere footer-newsletter block */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-xl">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#ff7759]">
              G-Arts moves fast
            </p>
            <h2 className="cohere-display text-[32px] sm:text-[48px] mt-3">
              Never miss a Gurukul moment.
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-[#93939f]">
              New albums from Annual Day, sports, Yatras and daily campus life —
              preserved by the student G-Arts media wing since 1948.
            </p>
          </div>
          <form
            className="w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
          >
            <label htmlFor="footer-email" className="text-[12px] text-[#93939f]">
              Get album drops by email
            </label>
            {subscribed ? (
              <p className="mt-2 rounded-[32px] border border-[#ff7759]/40 bg-[#ff7759]/10 px-5 py-3 text-[14px] text-white">
                You&apos;re on the list — Jay Swaminarayan!
              </p>
            ) : (
            <div className="mt-2 flex items-center gap-2 rounded-[32px] border border-white/20 bg-white/5 p-1.5 pl-5">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-[14px] placeholder:text-[#75758a] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="w-11 h-11 rounded-full bg-white text-[#17171c] flex items-center justify-center font-bold hover:bg-[#ff7759] hover:text-[#17171c] transition"
              >
                →
              </button>
            </div>
            )}
            <p className="mt-2 text-[12px] text-[#75758a]">
              Official student archive. Photos belong to Shree Swaminarayan Gurukul.
            </p>
          </form>
        </div>

        {/* gurukul.org link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-[13px]">
          <div className="col-span-2 md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://gurukul.org/wp-content/themes/gurukularts/assets/logo_white.png"
              alt="Shree Swaminarayan Gurukul"
              className="h-12 w-auto mb-4"
            />
            <p className="text-[13px] leading-5 text-[#93939f] max-w-xs">
              Shree Swaminarayan Gurukul, a non-for-profit education &amp;
              socio-spiritual organization tirelessly serving since 1948.
            </p>
            <div className="flex gap-2 mt-4">
              <a href="https://facebook.com/gurukul.org" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">f</a>
              <a href="https://instagram.com/gurukul_org" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">ig</a>
              <a href="https://youtube.com/gurukulevents" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">yt</a>
              <a href="https://twitter.com/gurukul_org" target="_blank" rel="noreferrer" aria-label="X" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">x</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-[14px]">Gallery</h4>
            <ul className="space-y-2 text-[#93939f]">
              <li><Link href="/photos" className="hover:text-white">All Photos</Link></li>
              <li><Link href="/albums" className="hover:text-white">Albums</Link></li>
              <li><Link href="/photos?type=video" className="hover:text-white">Videos</Link></li>
              <li><Link href="/photos?type=audio" className="hover:text-white">Audios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-[14px]">Why Swaminarayan Gurukul?</h4>
            <ul className="space-y-2 text-[#93939f]">
              <li><a href="https://gurukul.org/vision-mission/" target="_blank" rel="noreferrer" className="hover:text-white">Vision &amp; Mission</a></li>
              <li><a href="https://gurukul.org/why-swaminarayan-gurukul/" target="_blank" rel="noreferrer" className="hover:text-white">Value System</a></li>
              <li><a href="https://gurukul.org/life-at-gurukul/academic-life/" target="_blank" rel="noreferrer" className="hover:text-white">Academic Life</a></li>
              <li><a href="https://gurukul.org/life-at-gurukul/residential-life/" target="_blank" rel="noreferrer" className="hover:text-white">Residential Life</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-[14px]">Quick Links</h4>
            <ul className="space-y-2 text-[#93939f]">
              <li><a href="https://gurukul.org/parents/" target="_blank" rel="noreferrer" className="hover:text-white">Parents</a></li>
              <li><a href="https://gurukul.org/admissions/" target="_blank" rel="noreferrer" className="hover:text-white">Admissions</a></li>
              <li><a href="https://gurukul.org/our-branches/" target="_blank" rel="noreferrer" className="hover:text-white">Our Branches</a></li>
              <li><a href="https://gurukul.org/blog/" target="_blank" rel="noreferrer" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#93939f]">
          <p>Copyright © 2026 Shree Swaminarayan Gurukul. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://gurukul.org/terms-conditions/" target="_blank" rel="noreferrer" className="hover:text-white">Terms &amp; Conditions</a>
            <a href="https://gurukul.org/privacy/" target="_blank" rel="noreferrer" className="hover:text-white">Privacy Policy</a>
            <a href="https://gurukul.org/refund-policy/" target="_blank" rel="noreferrer" className="hover:text-white">Refund Policy</a>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#75758a]">
          <p>
            Shree Swaminarayan Gurukul, Bangalore ·{' '}
            <a href="mailto:nishanth@nomin.com" className="text-white hover:text-[#ff7759]">nishanth@nomin.com</a>
          </p>
          <p>Official Student Photo Archive · G-Arts Gallery</p>
        </div>
      </div>
    </footer>
  );
}
