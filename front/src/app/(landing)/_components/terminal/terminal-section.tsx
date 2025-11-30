'use client'

import { useSectionReveal } from '@/app/(landing)/_hooks/use-section-reveal'
import { MotionDiv } from '@/components/motion'
import { motion } from 'framer-motion'
import { Container } from '../shared/container'
import { SectionDescription } from '../shared/section-description'
import { SectionHeading } from '../shared/section-heading'
import { TerminalDemo } from './terminal-demo'

export function TerminalSection() {
  const { ref, isInView } = useSectionReveal()

  return (
    <section ref={ref} className='bg-surface py-32'>
      <Container>
        <MotionDiv isInView={isInView}>
          <SectionHeading>Built for the terminal</SectionHeading>
          <SectionDescription>
            4 review modes that integrate with your existing workflow. No
            context switching, no web UI required.
          </SectionDescription>
        </MotionDiv>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mx-auto max-w-3xl'
        >
          <TerminalDemo isInView={isInView} />
        </motion.div>
      </Container>
    </section>
  )
}
