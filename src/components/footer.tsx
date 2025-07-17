import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className='w-full border-t py-6 md:py-0 bg-muted/30'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row'>
        <div className='flex items-center gap-2'>
          <Logo />
          <p className='text-sm text-muted-foreground ml-4'>
            © {new Date().getFullYear()} Long Van. All rights reserved.
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <p className='text-sm text-muted-foreground hidden md:block'>
            Crafted with <Heart className='h-3 w-3 inline text-primary' /> by Long Van using Next.js & Tailwind CSS
          </p>
          <div className='flex gap-4'>
            <Link
              href='https://github.com/tvanlong'
              className='text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='h-4 w-4' />
              <span className='sr-only'>GitHub</span>
            </Link>
            <Link
              href='https://www.linkedin.com/in/longvan1173'
              className='text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Linkedin className='h-4 w-4' />
              <span className='sr-only'>LinkedIn</span>
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1'
            >
              <Mail className='h-4 w-4' />
              <span className='sr-only'>Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
