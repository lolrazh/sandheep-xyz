import Layout from '../../src/components/Layout'
import { Skeleton } from '../../src/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10">
        <Skeleton className="h-7 w-40 mb-8" />
        {/* Year sections placeholder */}
        <div className="space-y-8">
          {[0,1].map((i) => (
            <div key={i}>
              {/* Year heading */}
              <Skeleton className="h-5 w-20 mb-4" />
              {/* List of article rows */}
              <div className="space-y-4">
                {[0,1,2].map((j) => (
                  <div key={j} className="flex items-baseline justify-between gap-3">
                    <Skeleton className="h-5 w-9/12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


