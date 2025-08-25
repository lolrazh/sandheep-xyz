import Layout from '../../src/components/Layout'
import { Skeleton } from '../../src/components/ui/skeleton'

export default function AboutLoading() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl py-10">
        <Skeleton className="h-7 w-72 mb-6" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </div>
    </Layout>
  )
}


