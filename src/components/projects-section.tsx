'use client'

import { useState } from 'react'
import { ArrowRight, Github, ExternalLink, Star, GitFork, Eye, Code2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn } from '@/components/page-transition'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  stats: { stars: number; forks: number; views: number }
  links: { demo: string; code: string }
}

export function ProjectsSection() {
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const featuredProjects: Project[] = [
    {
      title: 'E-commerce Platform',
      description:
        'A application allows users to view, buy, manage cart, checkout products and manage information account. Also, the application provides an admin panel for managing products and orders.',
      image:
        'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_30_638422322140399932_cac-dong-laptop-dell-avt.jpg',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      stats: { stars: 1, forks: 0, views: 1 },
      links: { demo: 'https://laptop-ease.vercel.app', code: 'https://github.com/tvanlong/laptop-ease-web' }
    },
    {
      title: 'Personal Finance Tracker',
      description:
        'A web application designed to help users manage their personal finances. It allows users to track their income, expenses, and savings, providing a clear overview of their financial status',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVk9No0DclWTNqyRzEmwk66qArksDKRFFuuDENeyFWm44FNwtv1-uLKarDwE6Zj_vA4c&usqp=CAU',
      tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
      stats: { stars: 1, forks: 0, views: 1 },
      links: { demo: '', code: 'https://github.com/tvanlong/expense-tracker-app' }
    },
    {
      title: 'E-Learning System',
      description:
        'An E-Learning System built using Next.js. It aims to provide a platform for online education, offering various courses and learning materials to users.',
      image: 'https://cdn.fpt-is.com/vi/he-thong-elearning-5.jpg',
      tags: ['Next.js', 'TypeScript', 'MongoDB', 'Clerk'],
      stats: { stars: 1, forks: 0, views: 1 },
      links: { demo: 'https://edu-learningsystem.vercel.app', code: 'https://github.com/tvanlong/learning-system' }
    }
  ]

  const allProjects: Project[] = [...featuredProjects]

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const handleExternalLink = (url: string, label: string) => {
    if (!url) {
      toast({
        title: `${label} link not available`,
        description: `The ${label.toLowerCase()} link is currently missing or unavailable.`
      })
      return
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <FadeIn delay={0.1 * index}>
      <Card className='overflow-hidden group card-hover'>
        <div className='overflow-hidden'>
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className='aspect-video object-cover w-full transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className='h-20'>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2 mb-4'>
            {project.tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant='outline' className='bg-primary/5 hover:bg-primary/10'>
                {tag}
              </Badge>
            ))}
          </div>
          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center'>
              <Star className='h-3.5 w-3.5 mr-1' />
              <span>{project.stats.stars}</span>
            </div>
            <div className='flex items-center'>
              <GitFork className='h-3.5 w-3.5 mr-1' />
              <span>{project.stats.forks}</span>
            </div>
            <div className='flex items-center'>
              <Eye className='h-3.5 w-3.5 mr-1' />
              <span>{project.stats.views}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            size='sm'
            className='gap-1'
            onClick={() => handleExternalLink(project.links.code, 'Code')}
          >
            <Github className='h-4 w-4' />
            Code
          </Button>
          <Button size='sm' className='gap-1 group/btn' onClick={() => handleExternalLink(project.links.demo, 'Demo')}>
            Demo
            <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1' />
          </Button>
        </CardFooter>
      </Card>
    </FadeIn>
  )

  return (
    <section id='projects' className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-background to-muted/40'>
      <div className='container px-4 md:px-6'>
        <FadeIn>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mb-12'>
            <div className='inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2'>
              <Code2 className='h-3.5 w-3.5 mr-1.5' />
              Featured Projects
            </div>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Projects</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Check out some of my recent work. These projects showcase my skills and experience.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8'>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <div className='flex justify-center mt-10'>
          <Button variant='outline' className='gap-2' onClick={openModal}>
            View All Projects
            <ExternalLink className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* All Projects Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg bg-background shadow-lg border'
            >
              <div className='sticky top-0 z-10 flex items-center justify-between p-4 bg-background/90 backdrop-blur-sm border-b'>
                <div className='flex items-center'>
                  <Code2 className='h-5 w-5 mr-2 text-primary' />
                  <h2 className='text-xl font-bold'>All Projects</h2>
                </div>
                <Button variant='ghost' size='icon' onClick={closeModal} className='rounded-full'>
                  <X className='h-5 w-5' />
                  <span className='sr-only'>Close</span>
                </Button>
              </div>

              <div className='p-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {allProjects.map((project, index) => (
                    <Card key={index} className='overflow-hidden group card-hover'>
                      <div className='overflow-hidden'>
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={200}
                          className='aspect-video object-cover w-full transition-transform duration-300 group-hover:scale-105'
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className='h-20'>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant='outline' className='bg-primary/5 hover:bg-primary/10'>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          <div className='flex items-center'>
                            <Star className='h-3.5 w-3.5 mr-1' />
                            <span>{project.stats.stars}</span>
                          </div>
                          <div className='flex items-center'>
                            <GitFork className='h-3.5 w-3.5 mr-1' />
                            <span>{project.stats.forks}</span>
                          </div>
                          <div className='flex items-center'>
                            <Eye className='h-3.5 w-3.5 mr-1' />
                            <span>{project.stats.views}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className='flex justify-between'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='gap-1'
                          onClick={() => handleExternalLink(project.links.code, 'Code')}
                        >
                          <Github className='h-4 w-4' />
                          Code
                        </Button>
                        <Button
                          size='sm'
                          className='gap-1 group/btn'
                          onClick={() => handleExternalLink(project.links.demo, 'Demo')}
                        >
                          Demo
                          <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1' />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
