import { Metadata } from 'next'
import { buildTitle, canonical, defaultOgImage } from '../../src/lib/seo'
import Layout from '../../src/components/Layout'

export const metadata: Metadata = {
  title: buildTitle('Commonplace'),
  description: 'A collection of thoughts, quotes, and snippets — my digital commonplace book.',
  metadataBase: new URL('https://sandheep.xyz'),
  alternates: {
    canonical: canonical('/commonplace')
  },
  openGraph: {
    title: buildTitle('Commonplace'),
    description: 'A collection of thoughts, quotes, and snippets — my digital commonplace book.',
    url: canonical('/commonplace'),
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
    title: buildTitle('Commonplace'),
    description: 'A collection of thoughts, quotes, and snippets — my digital commonplace book.',
    images: [defaultOgImage],
  }
}

export default function CommonplacePage() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="text-3xl font-playfair font-medium mb-10">Commonplace Book</h1>
        <p className="text-lg text-foreground/80">
          Work in progress. This will be a collection of thoughts, quotes, and interesting links.
        </p>
      </div>
    </Layout>
  )
}