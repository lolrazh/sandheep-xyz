import { Article } from '../components/ArticleCard';

// This type extends the Article type with content
export interface ArticleWithContent extends Article {
  content: string;
}

// Import all markdown files
const articleContents: Record<string, Promise<{ default: string }>> = {
  electriclamp: import('../../content/articles/electriclamp.md?raw'),
  sunkcostfallacy: import('../../content/articles/sunkcostfallacy.md?raw'),
  howyoudosomething: import('../../content/articles/howyoudosomething.md?raw'),
  curiosity: import('../../content/articles/curiosity.md?raw'),
};

export const getArticleContent = async (id: string): Promise<string | undefined> => {
  try {
    const content = await articleContents[id];
    return content?.default;
  } catch (error) {
    console.error(`Error loading article content for ${id}:`, error);
    return undefined;
  }
}; 