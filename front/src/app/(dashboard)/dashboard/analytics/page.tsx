'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

import { ActivityChart } from '../../_components/activity-chart'
import { IssuesByTypeChart } from '../../_components/issues-by-type-chart'
import { PageHeader } from '../../_components/page-header'
import { RepositoryStatsTable } from '../../_components/repository-stats-table'
import { TopIssuesList } from '../../_components/top-issues-list'
import {
  MOCK_ACTIVITY_DATA,
  MOCK_ISSUES_BY_TYPE,
  MOCK_REPO_STATS,
  MOCK_TOP_ISSUES,
} from '../../_lib/mock-data'

type TimeRange = '7d' | '30d' | '90d'

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')

  const filteredActivityData =
    timeRange === '7d'
      ? MOCK_ACTIVITY_DATA.slice(-7)
      : timeRange === '30d'
        ? MOCK_ACTIVITY_DATA
        : MOCK_ACTIVITY_DATA

  return (
    <>
      <PageHeader
        title='Analytics'
        description='Detailed insights into your code review metrics.'
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='mb-6 flex gap-1'
      >
        {timeRangeOptions.map((option) => (
          <Button
            key={option.value}
            variant={timeRange === option.value ? 'secondary' : 'ghost'}
            size='sm'
            onClick={() => setTimeRange(option.value)}
            className={cn(
              'h-8 px-3 text-xs',
              timeRange === option.value && 'bg-primary/10 text-primary hover:bg-primary/20',
            )}
          >
            {option.label}
          </Button>
        ))}
      </motion.div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <div className='lg:col-span-2'>
          <ActivityChart data={filteredActivityData} />
        </div>

        <IssuesByTypeChart data={MOCK_ISSUES_BY_TYPE} />
        <TopIssuesList data={MOCK_TOP_ISSUES} />

        <div className='lg:col-span-2'>
          <RepositoryStatsTable data={MOCK_REPO_STATS} />
        </div>
      </div>
    </>
  )
}
