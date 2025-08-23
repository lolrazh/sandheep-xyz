'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-background text-foreground">
          <h1 className="text-6xl font-medium mb-4">500</h1>
          <p className="text-xl mb-8 max-w-md">
            A critical error occurred. Please try refreshing the page.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => reset()}
              className="px-6 py-3 bg-foreground text-background hover:opacity-80 transition-opacity text-sm uppercase tracking-wider"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 border border-current hover:bg-foreground hover:text-background transition-colors text-sm uppercase tracking-wider"
            >
              Go Home
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left max-w-2xl">
              <summary className="cursor-pointer opacity-60">Error Details</summary>
              <pre className="mt-2 p-4 bg-black/10 text-sm overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  )
}