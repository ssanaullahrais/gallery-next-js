'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Cinematic Hero Section with immersive slider
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { scrollY } = useScroll();
  const bgRef = useRef(null);
  
  // Parallax effect values
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  
  // Enhanced hero images with color tints
  const heroImages = [
    {
      src: "/gallery/36.jpg",
      alt: "Unique Style",
      title: "CAPTURE STYLE",
      subtitle: "Portrait Excellence",
      tint: "linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(76, 29, 149, 0.2))" // Blue to purple
    },
    {
      src: "/gallery/17.jpg",
      alt: "Wedding photography",
      title: "UNIQUE STYLE",
      subtitle: "Wedding Stories",
      tint: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(220, 38, 38, 0.2))" // Purple to red
    },
    {
      src: "/gallery/2.jpg",
      alt: "Artistic photography",
      title: "CREATE ART",
      subtitle: "Visual Poetry",
      tint: "linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2))" // Indigo to cyan
    }
  ];
  
  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroImages.length]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // Manual navigation
  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };
  
  return (
    <motion.div 
      className="relative h-[95vh] w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity }}
    >
      {/* Background slider with advanced transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
          ref={bgRef}
        >
          {/* Cinematic split layout with reveal effect */}
          <motion.div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ y: parallaxY }}
            animate={{ 
              x: [0, 10, -10, 0],
              rotate: [0, 0.3, -0.3, 0],
              scale: [1.1, 1.12, 1.1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 z-10 bg-black/50" /> {/* Base Overlay */}
            
            {/* Dynamic color overlay based on current slide */}
            <motion.div 
              className="absolute inset-0 z-10 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 mix-blend-overlay"
              animate={{ 
                background: heroImages[currentSlide].tint
              }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Secondary dynamic color effect */}
            <motion.div 
              className="absolute inset-0 z-9 mix-blend-overlay"
              animate={{ 
                background: [
                  'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                  'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 25, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
            />
            
            <Image
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].alt}
              fill
              priority
              sizes="100vw"
              style={{ 
                objectFit: "cover",
                objectPosition: "center"
              }}
              className="transition-all ease-in-out scale-110 duration-10000"
            />
            
            {/* Animated light particles */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              <LightParticles />
            </div>
            
            {/* Animated rippling wave effect */}
            <div className="absolute inset-0 overflow-hidden z-8">
              <motion.div
                className="w-full h-full bg-gradient-radial from-transparent via-white/5 to-transparent"
                style={{
                  backgroundSize: '200% 200%',
                  backgroundPosition: '50% 50%',
                  filter: 'blur(120px)'
                }}
                animate={{
                  backgroundSize: ['200% 200%', '300% 300%', '200% 200%'],
                  backgroundPosition: ['50% 50%', '45% 45%', '55% 55%', '50% 50%']
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Animated light leak effect with more dynamics */}
            <motion.div 
              className="absolute -top-[30%] -left-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl z-5"
              animate={{ 
                opacity: [0, 0.25, 0.1, 0.3, 0],
                x: ['-20%', '20%', '60%', '110%'],
                y: ['10%', '5%', '-5%', '-10%'],
                scale: [0.8, 1.2, 0.9, 1.1, 0.8]
              }}
              transition={{ 
                duration: 18,
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 5,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary light leak from opposite direction with enhanced animation */}
            <motion.div 
              className="absolute -bottom-[30%] -right-[30%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-white/5 to-transparent blur-3xl z-5"
              animate={{ 
                opacity: [0, 0.15, 0.2, 0.1, 0],
                x: ['10%', '-30%', '-70%', '-100%'],
                y: ['-10%', '0%', '5%', '10%'],
                scale: [0.7, 1.1, 0.9, 1.2, 0.7]
              }}
              transition={{ 
                duration: 16,
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 7,
                ease: "easeInOut",
                delay: 8
              }}
            />
            
            {/* Third light leak for more dynamic interaction */}
            <motion.div 
              className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl z-5"
              animate={{ 
                opacity: [0, 0.2, 0.1, 0.25, 0],
                x: ['-5%', '30%', '70%', '100%'],
                y: ['-20%', '-10%', '10%', '20%'],
                scale: [0.5, 1.2, 0.8, 1, 0.5]
              }}
              transition={{ 
                duration: 20,
                times: [0, 0.3, 0.6, 0.8, 1],
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 4,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </motion.div>
          
          {/* Split overlay design element */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black/70 to-transparent"></div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/70 to-transparent"></div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      
      {/* Artistic text mask effect */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay z-15 opacity-20">
        <div className="w-full h-full bg-repeat opacity-20" style={{ 
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')",
          backgroundSize: "4px 4px"
        }}></div>
      </div>
      
      {/* Hero content with sophisticated animations */}
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4"
        style={{ y: textY }}
      >
        <div className="relative w-full px-4 mx-auto max-w-7xl md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center md:text-left md:max-w-4xl"
          >
            {/* Subtitle with reveal animation */}
            <motion.div
              className="mb-2 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2 
                className="inline-block text-white text-xl md:text-2xl font-light tracking-[0.3em] uppercase"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              >
                {heroImages[currentSlide].subtitle}
              </motion.h2>
            </motion.div>
            
            {/* Main title with letter stagger animation */}
            <div className="mb-6 overflow-hidden">
              <motion.h1 
                className="text-6xl font-semibold tracking-wider text-white uppercase md:text-7xl"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {heroImages[currentSlide].title.split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.04 }}
                        className="inline-block"
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </motion.h1>
            </div>
            
            {/* Description with fade-in */}
            <motion.div
              className="mb-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.p 
                className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-200 md:text-xl md:mx-0"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                We transform fleeting moments into timeless memories through the art of photography, capturing the essence of every unique story.
              </motion.p>
            </motion.div>
            
            {/* Buttons with staggered reveal */}
            <motion.div 
              className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/contact" className="block w-full px-10 py-4 text-sm tracking-wider text-center text-black uppercase transition-colors duration-300 bg-white hover:bg-gray-200 sm:w-auto">
                  Book a Session
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/gallery" className="block w-full px-10 py-4 text-sm tracking-wider text-center text-white uppercase transition-colors duration-300 border border-white hover:bg-white hover:text-black sm:w-auto">
                  View Gallery
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced navigation arrows with animations */}
      <motion.button 
        className="absolute z-30 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full left-6 top-1/2 bg-black/30 hover:bg-white hover:text-black md:w-16 md:h-16"
        onClick={prevSlide}
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button 
        className="absolute z-30 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full right-6 top-1/2 bg-black/30 hover:bg-white hover:text-black md:w-16 md:h-16"
        onClick={nextSlide}
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      {/* Animated slide indicators */}
      <motion.div 
        className="absolute z-40 flex space-x-4 transform -translate-x-1/2 bottom-20 left-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-14 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-20" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute z-30 transform -translate-x-1/2 bottom-28 left-1/2 text-white/80"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2
        }}
        initial={{ opacity: 0 }}
      >
        <motion.div className="flex flex-col items-center">
          <span className="mb-2 text-xs tracking-widest uppercase">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Advanced visual effects overlays */}
      <div className="absolute inset-0 pointer-events-none z-15 opacity-20 bg-blend-overlay">
        {/* Film grain texture */}
        <div className="w-full h-full mix-blend-overlay opacity-10" style={{ 
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')"
        }}></div>
      </div>
      
      {/* Subtle lens flare effect */}
      <motion.div 
        className="absolute inset-0 z-20 overflow-hidden opacity-0 pointer-events-none"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 10,
          ease: "easeInOut" 
        }}
      >
        <motion.div 
          className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-gradient-radial from-white via-white/30 to-transparent blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Enhanced animated vignette effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)',
            'radial-gradient(circle at 48% 52%, transparent 50%, rgba(0,0,0,0.4) 100%)',
            'radial-gradient(circle at 52% 48%, transparent 45%, rgba(0,0,0,0.4) 100%)',
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)'
          ],
          opacity: [0.9, 1, 0.95, 0.9]
        }}
        transition={{
          duration: 12,
          times: [0, 0.33, 0.66, 1],
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Pulsing spotlight effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-14"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)'
        }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)'
          ],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Dynamic mesh grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-16 opacity-5 mix-blend-overlay">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.08) 20px), 
                            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.08) 20px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </motion.div>
  );
};

// define the shape of a particle
interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
}

// Light particles component for a premium cinematic effect
const LightParticles = () => {
  // tell TS that particles is an array of Particle
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from(
      { length: 40 },
      (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 20,
        moveX: (Math.random() - 0.5) * 20,
        moveY: (Math.random() - 0.5) * 10,
      })
    );

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0,
            filter: `blur(${particle.size <= 2 ? 0 : 1}px)`
          }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
            x: [0, particle.moveX, 0],
            y: [0, particle.moveY, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Enhanced Hero Section */}
      <HeroSection />
    </div>
  );
}