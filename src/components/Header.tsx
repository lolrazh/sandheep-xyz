'use client'

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith('/article/');

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : 'unset';
      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    setTheme(theme === 'dark' ? 'light' : 'dark');
    // Remove transition class after transition completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 350); // Slightly longer than CSS transition (320ms)
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      const height = headerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const menuItems = [
    { href: "/blog", label: "Blog" },
    { href: "/commonplace", label: "Commonplace" },
    { href: "/about", label: "About" },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-[var(--z-header)] bg-background">
      <div className="container mx-auto max-w-4xl px-2 md:px-4 py-6">
        {/* 3-column layout: left brand, center nav, right controls */}
        <div className="grid grid-cols-3 items-center">
          {/* Left: Brand */}
          <div className="col-start-2 md:col-start-auto justify-self-center md:justify-self-start">
            <Link href="/" className="no-underline" onClick={closeMenu}>
              <h1 className="text-2xl md:text-3xl font-playfair font-medium tracking-tight text-theme">S/R</h1>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex justify-center items-center space-x-6 font-lexend text-sm uppercase tracking-wider justify-self-center">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="article-link text-theme px-1 -mx-1 py-2">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Theme toggle + Mobile Menu Button */}
          <div className="justify-self-end flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center h-11 w-11 rounded-md text-foreground/90 hover:text-foreground active:opacity-[var(--opacity-active)] transition-colors duration-sm"
              aria-label={!mounted ? 'Toggle theme' : theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={!mounted ? 'Theme' : theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {!mounted ? (
                <div className="w-[18px] h-[18px]" />
              ) : theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-md text-foreground/90 hover:text-foreground active:opacity-[var(--opacity-active)] transition-colors duration-sm group"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="pointer-events-none"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-md ease-standard group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-md ease-standard group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-md ease-standard group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar: always rendered; active only on article pages */}
      <div className="block md:hidden">
        <ReadingProgressBar withinHeader active={isArticlePage} />
      </div>
      <div className="hidden md:block">
        <div className="container mx-auto max-w-4xl px-2 md:px-4">
          <ReadingProgressBar withinHeader active={isArticlePage} />
        </div>
      </div>

      {/* Mobile Menu Overlay (below sticky header) */}
      <div
        className={`fixed inset-x-0 top-[var(--header-height,0px)] bottom-[var(--footer-height,0px)] z-[var(--z-modal)] md:hidden transition-opacity duration-md ease-standard bg-background ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 font-lexend text-lg uppercase tracking-wider">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`article-link transition-all duration-md ease-standard ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
