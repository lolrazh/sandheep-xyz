import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'unset' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const menuItems = [
    { to: "/blog", label: "Blog" },
    { to: "/commonplace", label: "Commonplace" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="py-6 px-2 md:px-4 border-b border-jet/10">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="no-underline mr-4" onClick={closeMenu}>
              <h1 className="text-2xl md:text-3xl font-playfair font-medium tracking-tight">
                S/R
              </h1>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 font-lexend text-sm uppercase tracking-wider">
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} className="article-link">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-jet/70 hover:text-jet transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-linen z-50 md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button 
          onClick={closeMenu}
          className="absolute top-7 right-6 text-jet/70 hover:text-jet transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center justify-center h-full space-y-8 font-lexend text-lg uppercase tracking-wider">
          {menuItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`article-link transition-all duration-300 ease-in-out ${
                isMenuOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
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
