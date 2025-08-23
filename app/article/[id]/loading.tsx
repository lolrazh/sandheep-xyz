export default function ArticleLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Article title skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-foreground/10 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-foreground/5 rounded mb-8 w-1/2"></div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-foreground/10 rounded w-full"></div>
          <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
          <div className="h-4 bg-foreground/10 rounded w-4/5"></div>
          <div className="h-8 bg-foreground/5 rounded w-full my-6"></div>
          <div className="h-4 bg-foreground/10 rounded w-full"></div>
          <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}