import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import { Separator } from "@/components/ui/separator"; // Import Separator

const Blog = () => {
  // Updated hardcoded article data, including the new one
  const articles = [
    {
      id: "ai-cad-lamp", // Example slug ID
      title: "AI-Powered CAD And The Electric Lamp Problem",
      date: "Feb 6", // Shortened date format for display
      fullDate: "February 6, 2025", // Keep full date if needed later
      year: 2025
    },
    {
      id: "sunk-cost",
      title: "The Sunk Cost Fallacy",
      date: "Sep 21",
      fullDate: "September 21, 2024",
      year: 2024
    },
    {
      id: "how-you-do",
      title: "How You Do Something Is How You Do Everything",
      date: "Sep 15",
      fullDate: "September 15, 2024",
      year: 2024
    },
    {
      id: "notes-on-curiosity", // Added new article
      title: "Notes on Curiosity",
      date: "Apr 15",
      fullDate: "April 15, 2025",
      year: 2025
    },
  ];

  // Group articles by year
  const articlesByYear = articles.reduce((acc, article) => {
    const year = article.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    // Just push articles into the year's array
    acc[year].push(article); 
    return acc;
  }, {});

  // Get sorted years (descending)
  const sortedYears = Object.keys(articlesByYear).map(Number).sort((a, b) => b - a);

  // Helper function to parse date for sorting (e.g., "Sep 21", 2024 -> Date object)
  const parseDate = (dateStr, year) => {
    // Simple parsing assuming "Mmm DD" format. Adjust if format varies.
    return new Date(`${dateStr} ${year}`);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10"> {/* Adjusted padding slightly */}
        <h1 className="text-3xl font-playfair font-medium mb-10">Writings</h1>
        <div className="space-y-8"> {/* Increased spacing between year sections */}
          {sortedYears.map((year, yearIndex) => (
            <React.Fragment key={year}>
              <section>
                <div className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-0"> {/* Grid layout */}
                  {/* Year Column */}
                  <div className="text-jet/60 text-xl font-lexend font-light pt-6"> {/* Align year text with first article */}
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
                            <span className="font-lexend text-sm text-jet/60 whitespace-nowrap pl-4"> {/* Ensure date doesn't wrap */}
                              {article.date}
                            </span>
                          </div>
                        </article>
                        {/* Add separator between articles, but not after the last one in the year */}
                        {index < articlesByYear[year].length - 1 && (
                          <Separator className="bg-jet/10" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>
              {/* Add thicker separator between years, but not after the last year */}
              {yearIndex < sortedYears.length - 1 && (
                <Separator className="bg-jet/20 h-0.5 my-4" /> /* Added margin */
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;