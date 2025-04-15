import { Article } from '../components/ArticleCard';

// This type extends the Article type with content
export interface ArticleWithContent extends Article {
  content: string;
}

// Import all markdown files
const articleContents: Record<string, { default: string }> = {
  electriclamp: await import('../../content/articles/electriclamp.md?raw'),
  sunkcostfallacy: await import('../../content/articles/sunkcostfallacy.md?raw'),
  howyoudosomething: await import('../../content/articles/howyoudosomething.md?raw'),
  curiosity: await import('../../content/articles/curiosity.md?raw'),
};

export const getArticleContent = (id: string): string | undefined => {
  return articleContents[id]?.default;
}; 