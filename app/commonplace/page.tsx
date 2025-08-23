import { Metadata } from 'next'
import { buildTitle, canonical, defaultOgImage } from '../../src/lib/seo'
import CommonplaceClientWrapper from './CommonplaceClientWrapper'

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
  return <CommonplaceClientWrapper />
}