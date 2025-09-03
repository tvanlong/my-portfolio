'use client'

import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, Sparkles, ExternalLink, Rocket, Zap, Download } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { BackgroundLines } from '@/components/ui/background-lines'
import Image from 'next/image'

export function HeroSection() {
  const controls = useAnimation()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const socialLinks = [
    {
      href: 'https://github.com/tvanlong',
      icon: Github,
      label: 'GitHub',
      color: 'hover:text-[#333] dark:hover:text-white'
    },
    {
      href: 'https://www.linkedin.com/in/longvan1173/',
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'hover:text-[#0077B5]'
    },
    {
      href: 'mailto:longvan1173@gmail.com',
      icon: Mail,
      label: 'Email',
      color: 'hover:text-primary'
    }
  ]

  return (
    <BackgroundLines className='w-full min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-16 lg:py-20 relative overflow-hidden'>
      <motion.div
        className='absolute top-10 right-10 md:top-20 md:right-20 opacity-10'
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          rotate: 360
        }}
        transition={{
          x: { type: 'spring', stiffness: 50 },
          y: { type: 'spring', stiffness: 50 },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
        }}
      >
        <Sparkles className='h-16 w-16 md:h-24 md:w-24 text-primary' />
      </motion.div>

      <motion.div
        className='absolute bottom-10 left-10 md:bottom-20 md:left-20 opacity-10'
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
          rotate: -360
        }}
        transition={{
          x: { type: 'spring', stiffness: 50 },
          y: { type: 'spring', stiffness: 50 },
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' }
        }}
      >
        <Zap className='h-14 w-14 md:h-20 md:w-20 text-accent' />
      </motion.div>

      <div className='container px-4 md:px-6 relative z-10'>
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-12 items-center'>
          <motion.div
            className='flex flex-col justify-center space-y-6 text-center lg:text-left'
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className='space-y-4'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className='inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-sm mx-auto lg:mx-0'
              >
                <Rocket className='h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 animate-bounce' />
                Available for new opportunities (Intern/Fresher)
              </motion.div>

              <motion.h1
                className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Hi, I&apos;m{' '}
                <span className='gradient-text relative'>
                  Long Van
                  <motion.span
                    className='absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl'
                    animate={{
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className='max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl mx-auto lg:mx-0'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                A recent Information Technology graduate with a strong passion for technology and innovation. I focus on
                building modern, responsive web applications with attention to performance, accessibility, and user
                experience.
              </motion.p>
            </div>

            <motion.div
              className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button className='group relative overflow-hidden' size='lg' onClick={() => scrollToSection('contact')}>
                <span className='relative z-10 flex items-center'>
                  Contact Me
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </span>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                variant='outline'
                size='lg'
                onClick={() => scrollToSection('projects')}
                className='gap-2 group border-2 hover:border-primary/50'
              >
                <ExternalLink className='h-4 w-4 transition-transform duration-300 group-hover:rotate-12' />
                View Projects
              </Button>

              <Button
                variant='ghost'
                size='lg'
                className='gap-2 group sm:hidden lg:inline-flex'
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className='h-4 w-4 transition-transform duration-300 group-hover:translate-y-1' />
                Resume
              </Button>
            </motion.div>

            <motion.div
              className='flex gap-4 pt-2 justify-center lg:justify-start'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`relative p-2 rounded-full text-muted-foreground transition-all duration-300 hover:scale-110 ${link.color} group`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon className='h-5 w-5' />
                      <span className='sr-only'>{link.label}</span>
                      <span className='absolute rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className='relative flex items-center justify-center order-first lg:order-last'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className='relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]'>
              <motion.div
                className='absolute -inset-4 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-30 blur-2xl'
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, repeatType: 'reverse' }
                }}
              />
              <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl'>
                {!isImageLoaded && (
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse' />
                )}
                <Image
                  src='/avatar.jpg'
                  alt='Long Van - Profile Picture'
                  fill
                  sizes='(max-width: 640px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 448px'
                  className='object-cover'
                  priority
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
              <motion.div
                className='absolute -top-4 -right-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg'
                animate={{
                  y: [-5, 5, -5],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Sparkles className='h-5 w-5' />
              </motion.div>
              <motion.div
                className='absolute -bottom-4 -left-4 p-3 rounded-full bg-accent text-accent-foreground shadow-lg'
                animate={{
                  y: [5, -5, 5],
                  rotate: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Zap className='h-5 w-5' />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundLines>
  )
}
