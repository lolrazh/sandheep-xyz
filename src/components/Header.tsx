import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-8 px-4 border-b border-jet/10">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="no-underline mr-4">
              <h1 className="text-2xl md:text-3xl font-playfair font-medium tracking-tight">
                S/R
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-6 font-lexend text-sm uppercase tracking-wider">
            <Link to="/blog" className="article-link">Blog</Link>
            <Link to="/links" className="article-link">Links</Link>
            <Link to="/commonplace" className="article-link">Commonplace</Link>
            <Link to="/about" className="article-link">About</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
