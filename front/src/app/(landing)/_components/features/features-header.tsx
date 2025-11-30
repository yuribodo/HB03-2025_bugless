'use client'

import { MotionDiv } from '@/components/motion'

interface FeaturesHeaderProps {
  isInView: boolean
}

export function FeaturesHeader({ isInView }: FeaturesHeaderProps) {
  return (
    <MotionDiv isInView={isInView} className='mb-12 text-center'>
      <span className='mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary'>
        Features
      </span>
      <h2 className='mb-4 text-4xl text-balance text-foreground md:text-5xl'>
        Catch bugs before they ship
      </h2>
      <p className='mx-auto max-w-2xl text-lg text-pretty text-text-secondary'>
        Everything you need to catch bugs before they catch you.
      </p>
    </MotionDiv>
  )
}
