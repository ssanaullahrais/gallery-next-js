// v6
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album";

import PhotoAlbum from "react-photo-album";

// Import gallery configuration with proper TypeScript types
import { galleryImages, GalleryImage } from './images';

// Import lightbox components
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// Import CSS
import "react-photo-album/styles.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Optimized Next.js Image component rendering that maintains aspect ratio
function renderNextJsImage<T extends GalleryImage>(
  { alt = "", title }: RenderImageProps,
  { photo, width, height }: RenderImageContext<T>,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo.src}
        alt={alt || "Gallery image"}
        title={title}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        placeholder={photo.blurDataURL ? "blur" : undefined}
        blurDataURL={photo.blurDataURL}
        style={{ objectFit: "cover" }}
        priority={false}
        quality={95}
      />
    </div>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const [photos] = useState<GalleryImage[]>(galleryImages);
  const [loading, setLoading] = useState(true);

  // Simple loading state to ensure smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Debugging: log photo information to console
  useEffect(() => {
    console.log('Gallery initialized with photos:', photos.length);
    // Log the first few photos to check their structure
    console.log('Sample photos:', photos.slice(0, 3));
  }, [photos]);

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div 
        className="w-full py-0 mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >        
        {/* Wrapper div with the loading class */}
        <div className={loading ? "gallery-loading" : "gallery-loaded"}>
          {/* Gallery implementation with proper Next.js image optimization */}
          <PhotoAlbum<GalleryImage>
            photos={photos}
            layout="columns"
            columns={(containerWidth) => {
              // Responsive column adjustment
              if (containerWidth < 640) return 2;
              if (containerWidth < 768) return 2;
              if (containerWidth < 1280) return 3;
              return 4;
            }}
            render={{ image: renderNextJsImage }}
            defaultContainerWidth={1280}
            sizes={{
              size: "1280px",
              sizes: [
                { viewport: "(max-width: 640px)", size: "100vw" },
                { viewport: "(max-width: 1024px)", size: "50vw" },
                { viewport: "(max-width: 1280px)", size: "calc(33vw - 20px)" },
                { viewport: "(min-width: 1281px)", size: "calc(25vw - 30px)" },
              ],
            }}
            onClick={({ index }) => setIndex(index)}
            spacing={20}
          />
        </div>

        {/* Lightbox component with improved performance */}
        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          animation={{ fade: 300 }}
          carousel={{
            finite: false,
            preload: 2,
            padding: 0,
          }}
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
            border: 1,
            borderRadius: 4,
            padding: 0,
            gap: 10,
          }}
        />
      </motion.div>
    </div>
  );
}