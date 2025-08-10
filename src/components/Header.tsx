import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

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
    { to: "/blog", label: "Blog" },
    { to: "/commonplace", label: "Commonplace" },
    { to: "/about", label: "About" },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-60 bg-background border-b border-border/10">
      <div className="container mx-auto max-w-4xl px-2 md:px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="no-underline mr-4" onClick={closeMenu}>
              <h1 className="text-2xl md:text-3xl font-playfair font-medium tracking-tight">
                S/R
              </h1>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 font-lexend text-sm uppercase tracking-wider">
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} className="article-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button with morph animation */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border/50 text-foreground/80 hover:bg-accent/50 transition-colors group"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="pointer-events-none"
              width={16}
              height={16}
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
                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (below sticky header) */}
      <div
        className={`fixed inset-x-0 top-[var(--header-height,0px)] bottom-0 z-50 md:hidden transition-opacity duration-300 ease-in-out bg-background ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 font-lexend text-lg uppercase tracking-wider">
          {menuItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`article-link transition-all duration-300 ease-in-out ${
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
