import React, { useState, useRef, useEffect } from 'react'
import { X, Camera } from 'lucide-react'
import exifr from 'exifr' 
import heic2any from 'heic2any'

import appleLogo from '/logos/apple.png'
import hasselblad from '/logos/hasselblad.png'
import nikon from '/logos/nikon1.png'
import sony from '/logos/sony.png'
import canon from '/logos/canon.png'

interface CameraInfo {
  brand: string
  model: string
  focalLength: string
  aperture: string
  shutterSpeed: string
  iso: string
  dateTime: string
}

const CAMERA_BRANDS = {
  'Apple': { logo: appleLogo, style: 'modern' },
  'NIKON CORPORATION': { logo: nikon, style: 'modern' },
  'Canon': { logo: canon, style: 'classic' },
  'HUAWEI': { logo: '📱', style: 'modern' },
  'Xiaomi': { logo: '📱', style: 'modern' },
  'DJI': { logo: '🚁', style: 'modern' },
  'SONY': { logo: sony, style: 'classic' },
  'FUJIFILM': { logo: '📸', style: 'classic' },
  'Leica': { logo: '📸', style: 'premium' },
  'Hasselblad':{logo:hasselblad, style:'premium'},
}

const Marker = () => {
  const [image, setImage] = useState<string | null>(null)
  const [cameraInfo, setCameraInfo] = useState<CameraInfo | null>(null)
  const [customMode, setCustomMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      let imageBlob = file

      // Handle HEIC/HEIF format
      if (file.type === 'image/heic' || 
          file.name.toLowerCase().endsWith('.heic') || 
          file.name.toLowerCase().endsWith('.heif')) {
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9
          }) as Blob
          // Create a new File object from the converted Blob
          imageBlob = new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
            type: 'image/jpeg',
            lastModified: file.lastModified
          })
        } catch (conversionError) {
          console.error('HEIC conversion failed:', conversionError)
          throw new Error('HEIC conversion failed')
        }
      }

      // Read EXIF data
      const exif = await exifr.parse(imageBlob)
      if (exif) {
        setCameraInfo({
          brand: exif.Make || 'Unknown',
          model: exif.Model || 'Unknown',
          focalLength: exif.FocalLength ? `${exif.FocalLength}mm` : '',
          aperture: exif.FNumber ? `f/${exif.FNumber}` : '',
          shutterSpeed: exif.ExposureTime ? `1/${1/exif.ExposureTime}` : '',
          iso: exif.ISO ? `ISO${exif.ISO}` : '',
          dateTime: exif.DateTimeOriginal || new Date().toISOString()
        })
      }

      // 读取图片
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(imageBlob)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Please use JPG or PNG')
    }
  }

  const addWatermark = () => {
    if (!image || !canvasRef.current || !cameraInfo) return
  
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
  
    const img = new Image()
    img.src = image
    img.onload = () => {
      // 计算水印区域高度
      const frameHeight = Math.max(img.height * 0.08, 60)
      
      // 设置画布大小（包含水印区域）
      canvas.width = img.width
      canvas.height = img.height + frameHeight
  
      // 绘制原图
      ctx.drawImage(img, 0, 0)
  
      // 绘制白色背景
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, img.height, canvas.width, frameHeight)
  
      // 设置文字样式
      ctx.fillStyle = '#262626'
      const textPadding = frameHeight * 0.25
      const modelSize = Math.floor(frameHeight * 0.32)
      const dateSize = Math.floor(frameHeight * 0.22)
      const infoSize = Math.floor(frameHeight * 0.25)
  
      // 左侧相机型号和日期
      ctx.textAlign = 'left'
      // 型号
      ctx.font = `600 ${modelSize}px 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif`
      ctx.fillText(cameraInfo.model, textPadding, img.height + frameHeight * 0.4)
      
      // 日期
      ctx.font = `${dateSize}px 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif`
      ctx.fillStyle = '#666666'  // Set text color to dark gray
      const date = new Date(cameraInfo.dateTime).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
      ctx.fillText(date, textPadding, img.height + frameHeight * 0.75)
      ctx.fillStyle = '#262626'  // Reset text color back to original
  
      // 右侧参数信息
      ctx.font = `${infoSize}px 'SF Mono', Menlo, monospace`
      ctx.textAlign = 'right'
      const info = `${cameraInfo.focalLength} ${cameraInfo.aperture} ${cameraInfo.shutterSpeed} ${cameraInfo.iso}`
      ctx.fillText(info, canvas.width - textPadding, img.height + frameHeight * 0.58)
  
      // 添加品牌 Logo
      const brand = CAMERA_BRANDS[cameraInfo.brand as keyof typeof CAMERA_BRANDS]
      if (brand?.logo) {
        if (typeof brand.logo === 'string' && !brand.logo.startsWith('/')) {
          // emoji logo
          const logoSize = frameHeight * 0.4
          ctx.font = `${logoSize}px 'Apple Color Emoji'`
          ctx.textAlign = 'center'
          ctx.fillText(brand.logo, canvas.width / 2, img.height + frameHeight * 0.6)
        } else {
          // 图片 logo
          const logoImg = new Image()
          logoImg.src = brand.logo
          logoImg.onload = () => {
            const logoHeight = frameHeight * 0.45
            const logoWidth = (logoImg.width / logoImg.height) * logoHeight
            ctx.drawImage(
              logoImg,
              canvas.width / 2 - logoWidth / 2,
              img.height + frameHeight * 0.28,
              logoWidth,
              logoHeight
            )
          }
        }
      }
    }
  }

  useEffect(() => {
    if (image && cameraInfo) {
      addWatermark()
    }
  }, [image, cameraInfo])

  return (
    <div className="min-h-screen bg-black/95 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-light mb-4">Camera Watermark</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setCustomMode(!customMode)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                customMode ? 'bg-white/20' : 'bg-white/10'
              }`}
            >
              {customMode ? 'Manual' : 'Auto'}
            </button>
          </div>

          {customMode && cameraInfo && (
            <div className="space-y-4">
              <select
                value={cameraInfo.brand}
                onChange={(e) => setCameraInfo({ ...cameraInfo, brand: e.target.value })}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-white/10 text-white"
              >
                {Object.keys(CAMERA_BRANDS).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              
              <input
                type="text"
                value={cameraInfo.model}
                onChange={(e) => setCameraInfo({ ...cameraInfo, model: e.target.value })}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-white/10 text-white"
                placeholder="Camera Module"
              />
            </div>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
          {!image ? (
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Click or Drag a photo here</p>
            </label>
          ) : (
            <div className="relative">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
              <button
                onClick={() => {
                  setImage(null)
                  setCameraInfo(null)
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (!canvasRef.current) return
                  const link = document.createElement('a')
                  link.download = 'watermarked-image.jpg'
                  link.href = canvasRef.current.toDataURL('image/jpeg', 0.9)
                  link.click()
                }}
                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Marker