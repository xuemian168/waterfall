import React from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  // Prevent body scroll when lightbox is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/90 z-50 backdrop-blur-lg group">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Full size view ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />

        {/* 左右导航按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 opacity-100 hover:opacity-80"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 opacity-100 hover:opacity-80"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* 底部导航 */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center items-center gap-4">
        <span className="text-sm bg-black/50 px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  )
}

export default Lightbox