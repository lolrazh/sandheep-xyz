import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleById } from '../../../src/data/articles'
import { buildTitle, canonical, defaultOgImage } from '../../../src/lib/seo'
import ArticleClientWrapper from './ArticleClientWrapper'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = getArticleById(id)

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
    }
  }

  const title = buildTitle(article.title)
  const description = article.excerpt || 'Read this article by Sandheep Rajkumar'
  const url = canonical(`/article/${id}`)

  return {
    title,
    description,
    metadataBase: new URL('https://sandheep.xyz'),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sandheep Rajkumar',
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
        }
      ],
      type: 'article',
      publishedTime: new Date(`${article.date} ${article.year}`).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultOgImage],
    }
  }
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  const article = getArticleById(id)
  
  if (!article) {
    notFound()
  }

  return <ArticleClientWrapper />
}