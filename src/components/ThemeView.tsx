import React, { useState, useEffect, useRef } from 'react'
import { Theme } from '../data'
import Lightbox from './Lightbox'
import BlurImage from './BlurImage'

interface ThemeViewProps {
  theme: Theme
}

const ThemeView = ({ theme }: ThemeViewProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timerRef = useRef<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex(prev => 
    prev !== null ? (prev + 1) % theme.gallery.length : null
  )
  const prevImage = () => setLightboxIndex(prev => 
    prev !== null ? (prev - 1 + theme.gallery.length) % theme.gallery.length : null
  )

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [lightboxIndex])

  return (
    <div className="h-full w-full relative overflow-y-auto">
      {/* Hero Section */}
      <div className="h-[40vh] md:h-[60vh] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${theme.coverImage})`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-light mb-4 md:mb-6 tracking-wide">
              {theme.title}
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
              {theme.description}
            </p>
          </div>
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="px-2 md:px-4 py-4 md:py-8 bg-black">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 md:gap-4 max-w-[2000px] mx-auto group/gallery">
          {theme.gallery.map((image, index) => (
            <div 
              key={index}
              className={`break-inside-avoid mb-2 md:mb-4 group/item cursor-pointer relative transition-opacity duration-500 ${
                hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''
              }`}
              onClick={() => openLightbox(index)}
              onMouseEnter={() => {
                timerRef.current = window.setTimeout(() => {
                  setHoveredIndex(index)
                }, 1000)
              }}
              onMouseLeave={() => {
                if (timerRef.current) {
                  window.clearTimeout(timerRef.current)
                }
                setHoveredIndex(null)
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover/item:shadow-xl">
                <BlurImage 
                  src={image} 
                  alt={`${theme.title} photograph ${index + 1}`}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={theme.gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  )
}

export default ThemeView