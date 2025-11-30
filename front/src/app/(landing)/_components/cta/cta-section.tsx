'use client'

import { MotionDiv } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { useSectionReveal } from '../../_hooks/use-section-reveal'
import { Container } from '../shared/container'

export function CTASection() {
  const { ref, isInView } = useSectionReveal()

  return (
    <section ref={ref} className='border-t py-24'>
      <Container className='text-center'>
        <MotionDiv isInView={isInView} className='mb-0'>
          <h2 className='mb-4 text-4xl text-foreground md:text-5xl'>
            Ready to catch more bugs?
          </h2>
          <p className='mx-auto mb-8 max-w-xl text-lg text-text-secondary'>
            Get started with Bugless for free
          </p>

          <Button>Get started</Button>
        </MotionDiv>
      </Container>
    </section>
  )
}
