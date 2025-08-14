'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  Briefcase,
  HelpCircle,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FadeIn } from '@/components/page-transition'

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reason: 'job'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })

      const result = await res.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
          reason: 'job'
        })

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        alert('Something went wrong: ' + result.message || 'Unknown error.')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, reason: value }))
  }

  const contactReasons = [
    { value: 'job', label: 'Job opportunity', icon: <Briefcase className='h-3.5 w-3.5 mr-1.5' /> },
    { value: 'project', label: 'Project collaboration', icon: <MessageSquare className='h-3.5 w-3.5 mr-1.5' /> },
    { value: 'question', label: 'General question', icon: <HelpCircle className='h-3.5 w-3.5 mr-1.5' /> },
    { value: 'other', label: 'Other', icon: <MoreHorizontal className='h-3.5 w-3.5 mr-1.5' /> }
  ]

  return (
    <section
      id='contact'
      className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/40 relative'
    >
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl'></div>
      </div>

      <div className='container px-4 md:px-6 relative z-10'>
        <FadeIn>
          <div className='flex flex-col items-center justify-center space-y-4 text-center mb-12'>
            <div className='space-y-2'>
              <div className='inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2'>
                <Mail className='h-3.5 w-3.5 mr-1.5' />
                Get Connected
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Get In Touch</h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi,
                I&apos;ll get back to you!
              </p>
            </div>
          </div>
        </FadeIn>

        <div className='grid md:grid-cols-[1fr_1.5fr] gap-8 max-w-5xl mx-auto'>
          <FadeIn delay={0.1}>
            <Card className='h-full card-hover'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <MessageSquare className='h-5 w-5 mr-2 text-primary' />
                  Contact Information
                </CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center group cursor-pointer transition-all duration-200 hover:bg-primary/5 p-3 rounded-lg'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-200'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='group-hover:text-primary transition-colors duration-200 font-medium'>Email</p>
                    <p className='text-muted-foreground'>longvan1173@gmail.com</p>
                  </div>
                </div>

                <div className='flex items-center group cursor-pointer transition-all duration-200 hover:bg-primary/5 p-3 rounded-lg'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-200'>
                    <Linkedin className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='group-hover:text-primary transition-colors duration-200 font-medium'>LinkedIn</p>
                    <div className='flex items-center text-muted-foreground'>
                      <span>linkedin.com/in/longvan1173</span>
                      <ExternalLink
                        onClick={() =>
                          window.open('https://www.linkedin.com/in/longvan1173', '_blank', 'noopener,noreferrer')
                        }
                        className='h-3.5 w-3.5 ml-1 opacity-70'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex items-center group cursor-pointer transition-all duration-200 hover:bg-primary/5 p-3 rounded-lg'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-200'>
                    <Github className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='group-hover:text-primary transition-colors duration-200 font-medium'>GitHub</p>
                    <div className='flex items-center text-muted-foreground'>
                      <span>github.com/tvanlong</span>
                      <ExternalLink
                        onClick={() => window.open('https://github.com/tvanlong', '_blank', 'noopener,noreferrer')}
                        className='h-3.5 w-3.5 ml-1 opacity-70'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex items-center group cursor-pointer transition-all duration-200 hover:bg-primary/5 p-3 rounded-lg'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-200'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='group-hover:text-primary transition-colors duration-200 font-medium'>Location</p>
                    <p className='text-muted-foreground'>Hanoi, Vietnam</p>
                  </div>
                </div>

                <div className='pt-4 flex flex-wrap gap-3'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full h-10 w-10 bg-background hover:bg-primary/10 hover:text-primary'
                  >
                    <Mail className='h-5 w-5' />
                    <span className='sr-only'>Email</span>
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full h-10 w-10 bg-background hover:bg-primary/10 hover:text-primary'
                    onClick={() =>
                      window.open('https://www.linkedin.com/in/longvan1173', '_blank', 'noopener,noreferrer')
                    }
                  >
                    <Linkedin className='h-5 w-5' />
                    <span className='sr-only'>LinkedIn</span>
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full h-10 w-10 bg-background hover:bg-primary/10 hover:text-primary'
                    onClick={() => window.open('https://github.com/tvanlong', '_blank', 'noopener,noreferrer')}
                  >
                    <Github className='h-5 w-5' />
                    <span className='sr-only'>GitHub</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className='h-full card-hover'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Send className='h-5 w-5 mr-2 text-primary' />
                  Send Me a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className='rounded-full bg-primary/10 p-4 text-primary mb-6'
                    >
                      <CheckCircle className='h-10 w-10' />
                    </motion.div>
                    <h3 className='text-xl font-semibold mb-2'>Message Sent!</h3>
                    <p className='text-muted-foreground max-w-md'>
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                          id='name'
                          name='name'
                          placeholder='Your name'
                          value={formState.name}
                          onChange={handleChange}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && <p className='text-sm text-destructive'>{errors.name}</p>}
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          placeholder='your.email@example.com'
                          value={formState.email}
                          onChange={handleChange}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && <p className='text-sm text-destructive'>{errors.email}</p>}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='reason'>Reason for contact</Label>
                      <RadioGroup
                        value={formState.reason}
                        onValueChange={handleRadioChange}
                        className='flex flex-wrap gap-2 pt-1'
                      >
                        {contactReasons.map((reason) => (
                          <div key={reason.value} className='flex items-center'>
                            <RadioGroupItem value={reason.value} id={reason.value} className='peer sr-only' />
                            <Label
                              htmlFor={reason.value}
                              className='flex items-center justify-center px-3 py-1.5 text-sm border rounded-full peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary cursor-pointer'
                            >
                              {reason.icon}
                              {reason.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='subject'>Subject</Label>
                      <Input
                        id='subject'
                        name='subject'
                        placeholder='What is this regarding?'
                        value={formState.subject}
                        onChange={handleChange}
                        className={errors.subject ? 'border-destructive' : ''}
                      />
                      {errors.subject && <p className='text-sm text-destructive'>{errors.subject}</p>}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='message'>Message</Label>
                      <Textarea
                        id='message'
                        name='message'
                        placeholder='Your message...'
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && <p className='text-sm text-destructive'>{errors.message}</p>}
                    </div>
                  </form>
                )}
              </CardContent>
              {!isSubmitted && (
                <CardFooter>
                  <Button onClick={handleSubmit} className='w-full' disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className='flex items-center gap-2'>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                          className='h-4 w-4 border-2 border-current border-t-transparent rounded-full'
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className='flex items-center gap-2'>
                        <Send className='h-4 w-4' />
                        Send Message
                      </span>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
