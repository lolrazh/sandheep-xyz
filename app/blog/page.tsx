import React from 'react'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { articles } from '@/lib/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writings - Sandheep Rajkumar',
  description: 'All writings by Sandheep Rajkumar.',
}

export default function BlogPage() {
  // Group articles by year
  const articlesByYear = articles.reduce((acc, article) => {
    const year = article.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(article)
    return acc
  }, {} as Record<number, typeof articles>)

  // Get sorted years (descending)
  const sortedYears = Object.keys(articlesByYear).map(Number).sort((a, b) => b - a)

  // Helper function to parse date for sorting (e.g., "Feb 6", 2025 -> Date object)
  const parseDate = (dateStr: string, year: number) => {
    return new Date(`${dateStr} ${year}`)
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-playfair font-medium mb-10">Writings</h1>
      <div className="space-y-8">
        {sortedYears.map((year, yearIndex) => (
          <React.Fragment key={year}>
            <section>
              <div className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-0">
                {/* Year Column */}
                <div className="text-foreground/60 text-xl font-lexend font-light pt-6">
                  {year}
                </div>
                {/* Articles Column */}
                <div>
                  {/* Sort articles within the year by date (newest first) before mapping */}
                  {articlesByYear[year]
                    // Correct sorting by converting dates to timestamps
                    .sort((a, b) => parseDate(b.date, b.year).getTime() - parseDate(a.date, a.year).getTime())
                    .map((article, index) => (
                    <React.Fragment key={article.id}>
                      <article className="group py-6">
                        <div className="flex justify-between items-baseline">
                          <h2 className="text-lg md:text-xl font-medium group-hover:opacity-80 transition-opacity">
                            <Link href={`/article/${article.id}`} className="article-link">
                              {article.title}
                            </Link>
                          </h2>
                          <span className="font-lexend text-sm text-foreground/60 whitespace-nowrap pl-4">
                            {article.date}
                          </span>
                        </div>
                      </article>
                      {/* Add separator between articles, but not after the last one in the year */}
                      {index < articlesByYear[year].length - 1 && (
                        <Separator className="bg-border/10" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
            {/* Add thicker separator between years, but not after the last year */}
            {yearIndex < sortedYears.length - 1 && (
              <Separator className="bg-foreground/30 h-0.5 my-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}