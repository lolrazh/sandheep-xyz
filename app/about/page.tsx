import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Sandheep Rajkumar',
  description: 'Learn more about Sandheep Rajkumar.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-playfair font-medium mb-6">About Sandheep Rajkumar</h1>
      <p className="text-lg text-foreground/80">
        Work in progress. This page will contain information about me and my interests.
      </p>
    </div>
  )
}