'use client'

import type React from 'react'

import { useState } from 'react'
import { GraduationCap, Briefcase, FileText, Download, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FadeIn } from '@/components/page-transition'
import Image from 'next/image'

export function AboutSection() {
  const [activeTab, setActiveTab] = useState('bio')

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
    <section id='about' className='w-full py-12 md:py-24 lg:py-32 bg-muted/40'>
      <div className='container px-4 md:px-6'>
        <FadeIn>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mb-12'>
            <div className='inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2'>
              <User className='h-3.5 w-3.5 mr-1.5' />
              My Background
            </div>
            <div className='space-y-2 max-w-[900px]'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>About Me</h2>
              <p className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Get to know my background, experience, and what drives me.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className='max-w-5xl mx-auto'>
          <Tabs defaultValue='bio' value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <FadeIn delay={0.1}>
              <TabsList className='grid w-full grid-cols-4 mb-8'>
                <TabsTrigger
                  value='bio'
                  className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                >
                  Bio
                </TabsTrigger>
                <TabsTrigger
                  value='education'
                  className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value='experience'
                  className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value='interests'
                  className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                >
                  Interests
                </TabsTrigger>
              </TabsList>
            </FadeIn>

            <TabsContent value='bio' className='space-y-6'>
              <FadeIn delay={0.2}>
                <Card>
                  <CardContent className='p-6 space-y-4'>
                    <div className='grid md:grid-cols-[1fr_250px] gap-6'>
                      <div className='space-y-4'>
                        <h3 className='text-2xl font-bold'>About Me</h3>
                        <p className='text-muted-foreground'>
                          I’m a dedicated software developer with a solid foundation in computer science and a passion
                          for building clean, user-friendly web applications. My journey began at 20, experimenting with
                          HTML and CSS to create simple web pages—and I’ve been hooked ever since.
                        </p>
                        <p className='text-muted-foreground'>
                          During my academic years, I cultivated a full-stack mindset, gaining hands-on experience with
                          both frontend and backend technologies. I value writing clean, maintainable code and
                          constantly stay updated with modern tools, frameworks, and best practices.
                        </p>
                        <p className='text-muted-foreground'>
                          I’m driven by a desire to solve real-world problems through technology and create meaningful
                          digital experiences. My primary focus lies in web development, where I continue to grow and
                          contribute with purpose.
                        </p>

                        <div className='pt-4'>
                          <Button className='gap-2' onClick={handleDownload}>
                            <FileText className='h-4 w-4' />
                            <Download className='h-4 w-4' />
                            Download Resume
                          </Button>
                        </div>
                      </div>
                      <div className='flex items-center justify-center'>
                        <div className='relative w-full max-w-[250px] aspect-square overflow-hidden rounded-xl'>
                          <Image
                            src='https://st2.depositphotos.com/1032577/5312/i/450/depositphotos_53128333-stock-photo-about-me-sign.jpg'
                            width={250}
                            height={250}
                            alt='About Me'
                            className='object-cover w-full h-full'
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            <TabsContent value='education' className='space-y-6'>
              <FadeIn delay={0.2}>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-8'>
                      <h3 className='text-2xl font-bold'>Education Timeline</h3>
                      <div className='relative border-l-2 border-muted pl-6 space-y-10'>
                        <TimelineItem
                          icon={<GraduationCap className='h-5 w-5' />}
                          date='2021 - 2024'
                          title='BKACAD Academy of Technology'
                          subtitle='Information Technology'
                          description='Specialized in software engineering and data structures.'
                          details={[
                            'Data Structures & Algorithms',
                            'Web Development',
                            'Database Systems',
                            'Software Engineering'
                          ]}
                        />
                        <TimelineItem
                          icon={<GraduationCap className='h-5 w-5' />}
                          date='2018 - 2021'
                          title='Ly Thuong Kiet High School'
                          subtitle='High School Diploma'
                          description='Graduated with honors.'
                          details={['...']}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            <TabsContent value='experience' className='space-y-6'>
              <FadeIn delay={0.2}>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-8'>
                      <h3 className='text-2xl font-bold'>Work Experience</h3>
                      <div className='relative border-l-2 border-muted pl-6 space-y-10'>
                        <TimelineItem
                          icon={<Briefcase className='h-5 w-5' />}
                          date='Feb. 2024 - Apr. 2024'
                          title='Software Engineering Intern'
                          subtitle='Eastern Sun Vietnam JSC'
                          description='Explored React.js and ASP.NET technologies to support full-stack project development.'
                          details={[
                            'Built responsive and reusable UI components with React.js, ensuring cross-device compatibility.',
                            'Integrated RESTful APIs into the frontend to enable seamless data communication and dynamic rendering.'
                          ]}
                        />
                        <TimelineItem
                          icon={<Briefcase className='h-5 w-5' />}
                          date='Apr. 2025 - Jul. 2025'
                          title='Frontend Developer'
                          subtitle='Simax Technology and Solutions JSC'
                          description='Contributing to a public information portal using Next.js.'
                          details={[
                            'Developed a public information portal using Next.js to enhance accessibility and performance.',
                            'Migrated rendering logic from client-side to server-side, improving SEO and reducing initial load time.',
                            'Integrated Directus (Headless CMS) to enable efficient, non-technical content management.',
                            'Technologies: Next.js, TypeScript, PostgreSQL, Directus.'
                          ]}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            <TabsContent value='interests' className='space-y-6'>
              <FadeIn delay={0.2}>
                <Card>
                  <CardContent className='p-6'>
                    <div className='space-y-6'>
                      <h3 className='text-2xl font-bold'>Personal Interests</h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <InterestCard
                          title='Film & Music Enthusiast'
                          description='I enjoy watching films and listening to music as a way to relax and find creative inspiration.'
                        />
                        <InterestCard
                          title='Exploring New Technologies'
                          description='I’m always curious about emerging tech trends and enjoy experimenting with new tools, frameworks, and programming languages.'
                        />
                        <InterestCard
                          title='Personal Projects'
                          description='In my free time, I work on side projects to apply what I’ve learned and explore new ideas in real-world scenarios.'
                        />
                        <InterestCard
                          title='UI/UX Design Exploration'
                          description='I have a growing interest in UI/UX design and often spend time analyzing great digital products to better understand user behavior and interface aesthetics.'
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  icon,
  date,
  title,
  subtitle,
  description,
  details
}: {
  icon: React.ReactNode
  date: string
  title: string
  subtitle: string
  description: string
  details: string[]
}) {
  return (
    <div className='relative'>
      <div className='absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'>
        {icon}
      </div>
      <div className='space-y-2'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
          <div>
            <h4 className='text-lg font-semibold'>{title}</h4>
            <p className='text-sm text-muted-foreground italic'>{subtitle}</p>
          </div>
          <div className='px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>{date}</div>
        </div>
        <p className='text-muted-foreground'>{description}</p>
        <ul className='mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground'>
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function InterestCard({ title, description }: { title: string; description: string }) {
  return (
    <div className='p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors duration-200'>
      <h4 className='font-semibold mb-2'>{title}</h4>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}
