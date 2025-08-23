import React from 'react';
import { shouldInvertImage } from '@/config/imageInversion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, ...props }) => {
  if (!src) return null;

  // Add image inversion class if needed
  const combinedClassName = [
    className, 
    shouldInvertImage(src) ? 'invert-dark' : ''
  ].filter(Boolean).join(' ');

  return (
    <img 
      {...props}
      src={src}
      alt={alt}
      className={combinedClassName}
      loading="lazy"
      decoding="async"
      // Add basic responsive behavior
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...props.style
      }}
    />
  );
};