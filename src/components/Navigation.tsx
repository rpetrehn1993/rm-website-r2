'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Showreel', href: '/showreel' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Work', href: '/work' },
  ];

  return (
    <>
      {/* Background Fade - Click to close - Fades uniformly */}
      <div
        className={`fixed inset-0 z-50 bg-newsprint/60 backdrop-blur-[2px] transition-opacity duration-700 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-label="Close menu"
      />

      {/* Menu Panel - Slides in from right */}
      <div
        className={`fixed right-0 top-0 z-50 h-full bg-newsprint shadow-2xl transition-all duration-700 ease-in-out ${
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ width: 'clamp(180px, 45vw, 600px)' }}
      >
          <nav className="flex h-full flex-col items-end justify-between" style={{ paddingLeft: 'clamp(13px, 3vw, 30px)', paddingRight: 'clamp(13px, 3vw, 30px)', paddingTop: 'clamp(13px, 3vw, 30px)', paddingBottom: 'clamp(13px, 3vw, 30px)' }}>
            {/* Top Section: Close Button + Menu Items */}
            <div className="flex flex-col items-end flex-shrink-0" style={{ gap: 'clamp(1.5rem, 4vh, 3rem)' }}>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="group flex items-center transition-colors hover:text-accent-red"
                aria-label="Close navigation"
                style={{ gap: 'clamp(8px, 1vw, 10px)' }}
              >
                <span
                  className="text-charcoal group-hover:text-accent-red font-normal transition-colors"
                  style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(1.25rem, 2vw, 2rem)', lineHeight: '1' }}
                >
                  Close
                </span>
                <div className="relative flex-shrink-0" style={{ height: 'clamp(33.75px, 2.8vw, 45px)', width: 'clamp(27.75px, 2.3vw, 37px)' }}>
                  <Image
                    src="/assets/close-icon.svg"
                    alt="Close"
                    fill
                    className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
                  />
                </div>
              </button>

              {/* Menu Items - Close to top */}
              <ul className="flex flex-col items-end" style={{ gap: 'clamp(13px, 2vh, 22px)' }}>
                {menuItems.map((item, index) => (
                  <li
                    key={item.href}
                    className={`transition-all duration-500 ${
                      isOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${index * 50 + 100}ms` : '0ms',
                    }}
                  >
                    <a
                      href={item.href}
                      className="text-charcoal hover:text-accent-red block text-right font-normal transition-colors"
                      style={{ fontFamily: 'var(--font-helvetica)', fontSize: 'clamp(1.25rem, 2vw, 2rem)', lineHeight: '1' }}
                      onClick={onClose}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <div
              className={`flex-shrink-0 transition-all duration-700 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
            >
              <Link href="/" className="relative block group h-[32px] w-[47px]" onClick={onClose}>
                <Image
                  src="/assets/logo-small.svg"
                  alt="RM"
                  fill
                  className="object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(100%)_saturate(7426%)_hue-rotate(356deg)_brightness(98%)_contrast(113%)]"
                />
              </Link>
            </div>
          </nav>
      </div>
    </>
  );
}

