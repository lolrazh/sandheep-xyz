import Layout from '../../../src/components/Layout'
import { Skeleton } from '../../../src/components/ui/skeleton'

export default function ArticleLoading() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4">
        <div className="mt-8">
          {/* Title */}
          <Skeleton className="h-9 w-3/4 mb-3" />
          {/* Author and date */}
          <Skeleton className="h-4 w-1/2 mb-6" />
          {/* Separator */}
          <div className="h-0.5 bg-foreground/30 rounded mb-12 animate-pulse" />
        </div>

        {/* Content paragraphs */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
          <div className="h-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
          <Skeleton className="h-4 w-8/12" />
          <div className="h-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>

        {/* Footer link placeholder */}
        <div className="mt-12 pt-6 border-t border-border/10">
          <Skeleton className="h-4 w-40" />
        </div>
      </article>
    </Layout>
  )
}