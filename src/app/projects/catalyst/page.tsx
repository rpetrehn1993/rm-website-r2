'use client';

import ContentSection from '@/components/ContentSection';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Custom hook for video lazy loading with autoplay
function useVideoAutoplay(enabled = true) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!enabled || !videoRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [enabled]);
  
  return videoRef;
}

export default function CatalystProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textPosition, setTextPosition] = useState<'fixed' | 'absolute'>('fixed');
  const [textBottom, setTextBottom] = useState(25);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useVideoAutoplay();
  const videoRef2 = useVideoAutoplay();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Carousel images from public/Catalyst/carousel
  const carouselImages = [
    '/Catalyst/carousel/Catalyst Branded-72.jpg',
    '/Catalyst/carousel/Catalyst Branded-73.jpg',
    '/Catalyst/carousel/Catalyst Branded-75.jpg',
    '/Catalyst/carousel/Catalyst Branded-79.jpg',
    '/Catalyst/carousel/Catalyst Branded-84.jpg',
    '/Catalyst/carousel/Catalyst Branded-86.jpg',
    '/Catalyst/carousel/DSCF1891.jpg',
    '/Catalyst/carousel/DSCF1906.jpg',
    '/Catalyst/carousel/DSCF2023.jpg',
    '/Catalyst/carousel/DSCF2078.jpg',
    '/Catalyst/carousel/DSCF2148.jpg',
    '/Catalyst/carousel/DSCF2267.jpg',
    '/Catalyst/carousel/DSCF2415.jpg',
    '/Catalyst/carousel/DSCF2433.jpg',
    '/Catalyst/carousel/DSCF2463.jpg',
    '/Catalyst/carousel/DSCF2592.jpg',
    '/Catalyst/carousel/DSCF2627.jpg',
    '/Catalyst/carousel/DSCF2656.jpg',
  ];

  const nextSlide = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Simple loop detection
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.scrollLeft = 0;
          }
        }, 500);
      }
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Simple loop detection
      const { scrollLeft } = carouselRef.current;
      if (scrollLeft <= 10) {
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          }
        }, 500);
      }
    }
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lightweight scroll handler to toggle hero text between fixed and absolute
  useEffect(() => {
    const updateTextPosition = () => {
      if (!heroRef.current || !textRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const minBottomDistance = 25;

      if (heroRect.bottom < viewportHeight) {
        setTextPosition('absolute');
        setTextBottom(minBottomDistance);
      } else {
        setTextPosition('fixed');
        setTextBottom(minBottomDistance);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTextPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateTextPosition();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navigation Overlay */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="min-h-screen bg-newsprint">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(13px, 3vw, 30px)', paddingBottom: 'clamp(13px, 3vw, 30px)' }}>
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
              className="object-contain [filter:brightness(0)_saturate(100%)_invert(12%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(95%)_contrast(94%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
            />
          </button>
        </header>
      
        {/* Hero Section - Responsive with preserved aspect ratio */}
      <div ref={heroRef} className="relative w-full bg-newsprint">
        {/* Catalyst Branded-02 - Preserves aspect ratio */}
        <div className="relative w-full" style={{aspectRatio: '1925/2126'}}>
          <Image
            src="/Catalyst/Catalyst Branded/Catalyst Branded-02.jpg"
            alt="Catalyst Branded"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Text overlay - Fixed until hero bottom crosses viewport, then absolute at hero bottom */}
        <div 
          ref={textRef}
          className={`${textPosition === 'fixed' ? 'fixed' : 'absolute'} left-4 md:left-[25px] z-20 w-[calc(33.333%-1rem)] md:w-[calc(33.333%-25px)] max-w-[659px] text-newsprint transition-all duration-200`}
          style={{ bottom: `${textBottom}px` }}
        >
          <h1 
            className="font-medium leading-tight mb-0 tracking-tight"
            style={{ 
              fontFamily: 'var(--font-helvetica)', 
              fontSize: 'clamp(32px, 5vw, 84px)' 
            }}
          >
            CATALYST TRADE
          </h1>
          <p 
            className="italic leading-tight max-w-[570px]"
            style={{ 
              fontFamily: 'var(--font-times)', 
              fontSize: 'clamp(14px, 1.5vw, 24px)' 
            }}
          >
            CREATIVE DIRECTION, BRANDING, WEB DESIGN, VISUAL ASSETS.
          </p>
          <p 
            className="italic leading-relaxed mt-2 md:mt-4"
            style={{ 
              fontFamily: 'var(--font-times)', 
              fontSize: 'clamp(12px, 1vw, 18px)' 
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. UtLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          </p>
        </div>
      </div>

      {/* Text block - Using ContentSection component */}
      <ContentSection
        title="TITLE"
        subtitle="Information 2024"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. UtLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, enim ad minim veniam,"
        maxWidth="1733px"
      />

      {/* Video Section - Catalyst Lab with lazy loading */}
      <section className="bg-newsprint">
        <div className="relative w-full" style={{aspectRatio: '1925/1082'}}>
          <video
            ref={videoRef1}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          >
            <source src="/Catalyst/Motion/Catalyst Lab.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-start px-4 md:px-[25px] mt-2">
          <p 
            className="italic text-xs text-charcoal/60"
            style={{ fontFamily: 'var(--font-times)' }}
          >
            Motion Graphics - Lab
          </p>
        </div>
      </section>

      {/* Phone mockup with title block side by side */}
      <section className="bg-newsprint py-8 md:py-16">
        <div className="px-4 md:px-[25px]">
          <div className="flex flex-col md:flex-row md:items-end md:gap-8">
            {/* Phone mockup image */}
            <div className="w-full md:w-[700px] md:flex-shrink-0">
              <div className="relative w-full" style={{aspectRatio: '999/1168'}}>
                <Image 
                  src="/Catalyst/Catalyst Branded/Catalyst Branded-34.jpg" 
                  alt="Mobile phone mockup" 
                  fill 
                  loading="lazy"
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 700px" 
                />
              </div>
              <div className="flex justify-start mt-2">
                <p 
                  className="italic text-xs text-charcoal/60"
                  style={{ fontFamily: 'var(--font-times)' }}
                >
                  Mobile Mockup
                </p>
              </div>
            </div>
            
            {/* Title block */}
            <div className="w-full md:flex-1 md:max-w-[420px] mt-8 md:mt-0 md:pb-2">
              <h3 
                className="leading-tight mb-2"
                style={{ 
                  fontFamily: 'var(--font-helvetica)', 
                  fontSize: 'clamp(24px, 2.5vw, 47px)' 
                }}
              >
                TITLE
              </h3>
              <p 
                className="italic leading-tight mb-4"
                style={{ 
                  fontFamily: 'var(--font-times)', 
                  fontSize: 'clamp(24px, 2.5vw, 47px)' 
                }}
              >
                Information 2024
              </p>
              <p 
                className="italic leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-times)', 
                  fontSize: 'clamp(14px, 1vw, 18px)' 
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. UtLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, enim ad minim veniam,
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalyst March Video with lazy loading */}
      <section className="bg-newsprint">
        <div className="relative w-full" style={{aspectRatio: '1925/1082'}}>
          <video
            ref={videoRef2}
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            preload="metadata"
          >
            <source src="/Catalyst/Motion/Catalyst March_B.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-start px-4 md:px-[25px] mt-2">
          <p 
            className="italic text-xs text-charcoal/60"
            style={{ fontFamily: 'var(--font-times)' }}
          >
            Motion Graphics - March
          </p>
        </div>
      </section>

      {/* Three-image collage */}
      <section className="bg-newsprint">
        <div className="flex flex-col md:flex-row">
          {/* Left image - Tote bag */}
          <div className="relative w-full md:w-[52.18%] md:flex-shrink-0" style={{aspectRatio: '1004/1507'}}>
            <Image 
              src="/Catalyst/Catalyst Branded/Catalyst Branded-29.jpg" 
              alt="Tote bag" 
              fill 
              loading="lazy"
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 52vw" 
            />
          </div>
          {/* Right stacked images */}
          <div className="flex flex-col w-full md:w-[47.82%] md:flex-shrink-0" style={{ aspectRatio: '921/1507' }}>
            {/* Top image - People weighing coffee */}
            <div className="relative w-full flex-1">
              <Image 
                src="/Catalyst/Catalyst Branded/Catalyst Branded-32.jpg" 
                alt="People weighing coffee" 
                fill 
                loading="lazy"
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 48vw" 
              />
            </div>
            {/* Bottom image - Coffee tasting */}
            <div className="relative w-full flex-1">
              <Image 
                src="/Catalyst/Catalyst Branded/Catalyst Branded-06.jpg" 
                alt="Coffee tasting" 
                fill 
                loading="lazy"
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 48vw" 
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start px-4 md:px-[25px] mt-2">
          <p 
            className="italic text-xs text-charcoal/60"
            style={{ fontFamily: 'var(--font-times)' }}
          >
            Product Photography
          </p>
        </div>
      </section>

      {/* Logo Exploration Section */}
      <section className="bg-white py-8 md:py-16">
        <div className="px-4 md:px-[25px]">
          {/* Top divider */}
          <div className="w-full h-px bg-charcoal mb-8 md:mb-12" />
          
          {/* Logo exploration images - responsive grid with exact Figma positioning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 max-w-[1251px] mx-auto">
            {/* Left sketch - roses and circles */}
            <div className="relative w-full h-auto">
              <Image
                src="/Catalyst/Logos/logo-sketch-1.png"
                alt="Logo exploration sketches - roses and circles"
                width={633}
                height={1419}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            {/* Right sketch - lion crown concepts */}
            <div className="relative w-full h-auto">
              <Image
                src="/Catalyst/Logos/logo-sketch-2.png"
                alt="Logo exploration sketches - lion crown concepts"
                width={618}
                height={1419}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Logo showcase with dividers - matching Figma exactly */}
          <div className="w-full max-w-[1580px] mx-auto">
            {/* Top divider */}
            <div className="w-full h-px bg-charcoal mb-8" />
            
            {/* Horizontal logo */}
            <div className="flex items-center justify-center py-6 md:py-8 px-4">
              <Image
                src="/Catalyst/Logos/catalyst-horizontal-logo.png"
                alt="Catalyst Trade Horizontal Logo"
                width={1349}
                height={127}
                className="w-full max-w-[1349px] h-auto object-contain"
                loading="lazy"
              />
            </div>
            
            {/* Middle dividers */}
            <div className="w-full h-px bg-charcoal mb-8" />
            <div className="w-full h-px bg-charcoal mb-8" />
            <div className="w-full h-px bg-charcoal mb-8" />
            
            {/* Lion icon and rose stamp side by side */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 py-8 md:py-12 px-4">
              <Image
                src="/Catalyst/Logos/catalyst-lion-icon.png"
                alt="Catalyst Trade Lion Icon"
                width={403}
                height={356}
                className="w-full max-w-[403px] h-auto object-contain"
                loading="lazy"
              />
              <Image
                src="/Catalyst/Logos/catalyst-rose-stamp.png"
                alt="Catalyst Trade Rose Stamp"
                width={239}
                height={239}
                className="w-full max-w-[239px] h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom divider */}
          <div className="w-full h-px bg-charcoal max-w-[1768px] mx-auto" />
        </div>
      </section>

      {/* Website and Social heading */}
      <section className="bg-newsprint py-8 md:py-16">
        <div className="px-4 md:px-[25px]">
          <h2 
            className="leading-tight mb-0 text-charcoal"
            style={{ 
              fontFamily: 'var(--font-helvetica)', 
              fontSize: 'clamp(32px, 5vw, 84px)' 
            }}
          >
            WEBSITE AND SOCIAL:
          </h2>
          <p 
            className="italic leading-tight text-charcoal max-w-[90%] md:max-w-[570px]"
            style={{ 
              fontFamily: 'var(--font-times)', 
              fontSize: 'clamp(14px, 1.5vw, 24px)' 
            }}
          >
            CREATIVE DIRECTION, BRANDING, WEB DESIGN, VISUAL ASSETS.
          </p>
        </div>
        {/* Three screenshots */}
        <div className="mt-8 md:mt-16 flex flex-col gap-8 md:gap-16 px-4 md:px-[25px]">
          <div>
            <div className="relative w-full max-w-[1483px]" style={{aspectRatio: '1483/845'}}>
              <Image 
                src="/Catalyst/Website/website_1.png" 
                alt="Website hero" 
                fill 
                loading="lazy"
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 1483px" 
              />
            </div>
            <div className="flex justify-start max-w-[1483px] mt-2">
              <p 
                className="italic text-xs text-charcoal/60"
                style={{ fontFamily: 'var(--font-times)' }}
              >
                Website Homepage
              </p>
            </div>
          </div>
          <div>
            <div className="relative w-full max-w-[1483px]" style={{aspectRatio: '1483/840'}}>
              <Image 
                src="/Catalyst/Website/Website_2.png" 
                alt="Website grid" 
                fill 
                loading="lazy"
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 1483px" 
              />
            </div>
            <div className="flex justify-start max-w-[1483px] mt-2">
              <p 
                className="italic text-xs text-charcoal/60"
                style={{ fontFamily: 'var(--font-times)' }}
              >
                Product Grid
              </p>
            </div>
          </div>
          <div>
            <div className="relative w-full max-w-[1483px]" style={{aspectRatio: '1483/842'}}>
              <Image 
                src="/Catalyst/Website/Website_3.png" 
                alt="Website table" 
                fill 
                loading="lazy"
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 1483px" 
              />
            </div>
            <div className="flex justify-start max-w-[1483px] mt-2">
              <p 
                className="italic text-xs text-charcoal/60"
                style={{ fontFamily: 'var(--font-times)' }}
              >
                Product Details
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Text block - Using ContentSection component */}
      <ContentSection
        title="TITLE"
        subtitle="Information 2024"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. UtLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, enim ad minim veniam,"
        maxWidth="1194px"
      />

      {/* Horizontal Scrolling Carousel - Simplified */}
      <section className="bg-newsprint relative">
        {/* Carousel Container - Native horizontal scroll */}
        <div 
          ref={carouselRef}
          className="relative w-full h-[800px] overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Images - Single set with lazy loading */}
          <div className="flex h-full">
            {carouselImages.map((image, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 h-[800px] relative snap-center" 
                style={{ width: 'auto', scrollSnapAlign: 'center' }}
              >
                <Image 
                  src={image} 
                  alt={`Carousel image ${index + 1}`} 
                  width={1200}
                  height={800}
                  className="object-cover h-[800px] w-auto" 
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Centered Navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10 pointer-events-none">
          <button
            onClick={prevSlide}
            className="text-white/70 hover:text-white transition-colors duration-300 text-xl pointer-events-auto"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="text-white/70 hover:text-white transition-colors duration-300 text-xl pointer-events-auto"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
        <div className="flex justify-start px-4 md:px-[25px] mt-2">
          <p 
            className="italic text-xs text-charcoal/60"
            style={{ fontFamily: 'var(--font-times)' }}
          >
            Still Photography
          </p>
        </div>
      </section>

      {/* Collaborators and IP Section */}
      <section className="bg-newsprint py-12 md:py-20">
        <div className="px-4 md:px-[25px]">
          {/* Top divider */}
          <div className="w-full h-px bg-charcoal mb-8 md:mb-12" />
          
          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Left column - Collaborators */}
            <div>
              <h3 
                className="text-charcoal font-bold leading-tight mb-6 md:mb-8"
                style={{ 
                  fontFamily: 'var(--font-helvetica)', 
                  fontSize: 'clamp(24px, 2.5vw, 30px)' 
                }}
              >
                COLLABORATORS:
              </h3>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <p 
                    className="text-charcoal font-bold leading-[27px] mb-2"
                    style={{ 
                      fontFamily: 'var(--font-helvetica)', 
                      fontSize: '12px' 
                    }}
                  >
                    GRAPHIC DESIGN:
                  </p>
                  <p 
                    className="text-charcoal leading-[27px]"
                    style={{ 
                      fontFamily: 'var(--font-helvetica)', 
                      fontSize: 'clamp(18px, 1.5vw, 22.5px)' 
                    }}
                  >
                    Sydnee Mejia
                  </p>
                </div>
                
                <div>
                  <p 
                    className="text-charcoal font-bold leading-[27px] mb-2"
                    style={{ 
                      fontFamily: 'var(--font-helvetica)', 
                      fontSize: '12px' 
                    }}
                  >
                    PHOTOGRAPHY:
                  </p>
                  <p 
                    className="text-charcoal leading-[27px]"
                    style={{ 
                      fontFamily: 'var(--font-helvetica)', 
                      fontSize: 'clamp(18px, 1.5vw, 22.5px)' 
                    }}
                  >
                    Tsion Haileselassie (Addis Ababa),<br />
                    Reagan Matthew (USA)
                  </p>
                </div>
                
                <div>
                  <p 
                    className="text-charcoal font-bold leading-[27px] mb-2"
                    style={{ 
                      fontFamily: 'var(--font-helvetica)', 
                      fontSize: '12px' 
                    }}
                  >
                    MOTION:
                  </p>
                  <p 
                    className="text-charcoal leading-[27px]"
                    style={{ 
                      fontFamily: 'var(--font-helvetica)', 
                      fontSize: 'clamp(18px, 1.5vw, 22.5px)' 
                    }}
                  >
                    Anteneh Nida (Addis Ababa),<br />
                    Reagan Matthew (USA)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right column - Intellectual Property */}
            <div>
              <h3 
                className="text-charcoal font-bold leading-tight mb-6 md:mb-8"
                style={{ 
                  fontFamily: 'var(--font-helvetica)', 
                  fontSize: 'clamp(24px, 2.5vw, 30px)' 
                }}
              >
                INTELLECTUAL PROPERTY:
              </h3>
              <p 
                className="text-charcoal leading-[27px]"
                style={{ 
                  fontFamily: 'var(--font-helvetica)', 
                  fontSize: 'clamp(18px, 1.5vw, 22.5px)' 
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. UtLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
          </div>
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
      </main>
    </>
  );
}

