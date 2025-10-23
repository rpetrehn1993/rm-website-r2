'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation Overlay */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="min-h-screen bg-newsprint">
        {/* Sticky Header - Same as homepage but with charcoal colors */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-newsprint" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(13px, 3vw, 30px)', paddingBottom: 'clamp(13px, 3vw, 30px)' }}>
          <Link href="/" className="relative block group" style={{ height: 'clamp(36px, 4vw, 56px)', width: 'clamp(52px, 5.8vw, 82px)' }}>
          <Image
              src="/assets/main-logo.svg"
              alt="RM Logo"
              fill
              className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
            />
          </Link>
          
          <Link href="/" className="text-charcoal hover:text-accent-red font-medium transition-colors" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(0.8rem, 1.6vw, 1.6rem)' }}>
            Reagan Matthew
          </Link>
          
          <button 
            className="relative group" 
            style={{ height: 'clamp(38px, 4vw, 58px)', width: 'clamp(38px, 4vw, 58px)' }}
            aria-label="Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Image
              src="/assets/menu-icon.svg"
              alt="Menu"
              fill
              className="object-contain [filter:invert(1)] group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
            />
          </button>
        </header>

        {/* Hero-style Section with Overlay Text - Similar to Homepage */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Split Content Container */}
          <div className="flex flex-col lg:flex-row min-h-screen" style={{ paddingTop: 'clamp(6rem, 12vw, 10rem)' }}>
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 bg-newsprint" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
              {/* Bio Paragraph 1 */}
              <div className="mb-6 max-w-xl" style={{ marginTop: 'clamp(8rem, 15vw, 12rem)' }}>
                <p className="text-charcoal leading-normal text-justify" style={{ fontFamily: 'var(--font-times)', fontSize: 'clamp(0.75rem, 1vw, 1.17rem)', lineHeight: '1.4' }}>
                  <span className="font-bold">Reagan Matthew</span> is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.
                </p>
              </div>

              {/* Bio Paragraph 2 */}
              <div className="mb-6 max-w-xl">
                <p className="text-charcoal leading-normal text-justify" style={{ fontFamily: 'var(--font-times)', fontSize: 'clamp(0.75rem, 1vw, 1.17rem)', lineHeight: '1.4' }}>
                  <span className="font-bold">Reagan Matthew</span> is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.
                </p>
              </div>

              {/* Bio Paragraph 3 */}
              <div className="mb-12 max-w-xl">
                <p className="text-charcoal leading-normal text-justify" style={{ fontFamily: 'var(--font-times)', fontSize: 'clamp(0.75rem, 1vw, 1.17rem)', lineHeight: '1.4' }}>
                  <span className="font-bold">Reagan Matthew</span> is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.
                </p>
              </div>

              {/* Contact Button */}
              <Link href="/contact" className="border-charcoal bg-transparent text-charcoal hover:text-accent-red hover:border-accent-red inline-block border-2 font-medium transition-colors" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', padding: 'clamp(0.5rem, 0.8vw, 0.75rem) clamp(1.5rem, 2.5vw, 2rem)' }}>
                Contact
              </Link>
            </div>

            {/* Right Side - Hero Image */}
            <div className="w-full lg:w-1/2 relative" style={{ minHeight: '60vh' }}>
              <div className="relative w-full" style={{ minHeight: '60vh', height: '100%' }}>
                <Image
                  src="/assets/about-hero.png"
                  alt="Reagan Matthew"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Large ABOUT Heading - Full Bleed Overlay on top of everything */}
          <div className="absolute z-10 left-0 right-0" style={{ top: 'clamp(6rem, 12vw, 10rem)', paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)' }}>
            <h1 className="text-charcoal font-normal justify-spread" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(3rem, 11vw, 15rem)', lineHeight: '0.9', letterSpacing: '-0.02em', maxWidth: '100%' }}>
              ABOUT
            </h1>
          </div>

          {/* Copyright Text - Over Image on Desktop */}
          <div className="hidden lg:block absolute top-0 right-0 text-newsprint font-medium z-20" style={{ paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(6rem, 12vw, 10rem)', fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(0.8rem, 1.2vw, 1.4rem)' }}>
            Reagan Matthew © 2025
          </div>
        </section>

        {/* Footer - Desktop */}
        <footer className="hidden md:block" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <Link href="/" className="relative block group" style={{ height: 'clamp(50px, 5vw, 70px)', width: 'clamp(73px, 7.3vw, 102px)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <Image
                src="/assets/main-logo.svg"
                alt="RM Logo"
                fill
                className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
              />
            </Link>
            
            {/* Line under logo */}
            <div className="w-full h-px bg-charcoal" />
          </div>

          <div className="text-charcoal grid grid-cols-1 gap-4 font-bold md:grid-cols-2 lg:grid-cols-4" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>
            <button className="text-left hover:text-accent-red transition-colors">
              <p>Home, Projects, About, Contact</p>
            </button>
            <button className="text-left md:text-right hover:text-accent-red transition-colors">
              <p>Instagram, Newsletter</p>
            </button>
            <button className="text-left lg:text-right hover:text-accent-red transition-colors">
              <p>Imprint, Privacy Policy</p>
            </button>
            <button className="text-left md:text-right hover:text-accent-red transition-colors">
              <p>Reagan Matthew © 2025</p>
            </button>
          </div>
        </footer>

        {/* Footer - Mobile */}
        <footer className="md:hidden relative" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(13px, 3vw, 30px)', paddingBottom: 'clamp(13px, 3vw, 30px)' }}>
          {/* Top Row: Logo and Contact Button */}
          <div className="flex items-start justify-between mb-12">
            <Link href="/" className="relative block group h-[70px] w-[102px]">
              <Image
                src="/assets/main-logo.svg"
                alt="RM Logo"
                fill
                className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
              />
            </Link>
            
            <Link href="/contact" className="border-charcoal bg-transparent text-charcoal hover:text-accent-red hover:border-accent-red border-2 font-medium transition-colors px-8 py-3" style={{ fontFamily: 'var(--font-helvetica)', fontSize: '1.125rem' }}>
              Contact
            </Link>
          </div>

          {/* Line */}
          <div className="w-full h-px bg-charcoal mb-8" />

          {/* Footer Text - Line 1 */}
          <div className="flex items-center justify-between mb-4 text-charcoal font-bold" style={{ fontFamily: 'var(--font-helvetica)', fontSize: '1.125rem' }}>
            <button className="text-left hover:text-accent-red transition-colors flex-shrink">
              <p>Home, Projects, About, Contact</p>
            </button>
            <button className="text-right hover:text-accent-red transition-colors flex-shrink-0 whitespace-nowrap">
              <p>Reagan Matthew © 2025</p>
            </button>
          </div>

          {/* Footer Text - Line 2 */}
          <div className="flex items-center justify-between text-charcoal font-bold" style={{ fontFamily: 'var(--font-helvetica)', fontSize: '1.125rem' }}>
            <button className="text-left hover:text-accent-red transition-colors flex-shrink">
              <p>Instagram, Newsletter</p>
            </button>
            <button className="text-right hover:text-accent-red transition-colors flex-shrink-0 whitespace-nowrap">
              <p>Imprint, Privacy Policy</p>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
