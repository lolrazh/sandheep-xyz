import { Suspense } from 'react'

// Simulate slow component
async function SlowComponent() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  return (
    <div className="p-8 bg-green-50 dark:bg-green-950/20 rounded">
      <h2 className="font-playfair text-2xl mb-4">Content Loaded!</h2>
      <p>This took 3 seconds to load, so you should have seen the loading state.</p>
    </div>
  )
}

export default function TestLoadingPage() {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4">
      <h1 className="font-playfair text-3xl font-medium mb-8 text-center">Loading Testing</h1>
      <Suspense fallback={
        <div className="animate-pulse p-8 bg-foreground/5 rounded">
          <div className="h-8 bg-foreground/10 rounded mb-4"></div>
          <div className="h-4 bg-foreground/10 rounded"></div>
        </div>
      }>
        <SlowComponent />
      </Suspense>
    </div>
  )
}