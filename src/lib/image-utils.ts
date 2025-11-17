// Image Optimization Utilities for Vendas.IA
// Optimized for Brazilian bandwidth constraints and mobile-first approach

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
  lazy?: boolean;
  placeholder?: 'blur' | 'empty' | 'data';
  priority?: boolean;
  sizes?: string;
  className?: string;
  alt: string;
}

export interface ResponsiveImageConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    xl: number;
  };
  qualities: {
    low: number;
    medium: number;
    high: number;
  };
  formats: {
    modern: string[];
    fallback: string;
  };
}

// Configuration optimized for Brazilian internet speeds
export const BRAZILIAN_IMAGE_CONFIG: ResponsiveImageConfig = {
  breakpoints: {
    mobile: 375,   // iPhone SE and similar
    tablet: 768,   // iPad portrait
    desktop: 1024, // Desktop standard
    xl: 1440,      // Large desktop
  },
  qualities: {
    low: 60,      // For slow connections (3G)
    medium: 75,   // For average connections (4G)
    high: 85,     // For good connections (WiFi/5G)
  },
  formats: {
    modern: ['avif', 'webp'],
    fallback: 'jpeg',
  },
};

// Network quality detection
export type NetworkQuality = 'slow' | 'medium' | 'fast';

export function detectNetworkQuality(): NetworkQuality {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'medium'; // Default fallback
  }

  const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
  
  if (!connection) return 'medium';

  // Check effective connection type
  const effectiveType = connection.effectiveType;
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  } else if (effectiveType === '3g') {
    return 'medium';
  } else {
    return 'fast';
  }
}

// Device capability detection
export interface DeviceCapabilities {
  supportsWebP: boolean;
  supportsAvif: boolean;
  screenDensity: number;
  isRetina: boolean;
  isMobile: boolean;
  isLowEndDevice: boolean;
}

export function detectDeviceCapabilities(): DeviceCapabilities {
  const isBrowser = typeof window !== 'undefined';
  
  if (!isBrowser) {
    return {
      supportsWebP: true, // Assume modern capabilities for SSR
      supportsAvif: false,
      screenDensity: 1,
      isRetina: false,
      isMobile: false,
      isLowEndDevice: false,
    };
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  const supportsAvif = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  
  const screenDensity = window.devicePixelRatio || 1;
  const isRetina = screenDensity >= 2;
  const isMobile = window.innerWidth <= 768;
  
  // Detect low-end devices (simplified heuristic)
  const isLowEndDevice = (
    'connection' in navigator &&
    (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true
  ) || navigator.hardwareConcurrency <= 2;

  return {
    supportsWebP,
    supportsAvif,
    screenDensity,
    isRetina,
    isMobile,
    isLowEndDevice,
  };
}

// Generate optimized image URLs
export function generateImageUrl(
  src: string,
  options: ImageOptimizationOptions
): string {
  // If it's already an optimized URL or external, return as-is
  if (src.includes('?') || src.startsWith('http') || src.includes('data:')) {
    return src;
  }

  const capabilities = detectDeviceCapabilities();
  const networkQuality = detectNetworkQuality();
  
  // Determine optimal format
  let format = options.format || 'auto';
  if (format === 'auto') {
    if (capabilities.supportsAvif) {
      format = 'avif';
    } else if (capabilities.supportsWebP) {
      format = 'webp';
    } else {
      format = 'jpeg';
    }
  }

  // Adjust quality based on network and device
  let quality = options.quality || BRAZILIAN_IMAGE_CONFIG.qualities.medium;
  
  if (networkQuality === 'slow' || capabilities.isLowEndDevice) {
    quality = Math.min(quality, BRAZILIAN_IMAGE_CONFIG.qualities.low);
  } else if (networkQuality === 'fast' && !capabilities.isMobile) {
    quality = Math.max(quality, BRAZILIAN_IMAGE_CONFIG.qualities.high);
  }

  // Adjust dimensions for device
  let { width, height } = options;
  
  if (capabilities.isRetina && !capabilities.isLowEndDevice) {
    width = width ? Math.round(width * 1.5) : width; // 1.5x instead of 2x for bandwidth
    height = height ? Math.round(height * 1.5) : height;
  }

  // Build query parameters
  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('f', format);
  
  // Add optimization flags
  params.set('auto', 'compress');
  if (capabilities.isMobile) params.set('mobile', '1');
  
  return `${src}?${params.toString()}`;
}

// Generate srcset for responsive images
export function generateSrcSet(
  src: string,
  options: ImageOptimizationOptions
): string {
  const { breakpoints } = BRAZILIAN_IMAGE_CONFIG;
  const baseWidth = options.width || breakpoints.desktop;
  
  const sizes = [
    { width: Math.round(baseWidth * 0.5), descriptor: '0.5x' },
    { width: baseWidth, descriptor: '1x' },
    { width: Math.round(baseWidth * 1.5), descriptor: '1.5x' },
  ];

  return sizes
    .map(({ width, descriptor }) => {
      const url = generateImageUrl(src, { ...options, width });
      return `${url} ${descriptor}`;
    })
    .join(', ');
}

// Generate sizes attribute for responsive images
export function generateSizesAttribute(options: ImageOptimizationOptions): string {
  const { breakpoints } = BRAZILIAN_IMAGE_CONFIG;
  
  if (options.sizes) return options.sizes;
  
  const width = options.width || breakpoints.desktop;
  
  return [
    `(max-width: ${breakpoints.mobile}px) ${Math.min(width, breakpoints.mobile)}px`,
    `(max-width: ${breakpoints.tablet}px) ${Math.min(width, breakpoints.tablet)}px`,
    `(max-width: ${breakpoints.desktop}px) ${Math.min(width, breakpoints.desktop)}px`,
    `${width}px`,
  ].join(', ');
}

// Preload critical images
export function preloadImage(src: string, options: ImageOptimizationOptions = { alt: 'preload' }): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = generateImageUrl(src, options);
  
  // Add responsive preloading
  const srcset = generateSrcSet(src, options);
  if (srcset) {
    link.setAttribute('imagesrcset', srcset);
    link.setAttribute('imagesizes', generateSizesAttribute(options));
  }

  document.head.appendChild(link);
}

// Lazy loading intersection observer
let imageObserver: IntersectionObserver | null = null;

export function setupLazyLoading(): void {
  if (typeof window === 'undefined' || imageObserver) return;

  imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Load the actual image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }

          // Add loaded class for animations
          img.classList.add('image-loaded');
          
          // Stop observing this image
          imageObserver?.unobserve(img);
        }
      });
    },
    {
      // Start loading when image is 50px away from viewport
      rootMargin: '50px',
      threshold: 0.01,
    }
  );
}

// Generate placeholder data URL
export function generatePlaceholder(
  width: number,
  height: number,
  color: string = '#f3f4f6'
): string {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Blur placeholder for smooth loading
export function generateBlurPlaceholder(
  width: number = 40,
  height: number = 40
): string {
  // Create a tiny blurred version placeholder
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return generatePlaceholder(width, height);

  // Create gradient for more realistic placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f9fafb');
  gradient.addColorStop(0.5, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1); // Very low quality for small size
}

// Performance monitoring
export interface ImageLoadMetrics {
  src: string;
  loadTime: number;
  fileSize?: number;
  format: string;
  fromCache: boolean;
}

export function trackImageLoad(
  img: HTMLImageElement,
  startTime: number
): ImageLoadMetrics {
  const loadTime = performance.now() - startTime;
  const fromCache = loadTime < 10; // Likely from cache if < 10ms
  
  return {
    src: img.src,
    loadTime,
    format: img.src.includes('webp') ? 'webp' : img.src.includes('avif') ? 'avif' : 'jpeg',
    fromCache,
  };
}

// Export utilities for components
export const imageUtils = {
  generateImageUrl,
  generateSrcSet,
  generateSizesAttribute,
  preloadImage,
  setupLazyLoading,
  generatePlaceholder,
  generateBlurPlaceholder,
  detectDeviceCapabilities,
  detectNetworkQuality,
  trackImageLoad,
  config: BRAZILIAN_IMAGE_CONFIG,
};

export default imageUtils;