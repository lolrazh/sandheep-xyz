import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import { Separator } from "@/components/ui/separator"; // Import Separator
import { articles } from '../data/articles';
import { Helmet } from 'react-helmet-async';
import { buildTitle, canonical, defaultDescription, defaultOgImage, buildWebPageSchema } from '@/lib/seo';

const Blog = () => {
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

  // Helper function to parse date for sorting (e.g., "Feb 6", 2025 -> Date object)
  const parseDate = (dateStr: string, year: number) => {
    return new Date(`${dateStr} ${year}`);
  };

  const pageTitle = buildTitle('Writings');
  const pageDescription = 'All writings by Sandheep Rajkumar.';
  const url = canonical('/blog');
  const schema = buildWebPageSchema({ url, title: pageTitle, description: pageDescription });

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription || defaultDescription} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription || defaultDescription} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:site_name" content="Sandheep Rajkumar" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription || defaultDescription} />
        <meta name="twitter:image" content={defaultOgImage} />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="mx-auto max-w-2xl py-10"> {/* Adjusted padding slightly */}
        <h1 className="text-3xl font-playfair font-medium mb-10">Writings</h1>
        <div className="space-y-8"> {/* Increased spacing between year sections */}
          {sortedYears.map((year, yearIndex) => (
            <React.Fragment key={year}>
              <section>
                <div className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-0"> {/* Grid layout */}
                  {/* Year Column */}
                  <div className="text-foreground/60 text-xl font-lexend font-light pt-6"> {/* Align year text with first article */}
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
                        <article className="group py-6"> {/* Added padding top/bottom */}
                          <div className="flex justify-between items-baseline">
                            <h2 className="text-lg md:text-xl font-medium group-hover:opacity-80 transition-opacity">
                              {/* Use Link component for internal navigation */}
                              <Link to={`/article/${article.id}`} className="article-link">
                                {article.title}
                              </Link>
                            </h2>
                            <span className="font-lexend text-sm text-foreground/60 whitespace-nowrap pl-4"> {/* Ensure date doesn't wrap */}
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
                <Separator className="bg-foreground/60 h-0.5 my-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;