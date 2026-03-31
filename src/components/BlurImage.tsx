import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

// 模块级缓存：记录已加载过的图片 URL，避免重复 loading
const loadedImages = new Set<string>()

export function preloadImage(src: string) {
  if (loadedImages.has(src)) return
  const img = new Image()
  img.src = src
  img.onload = () => loadedImages.add(src)
}

interface BlurImageProps {
  src: string
  alt: string
  className?: string
}

const BlurImage = ({ src, alt, className = '' }: BlurImageProps) => {
  const alreadyLoaded = loadedImages.has(src)
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)
  const [currentSrc, setCurrentSrc] = useState(alreadyLoaded ? src : `${src}?w=20&blur=true`)

  useEffect(() => {
    if (loadedImages.has(src)) return
    const img = new Image()
    img.src = src
    img.onload = () => {
      loadedImages.add(src)
      setCurrentSrc(src)
      setIsLoading(false)
    }
  }, [src])

  return (
    <div className="relative">
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'blur-sm scale-[1.02]' : 'blur-0 scale-100'} transition-all duration-500`}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
    </div>
  )
}

export default BlurImage