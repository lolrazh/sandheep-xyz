
import React from 'react';
import Layout from '../components/Layout';
import { ExternalLink } from 'lucide-react';

const Links = () => {
  const links = [
    { title: 'My Portfolio', url: 'https://example.com/portfolio' },
    { title: 'Reading List', url: 'https://example.com/reading' },
    { title: 'Photography', url: 'https://example.com/photos' },
    { title: 'Projects', url: 'https://example.com/projects' },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-16">
        <h1 className="text-3xl font-playfair font-medium mb-10">Links</h1>
        <div className="space-y-4">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-jet/20 rounded hover:bg-jet/5 transition-colors"
            >
              <span className="font-lexend text-lg">{link.title}</span>
              <ExternalLink size={18} className="text-jet/60" />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Links;
