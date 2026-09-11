import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#212529] text-[#ced4da] mt-12">
      {/* Top footer like gurukul.org */}
      <div className="max-w-[1140px] mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img src="https://gurukul.org/wp-content/themes/gurukularts/assets/logo_white.png" alt="Gurukul" className="h-12 w-auto mb-4" />
            <p className="text-[13px] leading-5 text-[#adb5bd]">
              Shree Swaminarayan Gurukul, a non-for-profit education &amp; Socio-spiritual organization tirelessly serving since 1948.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com/gurukul.org" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">f</a>
              <a href="https://instagram.com/itsss_nishanth_" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">ig</a>
              <a href="https://youtube.com/gurukulevents" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#CC0000] text-white text-xs">yt</a>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[13px]">
            <div>
              <h4 className="font-semibold text-white mb-3 text-[14px]">Why Swaminarayan Gurukul ?</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">Vision &amp; Mission</Link></li>
                <li><Link href="/about" className="hover:text-white">Gurukul Value System</Link></li>
                <li><Link href="/photos" className="hover:text-white">Testimonials</Link></li>
                <li><Link href="/albums" className="hover:text-white">Academic Life</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-[14px]">Our Branches</h4>
              <ul className="space-y-2">
                <li><span className="text-[#adb5bd]">Bangalore</span></li>
                <li><span className="text-[#adb5bd]">Hyderabad • Nagpur • Raipur</span></li>
                <li><span className="text-[#adb5bd]">Ahmedabad • Jadcherla</span></li>
                <li><Link href="/albums" className="hover:text-white text-[#CC0000]">View all branches →</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-[14px]">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/photos" className="hover:text-white">Parents</Link></li>
                <li><Link href="/photos" className="hover:text-white">Admissions</Link></li>
                <li><Link href="/" className="hover:text-white">Blog</Link></li>

              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar like gurukul.org Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1140px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#adb5bd]">
          <p>Copyright @ 2025. Shree Swaminarayan Gurukul. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* Contacts bar — Bangalore branch */}
      <div className="bg-[#1a1d20] border-t border-white/5">
        <div className="max-w-[1140px] mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#adb5bd]">
          <p>Shree Swaminarayan Gurukul, Bangalore • <a href="mailto:nishanth@nomin.com" className="text-white hover:text-[#CC0000]">nishanth@nomin.com</a></p>
          <p>Official Student Photo Archive • G-Arts Gallery</p>
        </div>
      </div>
    </footer>
  );
}
