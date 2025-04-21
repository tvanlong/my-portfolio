'use client'

import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { PageTransition } from '@/components/page-transition'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <PageTransition>
        <main className='flex-1'>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
