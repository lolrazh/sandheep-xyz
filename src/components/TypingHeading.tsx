import React from 'react'
import { cn } from '@/lib/utils'

interface TypingHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string
}

export function TypingHeading({ children, className, ...props }: TypingHeadingProps) {
  const characters = children.length
  return (
    <h1
      className={cn(
        'inline-block max-w-full overflow-hidden border-r border-current align-top',
        className
      )}
      style={{
        '--characters': `${characters}ch`,
        animation: `typing 1.5s steps(${characters}, end) forwards, blink 1s step-end infinite`
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </h1>
  )
}

export default TypingHeading
