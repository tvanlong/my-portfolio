import Link from 'next/link'
import Image from 'next/image'

export function Logo() {
  return (
    <Link href='/' className='flex items-center space-x-2'>
      <div className='relative h-8 w-8 overflow-hidden rounded-full'>
        <Image src='/logo_v2.png' alt='Logo Long Van' fill className='object-cover' />
      </div>
      <span className='font-bold text-xl'>Long Van</span>
    </Link>
  )
}
