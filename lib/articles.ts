import { Article } from '@/components/ArticleCard'
import fs from 'fs'
import path from 'path'

export const articles: Article[] = [
  {
    id: "electriclamp",
    title: "AI-Powered CAD And The Electric Lamp Problem",
    date: "Feb 6",
    fullDate: "February 6, 2025",
    year: 2025
  },
  {
    id: "slowdeathofwonder",
    title: "The Slow Death of Wonder",
    date: "Jul 25",
    fullDate: "July 25, 2025",
    year: 2025
  },
  {
    id: "sunkcostfallacy",
    title: "The Sunk Cost Fallacy",
    date: "Sep 21",
    fullDate: "September 21, 2024",
    year: 2024
  },
  {
    id: "howyoudosomething",
    title: "How You Do Something Is How You Do Everything",
    date: "Sep 15",
    fullDate: "September 15, 2024",
    year: 2024
  }
]

export const getArticlesByYear = (): Map<number, Article[]> => {
  const articlesByYear = new Map<number, Article[]>()
  
  articles.forEach(article => {
    if (!articlesByYear.has(article.year)) {
      articlesByYear.set(article.year, [])
    }
    articlesByYear.get(article.year)?.push(article)
  })
  
  // Convert to array, sort by year descending, and return as new Map
  return new Map(
    [...articlesByYear.entries()]
      .sort((a, b) => b[0] - a[0])
  )
}

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id)
}

export const getAllArticleIds = (): string[] => {
  return articles.map(article => article.id)
}

export const getArticleContent = async (id: string): Promise<string | undefined> => {
  try {
    const filePath = path.join(process.cwd(), 'content', 'articles', `${id}.md`)
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      return content
    }
    
    return undefined
  } catch (error) {
    console.error(`Error loading article content for ${id}:`, error)
    return undefined
  }
}