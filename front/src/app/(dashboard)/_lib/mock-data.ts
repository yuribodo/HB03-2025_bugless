// User
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'hobby' | 'pro' | 'team'
}

export const MOCK_USER: User = {
  id: '1',
  name: 'John Developer',
  email: 'john@example.com',
  plan: 'pro',
}

// KPI Data
export interface KpiData {
  id: string
  title: string
  value: string | number
  trend: number
  trendDirection: 'up' | 'down'
  icon: 'code' | 'bug' | 'clock' | 'shield'
  trendIsPositive: boolean
}

export const MOCK_KPIS: KpiData[] = [
  {
    id: 'total-reviews',
    title: 'Total Reviews',
    value: '1,284',
    trend: 12.5,
    trendDirection: 'up',
    icon: 'code',
    trendIsPositive: true,
  },
  {
    id: 'bugs-caught',
    title: 'Bugs Caught',
    value: 342,
    trend: 8.2,
    trendDirection: 'up',
    icon: 'bug',
    trendIsPositive: true,
  },
  {
    id: 'avg-review-time',
    title: 'Avg Review Time',
    value: '2.4s',
    trend: 15.3,
    trendDirection: 'down',
    icon: 'clock',
    trendIsPositive: true,
  },
  {
    id: 'security-issues',
    title: 'Security Issues',
    value: 28,
    trend: 22.1,
    trendDirection: 'down',
    icon: 'shield',
    trendIsPositive: true,
  },
]

// Activity Chart Data
export interface ActivityDataPoint {
  date: string
  reviews: number
  bugs: number
}

export const MOCK_ACTIVITY_DATA: ActivityDataPoint[] = [
  { date: 'Nov 01', reviews: 45, bugs: 12 },
  { date: 'Nov 02', reviews: 52, bugs: 15 },
  { date: 'Nov 03', reviews: 38, bugs: 8 },
  { date: 'Nov 04', reviews: 61, bugs: 18 },
  { date: 'Nov 05', reviews: 55, bugs: 14 },
  { date: 'Nov 06', reviews: 42, bugs: 11 },
  { date: 'Nov 07', reviews: 48, bugs: 13 },
  { date: 'Nov 08', reviews: 67, bugs: 21 },
  { date: 'Nov 09', reviews: 72, bugs: 19 },
  { date: 'Nov 10', reviews: 58, bugs: 16 },
  { date: 'Nov 11', reviews: 49, bugs: 12 },
  { date: 'Nov 12', reviews: 53, bugs: 14 },
  { date: 'Nov 13', reviews: 64, bugs: 17 },
  { date: 'Nov 14', reviews: 71, bugs: 20 },
  { date: 'Nov 15', reviews: 68, bugs: 18 },
  { date: 'Nov 16', reviews: 45, bugs: 10 },
  { date: 'Nov 17', reviews: 39, bugs: 9 },
  { date: 'Nov 18', reviews: 56, bugs: 15 },
  { date: 'Nov 19', reviews: 62, bugs: 17 },
  { date: 'Nov 20', reviews: 78, bugs: 22 },
  { date: 'Nov 21', reviews: 85, bugs: 24 },
  { date: 'Nov 22', reviews: 73, bugs: 19 },
  { date: 'Nov 23', reviews: 51, bugs: 13 },
  { date: 'Nov 24', reviews: 44, bugs: 11 },
  { date: 'Nov 25', reviews: 59, bugs: 16 },
  { date: 'Nov 26', reviews: 66, bugs: 18 },
  { date: 'Nov 27', reviews: 74, bugs: 21 },
  { date: 'Nov 28', reviews: 82, bugs: 23 },
  { date: 'Nov 29', reviews: 69, bugs: 17 },
  { date: 'Nov 30', reviews: 54, bugs: 14 },
]

// Navigation
export interface NavItem {
  id: string
  label: string
  href: string
  icon: 'house' | 'code' | 'chart-line' | 'folder' | 'gear' | 'bell'
  badge?: number
  disabled?: boolean
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', href: '/dashboard', icon: 'house' },
  { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: 'code' },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: 'chart-line',
  },
  {
    id: 'repositories',
    label: 'Repositories',
    href: '/dashboard/repositories',
    icon: 'folder',
    disabled: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon: 'bell',
    badge: 3,
    disabled: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'gear',
    disabled: true,
  },
]

// Reviews
export type ReviewStatus = 'completed' | 'in_progress' | 'failed'
export type ReviewMode = 'pr' | 'commit' | 'uncommitted' | 'custom'
export type ReviewPreset = 'standard' | 'security' | 'performance' | 'quick' | 'thorough'

export interface Review {
  id: string
  title: string
  repository: string
  branch: string
  status: ReviewStatus
  mode: ReviewMode
  preset: ReviewPreset
  issuesFound: number
  securityIssues: number
  performanceIssues: number
  reviewTime: string
  createdAt: string
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    title: 'feat: add user authentication flow',
    repository: 'acme/web-app',
    branch: 'feature/auth',
    status: 'completed',
    mode: 'pr',
    preset: 'security',
    issuesFound: 5,
    securityIssues: 2,
    performanceIssues: 1,
    reviewTime: '3.2s',
    createdAt: '2024-11-30T14:32:00Z',
  },
  {
    id: '2',
    title: 'fix: resolve memory leak in useEffect',
    repository: 'acme/web-app',
    branch: 'fix/memory-leak',
    status: 'completed',
    mode: 'commit',
    preset: 'performance',
    issuesFound: 2,
    securityIssues: 0,
    performanceIssues: 2,
    reviewTime: '1.8s',
    createdAt: '2024-11-30T12:15:00Z',
  },
  {
    id: '3',
    title: 'refactor: extract API client module',
    repository: 'acme/backend',
    branch: 'refactor/api-client',
    status: 'completed',
    mode: 'pr',
    preset: 'standard',
    issuesFound: 8,
    securityIssues: 1,
    performanceIssues: 3,
    reviewTime: '4.1s',
    createdAt: '2024-11-30T10:45:00Z',
  },
  {
    id: '4',
    title: 'chore: update dependencies',
    repository: 'acme/web-app',
    branch: 'chore/deps',
    status: 'in_progress',
    mode: 'pr',
    preset: 'quick',
    issuesFound: 0,
    securityIssues: 0,
    performanceIssues: 0,
    reviewTime: '-',
    createdAt: '2024-11-30T09:20:00Z',
  },
  {
    id: '5',
    title: 'feat: implement dark mode toggle',
    repository: 'acme/design-system',
    branch: 'feature/dark-mode',
    status: 'completed',
    mode: 'uncommitted',
    preset: 'standard',
    issuesFound: 3,
    securityIssues: 0,
    performanceIssues: 1,
    reviewTime: '2.5s',
    createdAt: '2024-11-29T16:30:00Z',
  },
  {
    id: '6',
    title: 'fix: SQL injection vulnerability',
    repository: 'acme/backend',
    branch: 'fix/sql-injection',
    status: 'completed',
    mode: 'commit',
    preset: 'security',
    issuesFound: 1,
    securityIssues: 1,
    performanceIssues: 0,
    reviewTime: '1.2s',
    createdAt: '2024-11-29T14:00:00Z',
  },
  {
    id: '7',
    title: 'feat: add pagination to user list',
    repository: 'acme/admin-panel',
    branch: 'feature/pagination',
    status: 'failed',
    mode: 'pr',
    preset: 'thorough',
    issuesFound: 12,
    securityIssues: 3,
    performanceIssues: 4,
    reviewTime: '5.8s',
    createdAt: '2024-11-29T11:45:00Z',
  },
  {
    id: '8',
    title: 'docs: update API documentation',
    repository: 'acme/docs',
    branch: 'docs/api-update',
    status: 'completed',
    mode: 'custom',
    preset: 'quick',
    issuesFound: 0,
    securityIssues: 0,
    performanceIssues: 0,
    reviewTime: '0.8s',
    createdAt: '2024-11-29T09:00:00Z',
  },
]

// Analytics - Repository Stats
export interface RepoStats {
  repo: string
  reviews: number
  bugs: number
  security: number
  performance: number
}

export const MOCK_REPO_STATS: RepoStats[] = [
  { repo: 'acme/web-app', reviews: 456, bugs: 89, security: 12, performance: 34 },
  { repo: 'acme/backend', reviews: 312, bugs: 67, security: 23, performance: 18 },
  { repo: 'acme/mobile', reviews: 198, bugs: 45, security: 8, performance: 21 },
  { repo: 'acme/admin-panel', reviews: 156, bugs: 34, security: 5, performance: 12 },
  { repo: 'acme/design-system', reviews: 89, bugs: 12, security: 2, performance: 8 },
]

// Analytics - Issues by Type
export interface IssuesByType {
  type: string
  count: number
  color: string
}

export const MOCK_ISSUES_BY_TYPE: IssuesByType[] = [
  { type: 'Bugs', count: 342, color: '#ef4444' },
  { type: 'Security', count: 89, color: '#f59e0b' },
  { type: 'Performance', count: 124, color: '#8b5cf6' },
  { type: 'Style', count: 267, color: '#6b7280' },
]

// Analytics - Top Issues
export type IssueCategory = 'bug' | 'security' | 'performance' | 'style'

export interface TopIssue {
  id: string
  type: string
  count: number
  category: IssueCategory
}

export const MOCK_TOP_ISSUES: TopIssue[] = [
  { id: '1', type: 'Unused variables', count: 156, category: 'bug' },
  { id: '2', type: 'Missing error handling', count: 89, category: 'bug' },
  { id: '3', type: 'Console.log statements', count: 67, category: 'style' },
  { id: '4', type: 'SQL injection risk', count: 34, category: 'security' },
  { id: '5', type: 'N+1 query detected', count: 28, category: 'performance' },
  { id: '6', type: 'Hardcoded credentials', count: 23, category: 'security' },
  { id: '7', type: 'Memory leak potential', count: 19, category: 'performance' },
  { id: '8', type: 'Unhandled promise rejection', count: 45, category: 'bug' },
]
