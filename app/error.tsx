'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to your error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center px-4">
      <h1 className="font-playfair text-6xl font-medium mb-4">Oops!</h1>
      <p className="text-xl text-foreground/80 mb-8 max-w-md">
        Something went wrong while loading this page.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button 
          onClick={() => reset()}
          className="font-lexend text-sm uppercase tracking-wider px-6 py-3 bg-foreground text-background hover:opacity-80 transition-opacity"
        >
          Try Again
        </button>
        <button 
          onClick={() => router.push('/')}
          className="font-lexend text-sm uppercase tracking-wider px-6 py-3 border border-border/20 hover:border-foreground/60 transition-colors"
        >
          Go Home
        </button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8 text-left max-w-2xl">
          <summary className="cursor-pointer text-foreground/60">Error Details</summary>
          <pre className="mt-2 p-4 bg-foreground/5 text-sm overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  )
}