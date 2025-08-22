interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  
  return (
    <div>
      <h1>Article: {id}</h1>
      <p>This is the article detail page - content will be migrated from src/pages/ArticleDetail.tsx</p>
    </div>
  )
}