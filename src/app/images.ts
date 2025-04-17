// images.ts
// This file pre-configures all gallery images with their metadata

// Define the type for our gallery images
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  title: string;
  description?: string;
  blurDataURL: string;
  sizes?: string;
  placeholder?: string;
  alt?: string;
  quality?: number;
}

// Base blur data URL for fast loading placeholders
const baseBlurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7lZRwAAAABJRU5ErkJggg==";

// Pre-defined image aspect ratios for common image sizes in the gallery
// These will be used as placeholders until the actual images load
// This prevents layout shifts by having dimensions that match the real images
const aspectRatios = {
  landscape: { width: 1200, height: 800 },    // 3:2 ratio
  portrait: { width: 800, height: 1200 },     // 2:3 ratio
  square: { width: 1000, height: 1000 },      // 1:1 ratio
  panorama: { width: 1500, height: 600 },     // 5:2 ratio
};

// Define image types based on their position in the gallery
// This helps maintain consistent layout while images load
function getImageType(index: number): 'landscape' | 'portrait' | 'square' | 'panorama' {
  // Create a pattern for image types based on index
  if (index % 3 === 0) return 'landscape';
  if (index % 3 === 1) return 'portrait';
  if (index % 5 === 0) return 'panorama';
  if (index % 7 === 0) return 'square';
  return 'landscape'; // Default
}

// Generate gallery images configuration
export const galleryImages: GalleryImage[] = Array.from({ length: 35 }, (_, i) => {
  const imageNumber = i + 1;
  const imageType = getImageType(imageNumber);
  const { width, height } = aspectRatios[imageType];
  
  return {
    src: `/gallery/${imageNumber}.jpg`,
    width,
    height,
    title: `Photo ${imageNumber}`,
    description: `Beautiful photography work, image ${imageNumber}`,
    blurDataURL: baseBlurDataURL,
    // Adding key properties that Next.js Image can use for optimization
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
    // Placeholder dimensions match actual image aspect ratio to prevent layout shift
    placeholder: "blur",
    // Add metadata for lightbox display
    alt: `Gallery photo ${imageNumber}`,
    // Higher quality for thumbnails
    quality: 95,
  };
});

// Export additional helper functions if needed
export function getOptimizedImageProps(photo: GalleryImage) {
  return {
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt || photo.title,
    title: photo.title,
    blurDataURL: photo.blurDataURL,
    placeholder: "blur",
    sizes: photo.sizes,
    quality: photo.quality || 95,
  };
}