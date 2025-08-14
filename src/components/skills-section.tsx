'use client'

import type React from 'react'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Search,
  Smartphone,
  X,
  Filter,
  ChevronDown
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FadeIn } from '@/components/page-transition'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Skill = {
  name: string
  description?: string
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

const technicalSkills: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <Layout className='h-4 w-4' />,
    color: 'from-blue-500 to-cyan-500',
    skills: [{ name: 'React.js' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }, { name: 'Bootstrap' }]
  },
  {
    name: 'Backend',
    icon: <Server className='h-4 w-4' />,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: '.NET Core Web API' },
      { name: 'Laravel (Blade Template Engine)' }
    ]
  },
  {
    name: 'Database',
    icon: <Database className='h-4 w-4' />,
    color: 'from-purple-500 to-pink-500',
    skills: [{ name: 'MongoDB' }, { name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'MSSQL' }]
  },
  {
    name: 'Languages',
    icon: <Code className='h-4 w-4' />,
    color: 'from-yellow-500 to-orange-500',
    skills: [{ name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'PHP' }, { name: 'C#' }]
  },
  {
    name: 'Tools',
    icon: <GitBranch className='h-4 w-4' />,
    color: 'from-indigo-500 to-purple-500',
    skills: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'Postman' }]
  },
  {
    name: 'Mobile',
    icon: <Smartphone className='h-4 w-4' />,
    color: 'from-teal-500 to-green-500',
    skills: [{ name: 'Responsive Design' }, { name: 'Mobile-First' }]
  }
]

const softSkills: SkillCategory[] = [
  {
    name: 'Communication',
    icon: <Users className='h-4 w-4' />,
    color: 'from-blue-500 to-indigo-500',
    skills: [
      { name: 'Written Communication' },
      { name: 'Presentation Skills' },
      { name: 'Active Listening' },
      { name: 'Technical Documentation' }
    ]
  },
  {
    name: 'Problem Solving',
    icon: <Lightbulb className='h-4 w-4' />,
    color: 'from-yellow-500 to-amber-500',
    skills: [{ name: 'Critical Thinking' }, { name: 'Debugging' }, { name: 'Research' }]
  },
  {
    name: 'Teamwork',
    icon: <Users className='h-4 w-4' />,
    color: 'from-green-500 to-teal-500',
    skills: [{ name: 'Collaboration' }, { name: 'Communication' }]
  },
  {
    name: 'Adaptability',
    icon: <Globe className='h-4 w-4' />,
    color: 'from-rose-500 to-pink-500',
    skills: [
      { name: 'Learning New Technologies' },
      { name: 'Flexibility' },
      { name: 'Working Under Pressure' },
      { name: 'Adaptability to Change' }
    ]
  }
]

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('technical')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filterSkills = useCallback((skills: SkillCategory[], query: string) => {
    if (!query) return skills

    return skills
      .map((category) => ({
        ...category,
        skills: category.skills.filter((skill) => skill.name.toLowerCase().includes(query.toLowerCase()))
      }))
      .filter((category) => category.skills.length > 0)
  }, [])

  const filteredTechnicalSkills = filterSkills(technicalSkills, searchQuery)
  const filteredSoftSkills = filterSkills(softSkills, searchQuery)

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value) {
      setSelectedCategory(null)
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
  }

  const hasActiveFilters = searchQuery || selectedCategory
  const currentSkills = activeTab === 'technical' ? filteredTechnicalSkills : filteredSoftSkills
  const allSkills = activeTab === 'technical' ? technicalSkills : softSkills

  return (
    <section id='skills' className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <FadeIn>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-2'
            >
              <Cpu className='h-3.5 w-3.5 mr-1.5' />
              My Expertise
            </motion.div>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                Skills & Expertise
              </h2>
              <p className='max-w-[900px] text-muted-foreground text-base md:text-xl/relaxed'>
                A comprehensive overview of my technical abilities and professional competencies.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className='max-w-6xl mx-auto'>
          <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <FadeIn delay={0.1}>
              <div className='flex flex-col space-y-4 mb-6 md:mb-8'>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <TabsList className='grid w-full sm:w-auto grid-cols-2 h-10'>
                    <TabsTrigger
                      value='technical'
                      className='data-[state=active]:bg-white data-[state=active]:text-foreground text-xs sm:text-sm'
                    >
                      <Code className='h-3.5 w-3.5 mr-1.5 hidden sm:inline' />
                      Technical
                    </TabsTrigger>
                    <TabsTrigger
                      value='soft'
                      className='data-[state=active]:bg-white data-[state=active]:text-foreground text-xs sm:text-sm'
                    >
                      <Users className='h-3.5 w-3.5 mr-1.5 hidden sm:inline' />
                      Soft Skills
                    </TabsTrigger>
                  </TabsList>

                  <div className='relative flex-1 sm:max-w-xs'>
                    <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <input
                      type='text'
                      placeholder='Search skills...'
                      className='w-full h-10 rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <Button
                            variant='ghost'
                            size='sm'
                            className='absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-destructive/10'
                            onClick={() => setSearchQuery('')}
                          >
                            <X className='h-3.5 w-3.5' />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className='space-y-3'>
                  {isMobile ? (
                    <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <div className='flex items-center justify-between'>
                        <CollapsibleTrigger asChild>
                          <Button variant='outline' size='sm' className='gap-2'>
                            <Filter className='h-3.5 w-3.5' />
                            Filter Categories
                            {selectedCategory && (
                              <Badge variant='secondary' className='ml-1'>
                                1
                              </Badge>
                            )}
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        {hasActiveFilters && (
                          <Button variant='ghost' size='sm' onClick={clearFilters} className='text-xs gap-1'>
                            <X className='h-3 w-3' />
                            Clear all
                          </Button>
                        )}
                      </div>
                      <CollapsibleContent className='mt-3'>
                        <div className='flex flex-wrap gap-2'>
                          {allSkills.map((category) => (
                            <Button
                              key={category.name}
                              variant={selectedCategory === category.name ? 'default' : 'outline'}
                              size='sm'
                              className='gap-1.5 text-xs'
                              onClick={() => handleCategoryClick(category.name)}
                            >
                              {category.icon}
                              {category.name}
                              <Badge variant='secondary' className='ml-1 px-1 h-4 text-[10px]'>
                                {category.skills.length}
                              </Badge>
                            </Button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-wrap gap-2'>
                        {allSkills.map((category) => (
                          <TooltipProvider key={category.name}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                                  size='sm'
                                  className='gap-1.5 group transition-all hover:scale-105'
                                  onClick={() => handleCategoryClick(category.name)}
                                >
                                  <div className={`p-0.5 rounded bg-gradient-to-r ${category.color} text-white`}>
                                    {category.icon}
                                  </div>
                                  {category.name}
                                  <Badge
                                    variant='secondary'
                                    className='ml-1 px-1.5 h-5 text-[10px] group-hover:bg-primary group-hover:text-primary-foreground transition-colors'
                                  >
                                    {category.skills.length}
                                  </Badge>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className='text-xs'>{category.skills.length} skills in this category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                      {hasActiveFilters && (
                        <Button variant='ghost' size='sm' onClick={clearFilters} className='gap-1.5'>
                          <X className='h-3.5 w-3.5' />
                          Clear filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {(searchQuery || selectedCategory) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='flex items-center gap-2 text-sm text-muted-foreground'
                    >
                      <span>Active filters:</span>
                      {searchQuery && (
                        <Badge variant='secondary' className='gap-1'>
                          Search: &quot;{searchQuery}&quot;
                          <button onClick={() => setSearchQuery('')}>
                            <X className='h-2.5 w-2.5' />
                          </button>
                        </Badge>
                      )}
                      {selectedCategory && (
                        <Badge variant='secondary' className='gap-1'>
                          {selectedCategory}
                          <button onClick={() => setSelectedCategory(null)}>
                            <X className='h-2.5 w-2.5' />
                          </button>
                        </Badge>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            <TabsContent value='technical' className='space-y-8 mt-0'>
              <FadeIn delay={0.2}>
                <Card className='border-0 shadow-xl bg-gradient-to-br from-background to-muted/20'>
                  <CardContent className='p-4 sm:p-6'>
                    <AnimatePresence mode='wait'>
                      {currentSkills.filter((category) => !selectedCategory || category.name === selectedCategory)
                        .length > 0 ? (
                        <motion.div
                          key='skills-grid'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'
                        >
                          {currentSkills
                            .filter((category) => !selectedCategory || category.name === selectedCategory)
                            .map((category, categoryIndex) => (
                              <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: categoryIndex * 0.05
                                }}
                                whileHover={{ scale: 1.02 }}
                                className='group relative p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all'
                              >
                                <div
                                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                                />

                                <div className='relative space-y-3'>
                                  <div className='flex items-center gap-2.5'>
                                    <div
                                      className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white shadow-md`}
                                    >
                                      {category.icon}
                                    </div>
                                    <div>
                                      <h3 className='font-semibold text-sm sm:text-base'>{category.name}</h3>
                                      <p className='text-xs text-muted-foreground'>
                                        {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                                      </p>
                                    </div>
                                  </div>

                                  <div className='space-y-2'>
                                    {category.skills.map((skill, skillIndex) => (
                                      <motion.div
                                        key={`${category.name}-${skill.name}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                          delay: categoryIndex * 0.05 + skillIndex * 0.02
                                        }}
                                        className='flex items-center justify-between gap-2 group/skill'
                                      >
                                        <Badge
                                          variant='secondary'
                                          className='flex-1 justify-between bg-muted/50 hover:bg-muted transition-colors py-1.5 px-2.5 text-xs sm:text-sm'
                                        >
                                          <span className='truncate'>{skill.name}</span>
                                        </Badge>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key='empty-state'
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className='flex flex-col items-center justify-center py-16 text-center'
                        >
                          <div className='p-4 rounded-full bg-muted/50 mb-4'>
                            <Sparkles className='h-8 w-8 text-muted-foreground' />
                          </div>
                          <h3 className='text-lg font-semibold mb-2'>No skills found</h3>
                          <p className='text-muted-foreground text-sm max-w-sm'>
                            {searchQuery ? `No skills matching "${searchQuery}"` : 'Try adjusting your filter criteria'}
                          </p>
                          {hasActiveFilters && (
                            <Button variant='outline' size='sm' onClick={clearFilters} className='mt-4 gap-2'>
                              <X className='h-3.5 w-3.5' />
                              Clear filters
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </FadeIn>
            </TabsContent>

            <TabsContent value='soft' className='space-y-8 mt-0'>
              <FadeIn delay={0.2}>
                <Card className='border-0 shadow-xl bg-gradient-to-br from-background to-muted/20'>
                  <CardContent className='p-4 sm:p-6'>
                    <AnimatePresence mode='wait'>
                      {currentSkills.filter((category) => !selectedCategory || category.name === selectedCategory)
                        .length > 0 ? (
                        <motion.div
                          key='skills-grid'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'
                        >
                          {currentSkills
                            .filter((category) => !selectedCategory || category.name === selectedCategory)
                            .map((category, categoryIndex) => (
                              <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: categoryIndex * 0.05
                                }}
                                whileHover={{ scale: 1.02 }}
                                className='group relative p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all'
                              >
                                <div
                                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                                />

                                <div className='relative space-y-3'>
                                  <div className='flex items-center gap-2.5'>
                                    <div
                                      className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white shadow-md`}
                                    >
                                      {category.icon}
                                    </div>
                                    <div>
                                      <h3 className='font-semibold text-sm sm:text-base'>{category.name}</h3>
                                      <p className='text-xs text-muted-foreground'>
                                        {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                                      </p>
                                    </div>
                                  </div>

                                  <div className='space-y-2'>
                                    {category.skills.map((skill, skillIndex) => (
                                      <motion.div
                                        key={`${category.name}-${skill.name}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                          delay: categoryIndex * 0.05 + skillIndex * 0.02
                                        }}
                                      >
                                        <Badge
                                          variant='secondary'
                                          className='flex items-center justify-between w-full bg-muted/50 hover:bg-muted transition-colors py-1.5 px-2.5 text-xs sm:text-sm'
                                        >
                                          <span className='truncate'>{skill.name}</span>
                                        </Badge>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key='empty-state'
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className='flex flex-col items-center justify-center py-16 text-center'
                        >
                          <div className='p-4 rounded-full bg-muted/50 mb-4'>
                            <Lightbulb className='h-8 w-8 text-muted-foreground' />
                          </div>
                          <h3 className='text-lg font-semibold mb-2'>No skills found</h3>
                          <p className='text-muted-foreground text-sm max-w-sm'>
                            {searchQuery ? `No skills matching "${searchQuery}"` : 'Try adjusting your filter criteria'}
                          </p>
                          {hasActiveFilters && (
                            <Button variant='outline' size='sm' onClick={clearFilters} className='mt-4 gap-2'>
                              <X className='h-3.5 w-3.5' />
                              Clear filters
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
