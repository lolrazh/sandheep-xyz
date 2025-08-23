export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-border/20 border-t-foreground mx-auto"></div>
        <p className="mt-4 font-lexend text-sm uppercase tracking-wider text-foreground/60">
          Loading...
        </p>
      </div>
    </div>
  )
}