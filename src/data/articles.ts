
import { Article } from '../components/ArticleCard';

export const articles: Article[] = [
  {
    id: "1",
    title: "The Forgotten Art of Letter Writing",
    excerpt: "In an age of instant digital communication, the deliberate pace and thoughtfulness of handwritten letters feels almost revolutionary...",
    date: "2023-11-15",
    year: 2023
  },
  {
    id: "2",
    title: "Analog Photography in a Digital World",
    excerpt: "The resurgence of film photography isn't merely nostalgic—it represents a fundamental shift in how we approach image-making...",
    date: "2023-08-03",
    year: 2023
  },
  {
    id: "3",
    title: "The Tactile Experience of Physical Books",
    excerpt: "Beyond their content, books as physical objects offer sensory experiences that digital alternatives simply cannot replicate...",
    date: "2023-04-22",
    year: 2023
  },
  {
    id: "4",
    title: "Typewriters and Their Modern Appeal",
    excerpt: "The mechanical resistance of keys, the satisfying ding at line's end, the physical imprint of letters pressed into paper...",
    date: "2022-12-10",
    year: 2022
  },
  {
    id: "5",
    title: "Cultural Preservation Through Traditional Crafts",
    excerpt: "When communities maintain their traditional crafts, they preserve not just techniques but entire knowledge systems and worldviews...",
    date: "2022-09-18",
    year: 2022
  },
  {
    id: "6",
    title: "Vinyl Records: The Ritual of Listening",
    excerpt: "Placing the needle, studying the album artwork, committing to the full sequence of songs—vinyl demands a more intentional relationship with music...",
    date: "2022-05-07",
    year: 2022
  },
  {
    id: "7",
    title: "The Slow Movement: Reclaiming Our Time",
    excerpt: "In rejection of the cult of efficiency, slow living advocates for mindfulness and presence over productivity and speed...",
    date: "2021-11-30",
    year: 2021
  },
  {
    id: "8",
    title: "Fountain Pens as Tools of Intention",
    excerpt: "The deliberate flow of ink from a quality fountain pen changes one's relationship to the act of writing itself...",
    date: "2021-08-14",
    year: 2021
  },
  {
    id: "9",
    title: "Handcrafted Paper: A Canvas With Character",
    excerpt: "Each sheet of handmade paper carries subtle variations in texture, thickness, and fiber distribution that commercial papers lack...",
    date: "2021-03-22",
    year: 2021
  }
];

export const getArticlesByYear = (): Map<number, Article[]> => {
  const articlesByYear = new Map<number, Article[]>();
  
  articles.forEach(article => {
    if (!articlesByYear.has(article.year)) {
      articlesByYear.set(article.year, []);
    }
    articlesByYear.get(article.year)?.push(article);
  });
  
  // Convert to array, sort by year descending, and return as new Map
  return new Map(
    [...articlesByYear.entries()]
      .sort((a, b) => b[0] - a[0])
  );
};

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};
