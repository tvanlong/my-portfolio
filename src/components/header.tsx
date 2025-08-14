'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { Download, Menu, X, Home, User, Code2, Briefcase, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

const sections = [
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail }
]

export function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id)
      }))

      const currentSection = sectionElements.find((section) => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      } else if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const scrollToTop = () => {
    setIsMenuOpen(false)

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const link = document.createElement('a')
      link.href = '/resume.pdf'
      link.download = 'resume.pdf'
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setTimeout(() => setIsDownloading(false), 1000)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/40' : 'bg-background'
        }`}
      >
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-6'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Logo />
            </motion.div>

            <nav className='hidden md:flex items-center space-x-1'>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant='ghost'
                  className={`relative px-4 py-2 transition-colors ${
                    activeSection === '' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={scrollToTop}
                >
                  <Home className='h-4 w-4 mr-1.5' />
                  Home
                  {activeSection === '' && (
                    <motion.div
                      layoutId='activeSection'
                      className='absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Button>
              </motion.div>

              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.div key={section.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant='ghost'
                      className={`relative px-4 py-2 transition-colors ${
                        activeSection === section.id
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      <Icon className='h-4 w-4 mr-1.5' />
                      {section.label}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId='activeSection'
                          className='absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                )
              })}
            </nav>
          </div>

          <div className='flex items-center gap-4'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='outline'
                size='sm'
                className='hidden md:flex gap-2 transition-all hover:shadow-md'
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                {isDownloading ? 'Downloading...' : 'Resume'}
              </Button>
            </motion.div>

            <Button
              variant='ghost'
              size='icon'
              className='md:hidden relative'
              onClick={toggleMenu}
              aria-label='Toggle menu'
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode='wait'>
                {isMenuOpen ? (
                  <motion.div
                    key='close'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className='h-5 w-5' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='menu'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className='h-5 w-5' />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className='md:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-b'
            >
              <motion.div
                className='container py-4 flex flex-col space-y-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <Button
                    variant='ghost'
                    className={`justify-start w-full text-left transition-colors ${
                      activeSection === ''
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={scrollToTop}
                  >
                    <Home className='h-5 w-5 mr-3' />
                    Home
                  </Button>
                </motion.div>

                {sections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (index + 1) * 0.05 }}
                    >
                      <Button
                        variant='ghost'
                        className={`justify-start w-full text-left transition-colors ${
                          activeSection === section.id
                            ? 'text-primary bg-primary/10 font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <Icon className='h-5 w-5 mr-3' />
                        {section.label}
                      </Button>
                    </motion.div>
                  )
                })}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='pt-2'
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='gap-2 w-full transition-all hover:shadow-md'
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                    {isDownloading ? 'Downloading...' : 'Download Resume'}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/20 z-40 md:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
