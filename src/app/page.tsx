'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation Overlay */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="min-h-screen bg-newsprint">
        {/* Sticky Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(13px, 3vw, 30px)', paddingBottom: 'clamp(13px, 3vw, 30px)' }}>
          <Link href="/" className="relative block group" style={{ height: 'clamp(36px, 4vw, 56px)', width: 'clamp(52px, 5.8vw, 82px)' }}>
          <Image
              src="/assets/logo-white.svg"
              alt="RM Logo"
              fill
              className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
            />
          </Link>
          
          <Link href="/" className="text-newsprint hover:text-accent-red font-medium transition-colors" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(0.8rem, 1.6vw, 1.6rem)' }}>
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
              className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
            />
          </button>
        </header>

        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] overflow-hidden">
          {/* Hero Image with Greyscale Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/assets/hero-asset.png"
              alt="Reagan Matthew"
              fill
              className="object-cover"
              priority
            />
            {/* Greyscale and Darken Effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-charcoal opacity-25" />
              <div className="absolute inset-0 bg-charcoal mix-blend-saturation" />
            </div>
          </div>

        {/* Click to Play Button */}
        <button className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex items-center group" style={{ gap: 'clamp(8px, 1vw, 10px)' }}>
          <div className="shrink-0 bg-newsprint group-hover:bg-accent-red transition-colors" style={{ width: 'clamp(20px, 2vw, 29px)', height: 'clamp(20px, 2vw, 29px)' }} />
          <span className="text-newsprint group-hover:text-accent-red font-normal leading-none text-center whitespace-nowrap transition-colors" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}>
            Click to play
          </span>
        </button>

        {/* Hero Text */}
        <div className="absolute z-10 lg:max-w-3xl" style={{ left: 'clamp(13px, 3vw, 30px)', right: 'clamp(13px, 3vw, 30px)', bottom: 'clamp(3rem, 10vw, 8rem)', minWidth: '0', width: 'auto' }}>
          <p className="text-newsprint" style={{ fontFamily: 'var(--font-times)', fontSize: 'clamp(1.125rem, 2.5vw, 2.5rem)', lineHeight: '1.5', wordBreak: 'break-word' }}>
            <span className="italic">Reagan Matthew</span>
            <span> is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.</span>
          </p>
        </div>
      </section>

      {/* Selected Works Section */}
      <section style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        {/* Selected Works Heading */}
        <div className="mb-8">
          <div className="relative w-full" style={{ height: 'clamp(60px, 8vw, 154px)', minWidth: '0' }}>
            <Image
              src="/assets/selected-works.svg"
              alt="SELECTED WORKS"
              fill
              className="object-contain object-left"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Divider Line */}
        <div className="mb-16 h-px w-full bg-charcoal" />

        {/* Masonry Grid - Responsive */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Project 1 */}
          <div>
            <button className="group relative aspect-[3/4] w-full overflow-hidden block">
              <Image
                src="/assets/project-1.png"
                alt="Project 1"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative opacity-0 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/assets/play-icon.svg"
                    alt="View Project"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
            <div className="mt-4">
              <h3 className="text-charcoal text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-helvetica)' }}>TITLE</h3>
              <p className="text-charcoal text-base italic mb-2" style={{ fontFamily: 'var(--font-times)' }}>Information 2024</p>
              <p className="text-charcoal text-base leading-relaxed" style={{ fontFamily: 'var(--font-helvetica)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Project 2 */}
          <div>
            <button className="group relative aspect-[3/4] w-full overflow-hidden block">
              <Image
                src="/assets/project-2.png"
                alt="Project 2"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative opacity-0 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/assets/play-icon.svg"
                    alt="View Project"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
            <div className="mt-4">
              <h3 className="text-charcoal text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-helvetica)' }}>TITLE</h3>
              <p className="text-charcoal text-base italic mb-2" style={{ fontFamily: 'var(--font-times)' }}>Information 2024</p>
              <p className="text-charcoal text-base leading-relaxed" style={{ fontFamily: 'var(--font-helvetica)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Project 3 - Catalyst Trade */}
          <div>
            <Link href="/projects/catalyst" className="group relative aspect-[3/4] w-full overflow-hidden block">
              <Image
                src="/assets/project-3.png"
                alt="Catalyst Trade Project"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative opacity-0 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/assets/play-icon.svg"
                    alt="View Project"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
            <div className="mt-4">
              <h3 className="text-charcoal text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-helvetica)' }}>Catalyst Trade</h3>
              <p className="text-charcoal text-base italic mb-2" style={{ fontFamily: 'var(--font-times)' }}>Brand Identity 2024</p>
              <p className="text-charcoal text-base leading-relaxed" style={{ fontFamily: 'var(--font-helvetica)' }}>
                A comprehensive brand identity and digital experience project for a modern trading platform, focusing on clarity and trust in financial technology.
              </p>
            </div>
          </div>

          {/* Project 4 */}
          <div>
            <button className="group relative aspect-[3/4] w-full overflow-hidden block">
              <Image
                src="/assets/project-4.png"
                alt="Project 4"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative opacity-0 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/assets/play-icon.svg"
                    alt="View Project"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
            <div className="mt-4">
              <h3 className="text-charcoal text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-helvetica)' }}>TITLE</h3>
              <p className="text-charcoal text-base italic mb-2" style={{ fontFamily: 'var(--font-times)' }}>Information 2024</p>
              <p className="text-charcoal text-base leading-relaxed" style={{ fontFamily: 'var(--font-helvetica)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Project 5 */}
          <div>
            <button className="group relative aspect-[3/4] w-full overflow-hidden block">
              <Image
                src="/assets/project-5.png"
                alt="Project 5"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative opacity-0 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/assets/play-icon.svg"
                    alt="View Project"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
            <div className="mt-4">
              <h3 className="text-charcoal text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-helvetica)' }}>TITLE</h3>
              <p className="text-charcoal text-base italic mb-2" style={{ fontFamily: 'var(--font-times)' }}>Information 2024</p>
              <p className="text-charcoal text-base leading-relaxed" style={{ fontFamily: 'var(--font-helvetica)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Project 6 */}
          <div className="sm:col-span-2 lg:col-span-3">
            <button className="group relative aspect-[16/9] w-full overflow-hidden block">
              <Image
                src="/assets/hero-asset.png"
                alt="Project 6"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative opacity-0 group-hover:opacity-100 transition-opacity">
                  <Image
                    src="/assets/play-icon.svg"
                    alt="View Project"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
            <div className="mt-4">
              <h3 className="text-charcoal text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-helvetica)' }}>TITLE</h3>
              <p className="text-charcoal text-base italic mb-2" style={{ fontFamily: 'var(--font-times)' }}>Information 2024</p>
              <p className="text-charcoal text-base leading-relaxed" style={{ fontFamily: 'var(--font-helvetica)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bio Section - Desktop Only */}
      <section className="hidden md:block" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(3rem, 6vw, 4rem)', paddingBottom: 'clamp(3rem, 6vw, 4rem)' }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-charcoal leading-relaxed" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 2.25rem)', lineHeight: '1.4', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <span className="font-bold italic" style={{ fontFamily: 'var(--font-times)' }}>Reagan Matthew</span>
            <span style={{ fontFamily: 'var(--font-times)' }}> is a Creative director and filmmaker with a background in hospitality and design, telling stories at the intersection of food, culture, and visual art.</span>
          </p>
          
          <button className="border-charcoal bg-transparent text-charcoal hover:text-accent-red hover:border-accent-red inline-block border-2 font-medium transition-colors" style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(1.125rem, 1.8vw, 1.75rem)', padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 4vw, 3rem)' }}>
            Contact
          </button>
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
          
          <button className="border-charcoal bg-transparent text-charcoal hover:text-accent-red hover:border-accent-red border-2 font-medium transition-colors px-8 py-3" style={{ fontFamily: 'var(--font-helvetica)', fontSize: '1.125rem' }}>
            Contact
          </button>
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
