
import React from 'react';
import { Link } from 'react-router-dom';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  year: number;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <article className="mb-14 group">
      <div className="mb-1">
        <span className="font-lexend text-xs uppercase tracking-wider text-jet/60">
          {formatDate(article.date)}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:opacity-80 transition-opacity">
        <Link to={`/article/${article.id}`} className="article-link">
          {article.title}
        </Link>
      </h2>
      <p className="text-jet/80 mb-4 leading-relaxed">{article.excerpt}</p>
      <Link 
        to={`/article/${article.id}`}
        className="font-lexend text-sm uppercase tracking-wider text-jet/70 hover:text-jet transition-colors"
      >
        Continue Reading →
      </Link>
    </article>
  );
};

export default ArticleCard;
