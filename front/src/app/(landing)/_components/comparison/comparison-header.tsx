'use client'

import { MotionDiv } from '@/components/motion'

interface ComparisonHeaderProps {
  isInView: boolean
}

export function ComparisonHeader({ isInView }: ComparisonHeaderProps) {
  return (
    <MotionDiv isInView={isInView}>
      <h2 className='mb-4 text-4xl text-balance text-foreground md:text-5xl'>
        Why Choose <span className='text-primary'>Bugless</span>?
      </h2>
      <p className='mx-auto max-w-2xl text-lg text-pretty text-text-secondary'>
        See how Bugless compares to other code review tools
      </p>
    </MotionDiv>
  )
}
