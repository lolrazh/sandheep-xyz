import { Metadata } from 'next'
import { buildTitle, canonical, defaultOgImage, buildWebPageSchema } from '../../src/lib/seo'
import Layout from '../../src/components/Layout'
import YearSection from '../../src/components/YearSection'
import { articles } from '../../src/data/articles'

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

  // Get sorted years (descending)
  const sortedYears = Object.keys(articlesByYear).map(Number).sort((a, b) => b - a);

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="text-3xl font-playfair font-medium mb-10">Writings</h1>
        <div className="space-y-8">
          {sortedYears.map((year) => (
            <YearSection 
              key={year} 
              year={year} 
              articles={articlesByYear[year] || []} 
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}