import { notFound } from 'next/navigation'
import { getArticleById, getArticleContent, getAllArticleIds } from '@/lib/articles'
import ReactMarkdown from 'react-markdown'
import { shouldInvertImage } from '@/config/imageInversion'
import { Separator } from "@/components/ui/separator"

interface Props {
  params: Promise<{
    id: string
  }>
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articleIds = getAllArticleIds()
  
  return articleIds.map((id) => ({
    id: id,
  }))
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  const article = getArticleById(id)
  
  if (!article) {
    notFound()
  }
  
  const content = await getArticleContent(id)
  
  if (!content) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-foreground/60 font-lexend uppercase tracking-wider">
          <time dateTime={article.fullDate}>{article.fullDate}</time>
        </div>
      </div>
      
      <Separator className="mb-8 bg-border/20" />
      
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            img: ({ src, alt, ...props }) => (
              <img 
                src={src} 
                alt={alt} 
                className={shouldInvertImage(src || '') ? 'invert-dark' : ''}
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  )
}