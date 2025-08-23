import { readFile } from 'fs/promises';
import { join } from 'path';
import { Article } from '../components/ArticleCard';

// This type extends the Article type with content
export interface ArticleWithContent extends Article {
  content: string;
}

export const getArticleContent = async (id: string): Promise<string | undefined> => {
  try {
    // For server-side: read from file system
    if (typeof window === 'undefined') {
      const filePath = join(process.cwd(), 'content', 'articles', `${id}.md`);
      const content = await readFile(filePath, 'utf8');
      return content;
    }
    
    // For client-side: use dynamic imports (fallback)
    const articleContents: Record<string, () => Promise<{ default: string }>> = {
      electriclamp: () => import('../../content/articles/electriclamp.md?raw'),
      sunkcostfallacy: () => import('../../content/articles/sunkcostfallacy.md?raw'),
      howyoudosomething: () => import('../../content/articles/howyoudosomething.md?raw'),
      slowdeathofwonder: () => import('../../content/articles/slowdeathofwonder.md?raw'),
    };

    if (articleContents[id]) {
      const content = await articleContents[id]();
      return content?.default;
    }
    
    return undefined;
  } catch (error) {
    console.error(`Error loading article content for ${id}:`, error);
    return undefined;
  }
}; 