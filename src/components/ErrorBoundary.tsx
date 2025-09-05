import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-medium mb-4">Something went wrong</h2>
          <p className="text-foreground/70 mb-6">
            Please try refreshing the page or come back later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
          >
            ↻ Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 