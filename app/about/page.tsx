import { Metadata } from 'next'
import { buildTitle, canonical, defaultDescription, defaultOgImage } from '../../src/lib/seo'
import Layout from '../../src/components/Layout'

export const metadata: Metadata = {
  title: buildTitle('About'),
  description: 'About Sandheep Rajkumar — background, interests, and ways to connect.',
  metadataBase: new URL('https://sandheep.xyz'),
  alternates: {
    canonical: canonical('/about')
  },
  openGraph: {
    title: buildTitle('About'),
    description: 'About Sandheep Rajkumar — background, interests, and ways to connect.',
    url: canonical('/about'),
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
    title: buildTitle('About'),
    description: 'About Sandheep Rajkumar — background, interests, and ways to connect.',
    images: [defaultOgImage],
  }
}

export default function AboutPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl py-10">
        <h1 className="text-3xl font-playfair font-medium mb-6">About Sandheep Rajkumar</h1>
        <p className="text-lg text-foreground/80">
          Work in progress. This page will contain information about me and my interests.
        </p>
      </div>
    </Layout>
  )
}