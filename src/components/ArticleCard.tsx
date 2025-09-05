import React from 'react';
import Link from 'next/link';

export interface Article {
  id: string;
  title: string;
  date: string;
  fullDate: string;
  year: number;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <article className="group">
      <div className="flex justify-between items-center md:items-baseline gap-3 mb-1 min-w-0">
        <h2 className="text-lg md:text-xl font-medium mb-0 group-hover:opacity-80 transition-opacity flex-1 min-w-0">
          <Link href={`/article/${article.id}`} prefetch className="article-link text-theme">
            {article.title}
          </Link>
        </h2>
        <span className="text-sm text-foreground/60 whitespace-nowrap shrink-0 pl-2 text-right">
          {formatDate(article.date)}
        </span>
      </div>
    </article>
  );
};

export default ArticleCard;
