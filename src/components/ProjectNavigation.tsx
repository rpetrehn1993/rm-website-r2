'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectNavigationProps {
  theme?: 'light' | 'dark';
}

export default function ProjectNavigation({ theme = 'light' }: ProjectNavigationProps) {
  // In R2 project, we're using the same logo assets
  // For light theme (on dark background), use white logo
  // For dark theme (on light background), use regular logo
  const logoSrc = theme === 'light' 
    ? '/assets/logo-white.svg'
    : '/assets/main-logo.svg';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-full mx-auto px-4 md:px-[25px] py-4 md:py-6">
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="transition-opacity duration-200 hover:opacity-80">
            <Image
              src={logoSrc}
              alt="RM Logo"
              width={82}
              height={56}
              priority
              className="w-[52px] h-auto md:w-[82px]"
            />
          </Link>

          {/* Menu/Home Icon (right side) */}
          <Link href="/" className="transition-opacity duration-200 hover:opacity-80">
            <Image
              src="/assets/close-icon.svg"
              alt="Close"
              width={38}
              height={38}
              className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

