'use client'

import { useState } from 'react'

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('Test error triggered!')
  }

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 text-center">
      <h1 className="font-playfair text-3xl font-medium mb-8">Error Testing</h1>
      <div className="space-y-4">
        <button 
          onClick={() => setShouldError(true)}
          className="font-lexend text-sm uppercase tracking-wider px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          Trigger Error
        </button>
        <p className="text-sm text-foreground/60">
          Click to test error.tsx handling
        </p>
      </div>
    </div>
  )
}