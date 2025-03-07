import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface BlurImageProps {
  src: string
  alt: string
  className?: string
}

const BlurImage = ({ src, alt, className = '' }: BlurImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(`${src}?w=20&blur=true`)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
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