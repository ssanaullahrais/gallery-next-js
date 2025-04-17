//v5

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  RenderImageContext,
  RenderImageProps,
  ColumnsPhotoAlbum,
} from "react-photo-album";

// Import gallery configuration with proper TypeScript types
import { galleryImages, GalleryImage } from './images';

// Import lightbox components
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

// Import CSS
import "react-photo-album/columns.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Extend the PhotoAlbum photo type with our additional properties
// This creates a union type that combines both requirements
type PhotoType = GalleryImage;

// Optimized Next.js Image component rendering that maintains aspect ratio
function renderNextJsImage<T extends PhotoType>(
  { alt = "", title, sizes }: RenderImageProps,
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
        src={photo}
        alt={alt || "Gallery image"}
        title={title}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        placeholder={photo.blurDataURL ? "blur" : undefined}
        blurDataURL={photo.blurDataURL}
        style={{ objectFit: "cover" }}
        priority={false} // Only set true for above-the-fold images
        quality={95} // Increased quality from default 75 to 95
      />
    </div>
  );
}

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const [photos] = useState<PhotoType[]>(galleryImages);
  const [loading, setLoading] = useState(true);

  // Update with actual image dimensions when needed, using a more efficient approach
  useEffect(() => {
    const updateActualDimensions = async () => {
      try {
        // Mark loading as complete after a short delay to ensure smooth transitions
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error updating image dimensions:', error);
        setLoading(false);
      }
    };

    updateActualDimensions();
  }, []);

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
          <ColumnsPhotoAlbum<PhotoType>
            photos={photos}
            columns={(containerWidth) => {
              // Responsive column adjustment
              if (containerWidth < 640) return 1;
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
            // Add a subtle spacing between images
            spacing={20}
          />
        </div>

        {/* Lightbox component with improved performance */}
        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
          animation={{ fade: 300 }}
          carousel={{
            finite: false,
            preload: 2,
            padding: 20, // Changed from object to number
          }}
          // Add thumbnail configuration
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
            border: 2,
            borderRadius: 4,
            padding: 4,
            gap: 10,
          }}
          // Add caption configuration for better display
          captions={{
            showToggle: true,
            descriptionTextAlign: "center",
            descriptionMaxLines: 3,
          }}
        />
      </motion.div>
    </div>
  );
}