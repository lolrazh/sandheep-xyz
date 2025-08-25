import { Skeleton } from "../src/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {/* Generic page skeleton: title + a few blocks */}
      <Skeleton className="h-8 w-2/3 mb-6" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <div className="h-2" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-8/12" />
      </div>
    </div>
  )
}