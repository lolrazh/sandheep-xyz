
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-center text-center">
          <Link to="/" className="no-underline">
            <h1 className="text-5xl md:text-6xl font-playfair font-black italic tracking-tight mb-2">
              Chronicles
            </h1>
          </Link>
          <p className="font-lexend text-sm uppercase tracking-widest text-jet/70">
            Vintage Ink & Paper
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
