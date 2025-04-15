
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-linen relative">
      <div className="film-grain"></div>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 pb-20">
        {children}
      </main>
      <footer className="container mx-auto max-w-4xl px-4 py-10 border-t border-jet/10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-lexend text-xs uppercase tracking-wider text-jet/50 mb-3 md:mb-0">
            © {new Date().getFullYear()} Vintage Ink Chronicles
          </p>
          <div className="font-lexend text-xs uppercase tracking-wider text-jet/50">
            <a href="#" className="mx-2 hover:text-jet">About</a>
            <a href="#" className="mx-2 hover:text-jet">Archive</a>
            <a href="#" className="mx-2 hover:text-jet">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
