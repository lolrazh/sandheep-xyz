import { Metadata } from 'next'
import { buildTitle, canonical, defaultDescription, defaultOgImage } from '../../src/lib/seo'
import AboutClientWrapper from './AboutClientWrapper'

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
  return <AboutClientWrapper />
}