import Layout from '../../src/components/Layout'
import { Skeleton } from '../../src/components/ui/skeleton'

export default function CommonplaceLoading() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-10">
        <Skeleton className="h-7 w-56 mb-8" />
        <div className="space-y-0">
          {[0,1,2,3,4].map((i) => (
            <div key={i}>
              <div className="py-4">
                <div className="flex justify-between items-center md:items-baseline gap-3 min-w-0">
                  <Skeleton className="h-5 w-9/12" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
              </div>
              {i < 4 && <div className="h-[1px] bg-[hsl(var(--border))] opacity-60" />}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


