import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-border/20 border-t-foreground"></div>
    </div>
  );
};

export default LoadingSpinner; 