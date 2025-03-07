import React, { useState, useEffect } from 'react' // Add useEffect to the import statement
import { Camera, Filter, Menu, X } from 'lucide-react'
import logo from '/images/logo.png'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`h-16 flex items-center justify-between px-4 md:px-8 fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-black/95 backdrop-blur-sm'}`}>
      <div className="flex items-center gap-2">
        {/* <Camera size={24} className="text-white" /> */}
        <img src={logo} alt="Logo" className="w-12 h-auto" style={{filter:'invert(1)'}}/>
        <span className="text-xl font-light tracking-wider">Photograph</span>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 text-sm">
        <a href="https://www.ict.run/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">About</a>
        <a href="mailto:xuemian888@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Contact</a>
        {/* <a href="/Marker" className="hover:text-white/70 transition-colors">Tools</a> */}
        <Link to="/marker" className="hover:text-white/70 transition-colors">Tools </Link>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col p-4">
            <a href="https://www.ict.run/" className="py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
              About
            </a>
            <a href="mailto:xuemian888@gmail.com" className="py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
              Contact
            </a>
            {/* <a href="/Marker" className="py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
              Tools
            </a> */}
            <Link to="/marker" className="py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">Tools</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation