import Link from 'next/link'
import { Code2 } from 'lucide-react'

export function Logo() {
  return (
    <Link href='/' className='flex items-center space-x-2'>
      <div className='relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent'>
        <div className='absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground'>
          <Code2 className='h-4 w-4' />
        </div>
      </div>
      <span className='font-bold text-xl'>Long Van</span>
    </Link>
  )
}
