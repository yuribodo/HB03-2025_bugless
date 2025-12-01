'use client'

import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className='mb-8'
    >
      <p className='text-sm text-text-secondary'>{today}</p>
      <h1 className='mt-1 text-2xl font-semibold tracking-tight lg:text-3xl'>
        {title}
      </h1>
      {description && (
        <p className='mt-2 text-text-secondary'>{description}</p>
      )}
    </motion.div>
  )
}
