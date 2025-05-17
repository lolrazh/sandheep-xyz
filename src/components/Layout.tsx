import React from 'react';
import Header from './Header';
import { Instagram, Linkedin, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/next"

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const socialLinks = [
    { icon: Mail, url: 'mailto:rajkumar.sandheep@gmail.com', label: 'Email' },
    { icon: Linkedin, url: 'https://linkedin.com/in/sandheeprajkumar', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/lolrazh', label: 'GitHub' },
    { icon: Twitter, url: 'https://x.com/LolRazhX', label: 'X' },
    { icon: Instagram, url: 'https://instagram.com/lolrazh', label: 'Instagram' },
  ];

  return (
    <div className="min-h-screen bg-linen relative flex flex-col">
      <div className="film-grain"></div>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 pb-12 flex-1">
        {children}
      </main>
      <footer className="container mx-auto max-w-4xl px-4 py-8 border-t border-jet/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-lexend text-xs uppercase tracking-wider text-jet/50 mb-3 md:mb-0">
            © {new Date().getFullYear()} Sandheep Rajkumar
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-jet/50 hover:text-jet transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
