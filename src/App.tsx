import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { themes } from './data'
import ThemeView from './components/ThemeView'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null)
  const [showContextMenu, setShowContextMenu] = useState(false)

  useEffect(() => {
    // 添加调试器保护
    const disableDebugger = () => {
      const obj = Object.create(null);
      let t = Date.now();
      
      Object.defineProperty(obj, 'is_debug', {
        get: () => {
          if (Date.now() - t > 50) {
            document.body.innerHTML = '';
            window.location.reload();
          }
        },
      });

      setInterval(() => {
        t = Date.now();
        (function debug() {
        })['constructor']('debugger')();
        console.log(obj.is_debug);
      }, 100);
    };

    disableDebugger();

    // 原有的事件监听器代码
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setContextMenuPosition({ x: e.clientX, y: e.clientY })
      setShowContextMenu(true)
      setTimeout(() => setShowContextMenu(false), 2000)
    }

    // 禁用 F12 开发者工具
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault()
      }
    }

    // 禁用拖拽
    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    // 添加所有事件监听
    document.addEventListener('dragstart', preventDrag)
    document.addEventListener('drop', preventDrag)
    document.addEventListener('dragover', preventDrag)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // 清理所有事件监听
    return () => {
      document.removeEventListener('dragstart', preventDrag)
      document.removeEventListener('drop', preventDrag)
      document.removeEventListener('dragover', preventDrag)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length)
  }

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + themes.length) % themes.length)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-16">
        <ThemeView theme={themes[currentTheme]} />
        
        {/* Theme Navigation */}
        <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-black/70 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full">
          <button 
            onClick={prevTheme}
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous theme"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          
          {themes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTheme(index)}
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all ${
                index === currentTheme ? 'bg-white w-4 md:w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to theme ${index + 1}`}
            />
          ))}
          
          <button 
            onClick={nextTheme}
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next theme"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>

        <Footer />
      </main>

      {contextMenuPosition && showContextMenu && (
        <div
          style={{
            position: 'absolute',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            pointerEvents: 'none',
            transition: 'opacity 1s ease-in-out',
            opacity: showContextMenu ? 1 : 0,
          }}
        >
          ©️
        </div>
      )}
    </div>
  )
}

export default App