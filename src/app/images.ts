// Define the type for our gallery images - v5

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
const aspectRatios = {
  landscape: { width: 1200, height: 800 },   // 3:2 ratio
  portrait: { width: 800, height: 1200 },    // 2:3 ratio
  square: { width: 1000, height: 1000 },     // 1:1 ratio
  panorama: { width: 1500, height: 600 },    // 5:2 ratio
};

// Manually define image orientations based on filename
// This approach is more reliable when dynamic loading isn't working
const imageOrientations: Record<number, 'landscape' | 'portrait' | 'square' | 'panorama'> = {
  // First 10 images - vary these as needed based on your actual images
  1: 'landscape',
  2: 'portrait',
  3: 'landscape',
  4: 'square',
  5: 'portrait',
  6: 'landscape',
  7: 'panorama',
  8: 'portrait',
  9: 'landscape',
  10: 'square',
  // Images 11-20
  11: 'portrait',
  12: 'landscape',
  13: 'portrait',
  14: 'landscape',
  15: 'panorama',
  16: 'square',
  17: 'portrait',
  18: 'landscape',
  19: 'portrait',
  20: 'landscape',
  // Images 21-30
  21: 'square',
  22: 'landscape',
  23: 'portrait',
  24: 'landscape',
  25: 'panorama',
  26: 'portrait',
  27: 'landscape',
  28: 'square',
  29: 'portrait',
  30: 'landscape',
  // Images 31-35
  31: 'portrait',
  32: 'landscape',
  33: 'panorama',
  34: 'square',
  35: 'landscape'
};

// Generate gallery images configuration with manually specified orientations
export const galleryImages: GalleryImage[] = Array.from({ length: 35 }, (_, i) => {
  const imageNumber = i + 1;
  
  // Get the orientation from our mapping, or default to landscape
  const imageType = imageOrientations[imageNumber] || 'landscape';
  const { width, height } = aspectRatios[imageType];
  
  return {
    src: `/gallery/${imageNumber}.jpg`,
    width,
    height,
    title: `Photo ${imageNumber}`,
    description: `Beautiful photography work, image ${imageNumber}`,
    blurDataURL: baseBlurDataURL,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
    placeholder: "blur",
    alt: `Gallery photo ${imageNumber}`,
    quality: 75,
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
    quality: photo.quality || 75,
  };
}