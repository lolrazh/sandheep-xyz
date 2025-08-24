import React from 'react'
import { Metadata } from 'next'
import { buildTitle, canonical, defaultOgImage, buildWebPageSchema } from '../../src/lib/seo'
import Layout from '../../src/components/Layout'
import YearSection from '../../src/components/YearSection'
import { articles } from '../../src/data/articles'
import { Separator } from '../../src/components/ui/separator'

export const metadata: Metadata = {
  title: buildTitle('Writings'),
  description: 'All writings by Sandheep Rajkumar.',
  metadataBase: new URL('https://sandheep.xyz'),
  alternates: {
    canonical: canonical('/blog')
  },
  openGraph: {
    title: buildTitle('Writings'),
    description: 'All writings by Sandheep Rajkumar.',
    url: canonical('/blog'),
    siteName: 'Sandheep Rajkumar',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: buildTitle('Writings'),
    description: 'All writings by Sandheep Rajkumar.',
    images: [defaultOgImage],
  }
}

export default function BlogPage() {
  // Group articles by year
  const articlesByYear = articles.reduce((acc, article) => {
    const year = article.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {} as Record<number, typeof articles>);

  // Sort articles within each year by date (most recent first)
  Object.keys(articlesByYear).forEach(year => {
    articlesByYear[Number(year)].sort((a, b) => {
      // Convert date strings to Date objects for proper comparison
      const dateA = new Date(a.fullDate);
      const dateB = new Date(b.fullDate);
      return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
    });
  });

  // Get sorted years (descending)
  const sortedYears = Object.keys(articlesByYear).map(Number).sort((a, b) => b - a);

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="text-2xl md:text-3xl font-playfair font-medium mb-10 text-theme">Writings</h1>
        <div>
          {sortedYears.map((year, idx) => (
            <React.Fragment key={year}>
              {idx > 0 && (
                <div className="my-4 relative z-[160]">
                  <Separator className="bg-border/80" />
                </div>
              )}
              <YearSection 
                year={year} 
                articles={articlesByYear[year] || []} 
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  )
}
