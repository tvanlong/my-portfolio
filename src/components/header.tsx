'use client'

import React from 'react'

import { useState, useEffect } from 'react'
import { Download, Menu, X, Home, User, Code2, Briefcase, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

export function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const sections = [
    { id: 'about', label: 'About', icon: <User className='h-4 w-4 mr-1' /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className='h-4 w-4 mr-1' /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className='h-4 w-4 mr-1' /> },
    { id: 'contact', label: 'Contact', icon: <Mail className='h-4 w-4 mr-1' /> }
  ]

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
  }, [sections])

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

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'resume.pdf'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'
      }`}
    >
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Logo />
          <nav className='hidden md:flex items-center space-x-1'>
            <Button
              variant='ghost'
              className={`relative px-4 py-2 ${activeSection === '' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={scrollToTop}
            >
              <Home className='h-4 w-4 mr-1' />
              Home
              {activeSection === '' && (
                <motion.div
                  layoutId='activeSection'
                  className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
            {sections.map((section) => (
              <Button
                key={section.id}
                variant='ghost'
                className={`relative px-4 py-2 ${
                  activeSection === section.id ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.icon}
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId='activeSection'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Button>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' className='hidden md:flex gap-2' onClick={handleDownload}>
            <Download className='h-4 w-4' />
            Resume
          </Button>

          <Button variant='ghost' size='icon' className='md:hidden' onClick={toggleMenu} aria-label='Toggle menu'>
            {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
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
            transition={{ duration: 0.2 }}
            className='md:hidden overflow-hidden bg-background border-b'
          >
            <div className='container py-4 flex flex-col space-y-4'>
              <Button
                variant='ghost'
                className={`justify-start ${activeSection === '' ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={scrollToTop}
              >
                <Home className='h-5 w-5 mr-2' />
                Home
              </Button>
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant='ghost'
                  className={`justify-start ${activeSection === section.id ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {React.cloneElement(section.icon, { className: 'h-5 w-5 mr-2' })}
                  {section.label}
                </Button>
              ))}
              <Button variant='outline' size='sm' className='gap-2 w-full sm:w-auto' onClick={handleDownload}>
                <Download className='h-4 w-4' />
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
