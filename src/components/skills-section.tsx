'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code,
  Database,
  Layout,
  Server,
  Lightbulb,
  Users,
  Sparkles,
  Globe,
  Cpu,
  GitBranch,
  Layers,
  Palette,
  Search,
  Shield,
  Zap,
  Smartphone
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FadeIn } from '@/components/page-transition'

type Skill = {
  name: string
  icon?: React.ReactNode
  color?: string
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const technicalSkills: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: <Layout className='h-4 w-4' />,
      skills: [{ name: 'React.js' }, { name: 'Next.js' }]
    },
    {
      name: 'Backend',
      icon: <Server className='h-4 w-4' />,
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: '.NET' },
        { name: 'Laravel' },
        { name: 'RESTful APIs' }
      ]
    },
    {
      name: 'Database',
      icon: <Database className='h-4 w-4' />,
      skills: [{ name: 'MongoDB' }, { name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'SQL' }]
    },
    {
      name: 'Languages',
      icon: <Code className='h-4 w-4' />,
      skills: [{ name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'Java' }, { name: 'PHP' }, { name: 'C#' }]
    },
    {
      name: 'DevOps',
      icon: <GitBranch className='h-4 w-4' />,
      skills: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'Vercel' }, { name: 'Netlify' }]
    },
    {
      name: 'Testing',
      icon: <Zap className='h-4 w-4' />,
      skills: [{ name: '...' }]
    },
    {
      name: 'Mobile',
      icon: <Smartphone className='h-4 w-4' />,
      skills: [{ name: 'Progressive Web Apps' }, { name: 'Responsive Design' }, { name: 'Mobile-First' }]
    },
    {
      name: 'UI/UX',
      icon: <Palette className='h-4 w-4' />,
      skills: [{ name: 'Figma' }]
    },
    {
      name: 'Performance',
      icon: <Cpu className='h-4 w-4' />,
      skills: [{ name: 'Lighthouse' }, { name: 'Code Splitting' }, { name: 'Lazy Loading' }]
    },
    {
      name: 'Security',
      icon: <Shield className='h-4 w-4' />,
      skills: [{ name: 'Authentication' }, { name: 'Authorization' }, { name: 'Data Encryption' }]
    },
    {
      name: 'SEO',
      icon: <Search className='h-4 w-4' />,
      skills: [{ name: 'Metadata Optimization' }]
    },
    {
      name: 'Other',
      icon: <Sparkles className='h-4 w-4' />,
      skills: [{ name: '...' }]
    }
  ]

  const softSkills: SkillCategory[] = [
    {
      name: 'Communication',
      icon: <Users className='h-4 w-4' />,
      skills: [
        { name: 'Written Communication' },
        { name: 'Verbal Communication' },
        { name: 'Presentation Skills' },
        { name: 'Active Listening' },
        { name: 'Technical Documentation' }
      ]
    },
    {
      name: 'Problem Solving',
      icon: <Lightbulb className='h-4 w-4' />,
      skills: [
        { name: 'Critical Thinking' },
        { name: 'Analytical Skills' },
        { name: 'Debugging' },
        { name: 'Troubleshooting' },
        { name: 'Research' },
        { name: 'Innovation' }
      ]
    },
    {
      name: 'Teamwork',
      icon: <Users className='h-4 w-4' />,
      skills: [{ name: 'Collaboration' }]
    },
    {
      name: 'Project Management',
      icon: <Layers className='h-4 w-4' />,
      skills: [
        { name: 'Time Management' },
        { name: 'Planning' },
        { name: 'Prioritization' },
        { name: 'Deadline Management' }
      ]
    },
    {
      name: 'Adaptability',
      icon: <Globe className='h-4 w-4' />,
      skills: [
        { name: 'Learning New Technologies' },
        { name: 'Flexibility' },
        { name: 'Working Under Pressure' },
        { name: 'Adaptability to Change' }
      ]
    }
  ]

  const filterSkills = (skills: SkillCategory[], query: string) => {
    if (!query) return skills

    return skills
      .map((category) => ({
        ...category,
        skills: category.skills.filter((skill) => skill.name.toLowerCase().includes(query.toLowerCase()))
      }))
      .filter((category) => category.skills.length > 0)
  }

  const filteredTechnicalSkills = filterSkills(technicalSkills, searchQuery)
  const filteredSoftSkills = filterSkills(softSkills, searchQuery)

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedCategory(null)
  }

  return (
    <section id='skills' className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <FadeIn>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mb-12'>
            <div className='inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2'>
              <Cpu className='h-3.5 w-3.5 mr-1.5' />
              My Expertise
            </div>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Skills & Expertise</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                A comprehensive overview of my technical abilities and professional competencies.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className='max-w-5xl mx-auto'>
          <Tabs defaultValue='technical' className='w-full'>
            <FadeIn delay={0.1}>
              <div className='flex flex-col space-y-4 mb-8'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger
                    value='technical'
                    className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                  >
                    Technical Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value='soft'
                    className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                  >
                    Soft Skills
                  </TabsTrigger>
                </TabsList>

                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <input
                    type='text'
                    placeholder='Search skills...'
                    className='w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <Button
                      variant='ghost'
                      size='sm'
                      className='absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0'
                      onClick={() => setSearchQuery('')}
                    >
                      <span className='sr-only'>Clear search</span>
                      <span className='text-lg'>×</span>
                    </Button>
                  )}
                </div>
              </div>
            </FadeIn>

            <TabsContent value='technical' className='space-y-8'>
              <FadeIn delay={0.2}>
                <div className='space-y-6'>
                  {/* Category filters */}
                  <div className='flex flex-wrap gap-2'>
                    {technicalSkills.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? 'default' : 'outline'}
                        size='sm'
                        className='gap-1.5'
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.icon}
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  {/* Skills display */}
                  <Card>
                    <CardContent className='p-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredTechnicalSkills
                          .filter((category) => !selectedCategory || category.name === selectedCategory)
                          .map((category) => (
                            <motion.div
                              key={category.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className='space-y-3'
                            >
                              <div className='flex items-center gap-2'>
                                <div className='p-1.5 rounded-full bg-primary/10 text-primary'>{category.icon}</div>
                                <h3 className='font-medium'>{category.name}</h3>
                              </div>
                              <div className='flex flex-wrap gap-1.5'>
                                {category.skills.map((skill) => (
                                  <Badge
                                    key={`${category.name}-${skill.name}`}
                                    variant='secondary'
                                    className='bg-muted hover:bg-muted/80 transition-colors'
                                  >
                                    {skill.name}
                                  </Badge>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                      </div>

                      {/* Empty state */}
                      {filteredTechnicalSkills.filter(
                        (category) => !selectedCategory || category.name === selectedCategory
                      ).length === 0 && (
                        <div className='flex flex-col items-center justify-center py-12 text-center'>
                          <Sparkles className='h-12 w-12 text-muted-foreground mb-4' />
                          <h3 className='text-lg font-medium mb-1'>No skills found</h3>
                          <p className='text-muted-foreground'>Try adjusting your search or filter criteria</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            </TabsContent>

            <TabsContent value='soft' className='space-y-8'>
              <FadeIn delay={0.2}>
                <div className='space-y-6'>
                  {/* Category filters */}
                  <div className='flex flex-wrap gap-2'>
                    {softSkills.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? 'default' : 'outline'}
                        size='sm'
                        className='gap-1.5'
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.icon}
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  {/* Skills display */}
                  <Card>
                    <CardContent className='p-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {filteredSoftSkills
                          .filter((category) => !selectedCategory || category.name === selectedCategory)
                          .map((category) => (
                            <motion.div
                              key={category.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className='space-y-3'
                            >
                              <div className='flex items-center gap-2'>
                                <div className='p-1.5 rounded-full bg-primary/10 text-primary'>{category.icon}</div>
                                <h3 className='font-medium'>{category.name}</h3>
                              </div>
                              <div className='flex flex-wrap gap-1.5'>
                                {category.skills.map((skill) => (
                                  <Badge
                                    key={`${category.name}-${skill.name}`}
                                    variant='secondary'
                                    className='bg-muted hover:bg-muted/80 transition-colors'
                                  >
                                    {skill.name}
                                  </Badge>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                      </div>

                      {/* Empty state */}
                      {filteredSoftSkills.filter((category) => !selectedCategory || category.name === selectedCategory)
                        .length === 0 && (
                        <div className='flex flex-col items-center justify-center py-12 text-center'>
                          <Lightbulb className='h-12 w-12 text-muted-foreground mb-4' />
                          <h3 className='text-lg font-medium mb-1'>No skills found</h3>
                          <p className='text-muted-foreground'>Try adjusting your search or filter criteria</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
