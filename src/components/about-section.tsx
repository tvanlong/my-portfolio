'use client'

import type React from 'react'

import { useState } from 'react'
import { GraduationCap, Briefcase, Download, User, Heart, Sparkles, Calendar, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FadeIn } from '@/components/page-transition'
import Image from 'next/image'

export function AboutSection() {
  const [activeTab, setActiveTab] = useState('bio')
  const [isDownloading, setIsDownloading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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
    } finally {
      setTimeout(() => setIsDownloading(false), 1000)
    }
  }

  const tabConfig = [
    { value: 'bio', label: 'Bio', icon: User },
    { value: 'education', label: 'Education', icon: GraduationCap },
    { value: 'experience', label: 'Experience', icon: Briefcase },
    { value: 'interests', label: 'Interests', icon: Heart }
  ]

  return (
    <section id='about' className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/40'>
      <div className='container px-4 md:px-6'>
        <FadeIn>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mb-12'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm'
            >
              <User className='h-3.5 w-3.5 mr-1.5' />
              My Background
            </motion.div>
            <div className='space-y-2 max-w-[900px]'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                About Me
              </h2>
              <p className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Get to know my background, experience, and what drives me.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className='max-w-5xl mx-auto'>
          <Tabs defaultValue='bio' value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <FadeIn delay={0.1}>
              <TabsList className='grid w-full grid-cols-2 sm:grid-cols-4 mb-8 h-auto p-1 bg-muted/50 backdrop-blur-sm'>
                {tabConfig.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className='data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 py-3 px-2 sm:px-4'
                    >
                      <Icon className='h-4 w-4 mr-1.5 hidden sm:inline-block' />
                      <span className='text-xs sm:text-sm'>{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </FadeIn>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value='bio' className='space-y-6 mt-0'>
                  <FadeIn delay={0.2}>
                    <Card className='border-0 shadow-lg bg-card/50 backdrop-blur-sm'>
                      <CardContent className='p-6 sm:p-8'>
                        <div className='grid lg:grid-cols-[1fr_300px] gap-8'>
                          <div className='space-y-6 order-2 lg:order-1'>
                            <div className='space-y-4'>
                              <h3 className='text-2xl sm:text-3xl font-bold flex items-center gap-2'>
                                About Me
                                <Sparkles className='h-5 w-5 text-primary animate-pulse' />
                              </h3>
                              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                                <p>
                                  I&apos;m a dedicated software developer with a solid foundation in computer science
                                  and a passion for building clean, user-friendly web applications. My journey began at
                                  20, experimenting with HTML and CSS to create simple web pages—and I&apos;ve been
                                  hooked ever since.
                                </p>
                                <p>
                                  During my academic years, I cultivated a full-stack mindset, gaining hands-on
                                  experience with both frontend and backend technologies. I value writing clean,
                                  maintainable code and constantly stay updated with modern tools, frameworks, and best
                                  practices.
                                </p>
                                <p>
                                  I&apos;m driven by a desire to solve real-world problems through technology and create
                                  meaningful digital experiences. My primary focus lies in web development, where I
                                  continue to grow and contribute with purpose.
                                </p>
                              </div>
                            </div>

                            <div className='pt-4 flex flex-col sm:flex-row gap-4'>
                              <Button
                                className='gap-2 group'
                                size='lg'
                                onClick={handleDownload}
                                disabled={isDownloading}
                              >
                                <Download
                                  className={`h-4 w-4 transition-transform ${isDownloading ? 'animate-bounce' : 'group-hover:translate-y-1'}`}
                                />
                                {isDownloading ? 'Downloading...' : 'Download Resume'}
                              </Button>
                            </div>
                          </div>

                          <div className='flex items-center justify-center order-1 lg:order-2'>
                            <motion.div
                              className='relative w-full max-w-[250px] lg:max-w-[300px] aspect-square'
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl' />
                              <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
                                {!imageLoaded && (
                                  <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse' />
                                )}
                                <Image
                                  src='/about.png'
                                  width={300}
                                  height={300}
                                  alt='About Me'
                                  className='object-cover w-full h-[350px]'
                                  onLoad={() => setImageLoaded(true)}
                                />
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                </TabsContent>

                <TabsContent value='education' className='space-y-6 mt-0'>
                  <FadeIn delay={0.2}>
                    <Card className='border-0 shadow-lg bg-card/50 backdrop-blur-sm'>
                      <CardContent className='p-6 sm:p-8'>
                        <div className='space-y-8'>
                          <h3 className='text-2xl sm:text-3xl font-bold flex items-center gap-2'>
                            Education Timeline
                            <GraduationCap className='h-6 w-6 text-primary' />
                          </h3>
                          <div className='relative'>
                            <div className='absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent' />
                            <div className='space-y-8 sm:space-y-10'>
                              <TimelineItem
                                icon={<GraduationCap className='h-5 w-5' />}
                                date='2021 - 2024'
                                title='BKACAD Academy of Technology'
                                subtitle='Information Technology'
                                location='Vietnam'
                                description='Specialized in software engineering and data structures.'
                                details={[
                                  'Data Structures & Algorithms',
                                  'Web Development',
                                  'Database Systems',
                                  'Software Engineering'
                                ]}
                                color='primary'
                              />
                              <TimelineItem
                                icon={<GraduationCap className='h-5 w-5' />}
                                date='2018 - 2021'
                                title='Ly Thuong Kiet High School'
                                subtitle='High School Diploma'
                                location='Vietnam'
                                description='Graduated with honors.'
                                details={['Mathematics', 'Physics', 'Computer Science']}
                                color='accent'
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                </TabsContent>

                <TabsContent value='experience' className='space-y-6 mt-0'>
                  <FadeIn delay={0.2}>
                    <Card className='border-0 shadow-lg bg-card/50 backdrop-blur-sm'>
                      <CardContent className='p-6 sm:p-8'>
                        <div className='space-y-8'>
                          <h3 className='text-2xl sm:text-3xl font-bold flex items-center gap-2'>
                            Work Experience
                            <Briefcase className='h-6 w-6 text-primary' />
                          </h3>
                          <div className='relative'>
                            <div className='absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent' />
                            <div className='space-y-8 sm:space-y-10'>
                              <TimelineItem
                                icon={<Briefcase className='h-5 w-5' />}
                                date='Apr. 2025 - Jul. 2025'
                                title='Frontend Developer'
                                subtitle='Simax Technology & Solutions JSC'
                                location='On-site'
                                description='Contributing to a public information portal using Next.js.'
                                details={[
                                  'Developed a public information portal using Next.js to enhance accessibility and performance.',
                                  'Migrated rendering logic from client-side to server-side, improving SEO and reducing initial load time.',
                                  'Integrated Directus (Headless CMS) to enable efficient, non-technical content management.',
                                  'Technologies: Next.js, TypeScript, PostgreSQL, Directus.'
                                ]}
                                color='primary'
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                </TabsContent>

                <TabsContent value='interests' className='space-y-6 mt-0'>
                  <FadeIn delay={0.2}>
                    <Card className='border-0 shadow-lg bg-card/50 backdrop-blur-sm'>
                      <CardContent className='p-6 sm:p-8'>
                        <div className='space-y-6'>
                          <h3 className='text-2xl sm:text-3xl font-bold flex items-center gap-2'>
                            Personal Interests
                            <Heart className='h-6 w-6 text-primary' />
                          </h3>
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <InterestCard
                              title='Film & Music Enthusiast'
                              description='I enjoy watching films and listening to music as a way to relax and find creative inspiration.'
                              icon='🎬'
                            />
                            <InterestCard
                              title='Exploring New Technologies'
                              description={`I'm always curious about emerging tech trends and enjoy experimenting with new tools, frameworks, and programming languages.`}
                              icon='🚀'
                            />
                            <InterestCard
                              title='Personal Projects'
                              description={`In my free time, I work on side projects to apply what I've learned and explore new ideas in real-world scenarios.`}
                              icon='💻'
                            />
                            <InterestCard
                              title='UI/UX Design Exploration'
                              description={`I have a growing interest in UI/UX design and often spend time analyzing great digital products to better understand user behavior and interface aesthetics.`}
                              icon='🎨'
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
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
  location,
  description,
  details,
  color = 'primary'
}: {
  icon: React.ReactNode
  date: string
  title: string
  subtitle: string
  location?: string
  description: string
  details: string[]
  color?: 'primary' | 'accent'
}) {
  return (
    <motion.div
      className='relative pl-10 sm:pl-14'
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`absolute left-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${
          color === 'primary' ? 'bg-primary' : 'bg-accent'
        } text-primary-foreground shadow-lg`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className='space-y-3'>
        <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-2'>
          <div className='space-y-1'>
            <h4 className='text-lg sm:text-xl font-semibold'>{title}</h4>
            <p className='text-sm sm:text-base text-muted-foreground italic'>{subtitle}</p>
            {location && (
              <div className='flex items-center gap-1 text-xs sm:text-sm text-muted-foreground'>
                <MapPin className='h-3 w-3' />
                {location}
              </div>
            )}
          </div>
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium whitespace-nowrap'>
            <Calendar className='h-3 w-3' />
            {date}
          </div>
        </div>
        <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>{description}</p>
        <motion.ul
          className='mt-3 space-y-2'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {details.map((detail, index) => (
            <motion.li
              key={index}
              className='flex items-start gap-2 text-xs sm:text-sm text-muted-foreground'
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <span className='text-primary mt-1.5 flex-shrink-0'>•</span>
              <span className='leading-relaxed'>{detail}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

function InterestCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className='h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80'>
        <CardContent className='p-5 sm:p-6'>
          <div className='flex items-start gap-4'>
            <motion.div
              className='text-3xl sm:text-4xl'
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <div className='space-y-2 flex-1'>
              <h4 className='font-semibold text-base sm:text-lg'>{title}</h4>
              <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
