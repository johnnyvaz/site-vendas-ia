import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, ImageOff } from 'lucide-react';
import {
  imageUtils,
  type ImageOptimizationOptions,
  type ImageLoadMetrics,
} from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageOptimizationOptions, 'alt'> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onLoad?: (metrics?: ImageLoadMetrics) => void;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
  containerClassName?: string;
  errorComponent?: React.ComponentType<{ error: string; retry: () => void }>;
  loadingComponent?: React.ComponentType;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2' | string;
  blur?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  lazy = true,
  placeholder = 'blur',
  fallbackSrc,
  format,
  quality = 85,
  onLoad,
  onError,
  children,
  containerClassName,
  errorComponent,
  loadingComponent,
  objectFit = 'cover',
  aspectRatio,
  blur = false,
  rounded = false,
  shadow = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loadMetrics, setLoadMetrics] = useState<ImageLoadMetrics | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Generate optimized image sources using new utilities
  const options: ImageOptimizationOptions = {
    width,
    height,
    quality,
    format,
    lazy,
    placeholder,
    priority,
    sizes,
    alt,
  };

  const optimizedSrc = imageUtils.generateImageUrl(currentSrc, options);
  const srcSet = imageUtils.generateSrcSet(currentSrc, options);
  const sizesAttr = imageUtils.generateSizesAttribute(options);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setIsLoaded(true);
    setHasError(false);
    
    if (startTimeRef.current > 0) {
      const metrics = imageUtils.trackImageLoad(img, startTimeRef.current);
      setLoadMetrics(metrics);
      onLoad?.(metrics);
    } else {
      onLoad?.();
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    
    const error = new Error(`Failed to load image: ${currentSrc}`);
    onError?.(error);
    
    // Try fallback if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }
  };

  const containerClasses = cn(
    'relative overflow-hidden bg-gray-100',
    {
      'rounded-lg': rounded,
      'shadow-lg': shadow,
      'aspect-square': aspectRatio === '1/1',
      'aspect-video': aspectRatio === '16/9',
      'aspect-[4/3]': aspectRatio === '4/3',
      'aspect-[3/2]': aspectRatio === '3/2',
    },
    className
  );

  const imageClasses = cn(
    'w-full h-full transition-all duration-300 ease-in-out',
    {
      'object-contain': objectFit === 'contain',
      'object-cover': objectFit === 'cover',
      'object-fill': objectFit === 'fill',
      'object-none': objectFit === 'none',
      'object-scale-down': objectFit === 'scale-down',
      'opacity-0': !isLoaded && !hasError,
      'opacity-100': isLoaded,
      'blur-sm': blur && !isLoaded,
      'scale-105': isLoaded, // Slight zoom effect when loaded
    }
  );

  // Custom aspect ratio
  const containerStyle = aspectRatio && !['1/1', '16/9', '4/3', '3/2'].includes(aspectRatio)
    ? { aspectRatio }
    : {};

  if (hasError && fallbackSrc && currentSrc === fallbackSrc) {
    return (
      <div ref={containerRef} className={containerClasses} style={containerStyle}>
        <img
          src={fallbackSrc}
          alt={alt}
          className={imageClasses}
          width={width}
          height={height}
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        ref={containerRef} 
        className={cn(containerClasses, 'flex items-center justify-center bg-gray-200')}
        style={containerStyle}
      >
        <ImageOff className="w-8 h-8 text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">Imagem não encontrada</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={containerClasses} style={containerStyle}>
      {/* Placeholder while loading */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover opacity-50 blur-sm"
              aria-hidden="true"
            />
          ) : (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          )}
        </div>
      )}

      {/* Main image with progressive enhancement */}
      {isInView && (
        <picture>
          {/* Modern formats handled by imageUtils */}
          <img
            ref={imgRef}
            src={optimizedSrc}
            srcSet={srcSet}
            sizes={sizesAttr}
            alt={alt}
            className={imageClasses}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}

          />
        </picture>
      )}

      {/* Loading overlay */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
      )}
    </div>
  );
};

// Pre-defined image components for common use cases
export const HeroImage: React.FC<Omit<OptimizedImageProps, 'aspectRatio' | 'priority' | 'objectFit'>> = (props) => (
  <OptimizedImage
    {...props}
    aspectRatio="16/9"
    priority={true}
    objectFit="cover"
    className={cn('w-full', props.className)}
  />
);

export const ProfileImage: React.FC<Omit<OptimizedImageProps, 'aspectRatio' | 'rounded' | 'objectFit'>> = (props) => (
  <OptimizedImage
    {...props}
    aspectRatio="1/1"
    rounded={true}
    objectFit="cover"
    className={cn('w-24 h-24 md:w-32 md:h-32', props.className)}
  />
);

export const ProductImage: React.FC<Omit<OptimizedImageProps, 'aspectRatio' | 'shadow' | 'rounded'>> = (props) => (
  <OptimizedImage
    {...props}
    aspectRatio="4/3"
    shadow={true}
    rounded={true}
    className={cn('w-full', props.className)}
  />
);

export const ThumbnailImage: React.FC<Omit<OptimizedImageProps, 'aspectRatio' | 'rounded'>> = (props) => (
  <OptimizedImage
    {...props}
    aspectRatio="1/1"
    rounded={true}
    className={cn('w-16 h-16 md:w-20 md:h-20', props.className)}
  />
);

export default OptimizedImage;