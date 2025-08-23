import { Metadata } from 'next'
import { buildTitle, canonical, defaultOgImage, buildWebPageSchema } from '../../src/lib/seo'
import BlogClientWrapper from './BlogClientWrapper'

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
  return <BlogClientWrapper />
}