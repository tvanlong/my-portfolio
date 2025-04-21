'use client'

import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, Sparkles, ExternalLink, Rocket, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const headerOffset = 80
      const elementPosition = contactSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      const headerOffset = 80
      const elementPosition = projectsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className='w-full py-12 md:py-24 lg:py-32 relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute top-20 right-10 opacity-10'>
        <Sparkles className='h-24 w-24 text-primary animate-pulse-soft' />
      </div>
      <div className='absolute bottom-20 left-10 opacity-10'>
        <Zap className='h-20 w-20 text-accent animate-pulse-soft' />
      </div>

      <div className='container px-4 md:px-6 relative z-10'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]'>
          <motion.div
            className='flex flex-col justify-center space-y-6'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='space-y-4'>
              <div className='inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2'>
                <Rocket className='h-3.5 w-3.5 mr-1' />
                Available for new opportunities
              </div>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                Hi, I&apos;m <span className='gradient-text'>Long Van</span>
              </h1>
              <p className='max-w-[600px] text-muted-foreground md:text-xl text-justify'>
                A recent graduate with a passion for technology and innovation. I build modern, responsive web
                applications with cutting-edge technologies.
              </p>
            </div>
            <div className='flex flex-col gap-3 min-[400px]:flex-row'>
              <Button className='group' onClick={scrollToContact}>
                Contact Me
                <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
              </Button>
              <Button variant='outline' onClick={scrollToProjects} className='gap-2'>
                <ExternalLink className='h-4 w-4' />
                View Projects
              </Button>
            </div>
            <div className='flex gap-4 pt-2'>
              <Link
                href='https://github.com/tvanlong'
                className='text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Github className='h-5 w-5' />
                <span className='sr-only'>GitHub</span>
              </Link>
              <Link
                href='https://www.linkedin.com/in/longvan1173/'
                className='text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Linkedin className='h-5 w-5' />
                <span className='sr-only'>LinkedIn</span>
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform'
              >
                <Mail className='h-5 w-5' />
                <span className='sr-only'>Email</span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className='flex items-center justify-center'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='relative'>
              <motion.div
                className='absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent opacity-75 blur'
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse'
                }}
              />
              <Image
                src='https://res.cloudinary.com/dhyxap32r/image/upload/v1745126671/snapedit_1745126640322_yew1jr.png'
                alt='Profile'
                width={400}
                height={400}
                className='relative aspect-square overflow-hidden rounded-full object-cover border-4 border-background'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
