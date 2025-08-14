'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Code2,
  Coffee,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  Send,
  ExternalLink
} from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/tvanlong',
    icon: Github,
    color: 'hover:text-[#333] dark:hover:text-white',
    bgColor: 'hover:bg-[#333]/10 dark:hover:bg-white/10'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/longvan1173',
    icon: Linkedin,
    color: 'hover:text-[#0077B5]',
    bgColor: 'hover:bg-[#0077B5]/10'
  },
  {
    name: 'Email',
    href: 'mailto:longvan1173@gmail.com',
    icon: Mail,
    color: 'hover:text-primary',
    bgColor: 'hover:bg-primary/10'
  }
]

const footerLinks = {
  navigation: [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ],
  resources: [
    { name: 'Resume', href: '/resume.pdf', external: true },
    { name: 'Blog', href: '/', external: true }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/' },
    { name: 'Terms of Service', href: '/' },
    { name: 'Cookie Policy', href: '/' }
  ]
}

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className='relative w-full border-t bg-gradient-to-b from-background via-background to-muted/30'>
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />
      <div className='container px-4 md:px-6 py-12 md:py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-12 max-w-4xl mx-auto'
        >
          <div className='relative rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 md:p-10 border border-primary/20'>
            <div className='absolute top-0 right-0 p-4'>
              <Sparkles className='h-6 w-6 text-primary/50' />
            </div>

            <div className='grid md:grid-cols-2 gap-6 items-center'>
              <div>
                <h3 className='text-2xl font-bold mb-2'>Stay Updated</h3>
                <p className='text-muted-foreground'>Get notified about new projects and blog posts</p>
              </div>

              <form onSubmit={handleSubscribe} className='flex gap-2'>
                <div className='relative flex-1'>
                  <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full pl-10 pr-3 py-2 rounded-lg border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary'
                    required
                  />
                </div>
                <Button type='submit' size='default' className='gap-2'>
                  <Send className='h-4 w-4' />
                  Subscribe
                </Button>
              </form>
            </div>

            <AnimatePresence>
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='absolute inset-x-0 -bottom-12 flex justify-center'
                >
                  <div className='bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium'>
                    ✓ Successfully subscribed!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-8 mb-12'>
          <div className='col-span-2 md:col-span-2'>
            <div className='flex items-center gap-3 mb-4'>
              <Logo />
            </div>
            <p className='text-sm text-muted-foreground mb-4 max-w-xs'>
              A developer passionate about creating exceptional digital experiences with modern technologies.
            </p>

            <div className='space-y-2 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <MapPin className='h-3.5 w-3.5' />
                <span>Hanoi, Vietnam</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='h-3.5 w-3.5' />
                <span>+84 399 058 ***</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-3.5 w-3.5' />
                <span>{currentTime.toLocaleTimeString()} (GMT+7)</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className='font-semibold mb-4'>Navigation</h4>
            <ul className='space-y-2'>
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group'
                  >
                    <span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className='font-semibold mb-4'>Resources</h4>
            <ul className='space-y-2'>
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group'
                    {...(link.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    })}
                  >
                    <span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
                    {link.external && <ExternalLink className='h-3 w-3 opacity-50' />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group'
                  >
                    <span className='group-hover:translate-x-1 transition-transform'>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className='mb-8' />

        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-muted-foreground'>
            <p>© {currentYear} Long Van. All rights reserved.</p>
            <span className='hidden md:inline'>•</span>
            <p className='flex items-center gap-1'>
              Crafted with
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className='h-3.5 w-3.5 text-red-500 fill-red-500' />
              </motion.span>
              and
              <Coffee className='h-3.5 w-3.5 text-amber-600' />
              using
              <Code2 className='h-3.5 w-3.5 text-primary' />
              Next.js & Tailwind CSS
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <TooltipProvider>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Tooltip key={social.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`
                          relative p-2 rounded-lg text-muted-foreground 
                          transition-all duration-200 
                          ${social.color} ${social.bgColor}
                          hover:scale-110 hover:-translate-y-0.5
                        `}
                      >
                        <Icon className='h-4 w-4' />
                        <span className='sr-only'>{social.name}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-xs'>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='mt-8 pt-8 border-t border-border/50'
        >
          <div className='flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground'>
            <span>Built with:</span>
            {['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className='px-2 py-1 rounded bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-default'
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='fixed bottom-6 right-6 z-50'
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={scrollToTop}
                    size='icon'
                    className='h-10 w-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 bg-primary text-primary-foreground'
                  >
                    <ArrowUp className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='left'>
                  <p className='text-xs'>Back to top</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
