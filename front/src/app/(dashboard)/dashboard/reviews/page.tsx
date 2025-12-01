'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FunnelSimple, MagnifyingGlass } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import { PageHeader } from '../../_components/page-header'
import { ReviewRow } from '../../_components/review-row'
import { MOCK_REVIEWS, type ReviewStatus } from '../../_lib/mock-data'

type FilterStatus = 'all' | ReviewStatus

const filterOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'failed', label: 'Failed' },
]

export default function ReviewsPage() {
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [search, setSearch] = useState('')

  const filteredReviews = MOCK_REVIEWS.filter((review) => {
    const matchesFilter = filter === 'all' || review.status === filter
    const matchesSearch =
      search === '' ||
      review.title.toLowerCase().includes(search.toLowerCase()) ||
      review.repository.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <>
      <PageHeader
        title='Reviews'
        description='View and manage your code reviews.'
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
      >
        <div className='relative'>
          <MagnifyingGlass
            size={16}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-text-muted'
          />
          <input
            type='text'
            placeholder='Search reviews...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              'h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-4 text-sm',
              'placeholder:text-text-muted',
              'transition-colors focus:border-primary focus:outline-none',
              'sm:w-64',
            )}
          />
        </div>

        <div className='flex items-center gap-2'>
          <FunnelSimple size={16} className='text-text-muted' />
          <div className='flex gap-1'>
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? 'secondary' : 'ghost'}
                size='sm'
                onClick={() => setFilter(option.value)}
                className={cn(
                  'h-8 px-3 text-xs',
                  filter === option.value && 'bg-primary/10 text-primary hover:bg-primary/20',
                )}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className='space-y-2'
      >
        {filteredReviews.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
            <p className='text-sm text-text-muted'>No reviews found</p>
          </div>
        ) : (
          filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ReviewRow review={review} />
            </motion.div>
          ))
        )}
      </motion.div>

      {filteredReviews.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mt-4 text-center text-xs text-text-muted'
        >
          Showing {filteredReviews.length} of {MOCK_REVIEWS.length} reviews
        </motion.p>
      )}
    </>
  )
}
