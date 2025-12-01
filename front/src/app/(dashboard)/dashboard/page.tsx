import { ActivityChart } from '../_components/activity-chart'
import { KpiGrid } from '../_components/kpi-grid'
import { PageHeader } from '../_components/page-header'
import { MOCK_ACTIVITY_DATA, MOCK_KPIS, MOCK_USER } from '../_lib/mock-data'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title={`Welcome back, ${MOCK_USER.name.split(' ')[0]}`}
        description="Here's what's happening with your code reviews."
      />

      <div className='space-y-8'>
        <KpiGrid kpis={MOCK_KPIS} />
        <ActivityChart data={MOCK_ACTIVITY_DATA} />
      </div>
    </>
  )
}
