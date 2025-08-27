import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can access analytics
    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d'
    const metric = searchParams.get('metric') || 'overview'

    // Generate mock analytics data based on period
    const analyticsData = generateAnalyticsData(period, metric)

    return NextResponse.json(analyticsData)

  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { event, properties } = await request.json()

    if (!event) {
      return NextResponse.json({ error: 'Event name required' }, { status: 400 })
    }

    // Track user activity
    const activity = {
      id: Math.random().toString(36).substr(2, 9),
      userId: session.user.id,
      event,
      properties: properties || {},
      timestamp: new Date().toISOString(),
      sessionId: session.user.id + '-' + Date.now(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    }

    // In production, save to analytics database or service
    console.log('Analytics Event:', activity)

    return NextResponse.json({ success: true, tracked: true })

  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

function generateAnalyticsData(period: string, metric: string) {
  const now = new Date()
  const daysMap = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 }
  const days = daysMap[period as keyof typeof daysMap] || 7

  switch (metric) {
    case 'overview':
      return {
        totalUsers: 2543 + Math.floor(Math.random() * 100),
        activeUsers: 1876 + Math.floor(Math.random() * 50),
        totalPrograms: 1247,
        activeApplications: 847 + Math.floor(Math.random() * 20),
        successRate: 34.2 + (Math.random() - 0.5) * 5,
        growth: {
          users: 12.5 + (Math.random() - 0.5) * 5,
          applications: 8.2 + (Math.random() - 0.5) * 3,
          views: 15.8 + (Math.random() - 0.5) * 4
        }
      }

    case 'users':
      return {
        userGrowth: Array.from({ length: days }, (_, i) => {
          const date = new Date(now.getTime() - (days - i) * 24 * 60 * 60 * 1000)
          return {
            date: date.toISOString().split('T')[0],
            newUsers: Math.floor(Math.random() * 20) + 5,
            activeUsers: Math.floor(Math.random() * 100) + 50,
            totalUsers: 2000 + i * 10 + Math.floor(Math.random() * 50)
          }
        }),

        demographics: {
          countries: [
            { country: 'India', users: 180, percentage: 28.5 },
            { country: 'China', users: 145, percentage: 22.9 },
            { country: 'Nigeria', users: 98, percentage: 15.5 },
            { country: 'Brazil', users: 76, percentage: 12.0 },
            { country: 'Others', users: 133, percentage: 21.1 }
          ],
          
          ageGroups: [
            { age: '18-22', users: 312, percentage: 49.3 },
            { age: '23-27', users: 198, percentage: 31.3 },
            { age: '28-32', users: 87, percentage: 13.7 },
            { age: '33+', users: 35, percentage: 5.5 }
          ]
        }
      }

    case 'programs':
      return {
        programPerformance: [
          { program: 'MIT Computer Science', views: 1240, applications: 89, acceptances: 23 },
          { program: 'Oxford MBA', views: 980, applications: 67, acceptances: 19 },
          { program: 'Stanford AI/ML', views: 890, applications: 78, acceptances: 26 },
          { program: 'Cambridge Medicine', views: 780, applications: 45, acceptances: 12 },
          { program: 'ETH Data Science', views: 650, applications: 52, acceptances: 18 }
        ],
        categoryDistribution: [
          { category: 'Computer Science', programs: 234, applications: 567 },
          { category: 'Business/MBA', programs: 189, applications: 432 },
          { category: 'Engineering', programs: 156, applications: 398 },
          { category: 'Medicine', programs: 98, applications: 234 },
          { category: 'Arts & Humanities', programs: 87, applications: 176 }
        ]
      }

    case 'applications':
      return {
        applicationTrends: Array.from({ length: days }, (_, i) => {
          const date = new Date(now.getTime() - (days - i) * 24 * 60 * 60 * 1000)
          return {
            date: date.toISOString().split('T')[0],
            submitted: Math.floor(Math.random() * 15) + 5,
            accepted: Math.floor(Math.random() * 5) + 1,
            rejected: Math.floor(Math.random() * 3) + 1,
            pending: Math.floor(Math.random() * 8) + 3
          }
        }),
        statusDistribution: [
          { status: 'Pending', count: 234, percentage: 45.2 },
          { status: 'Under Review', count: 156, percentage: 30.1 },
          { status: 'Accepted', count: 89, percentage: 17.2 },
          { status: 'Rejected', count: 39, percentage: 7.5 }
        ]
      }

    case 'engagement':
      return {
        userActivity: Array.from({ length: 24 }, (_, hour) => ({
          hour: hour.toString().padStart(2, '0'),
          sessions: Math.floor(Math.random() * 100) + 20,
          pageViews: Math.floor(Math.random() * 300) + 50
        })),
        topPages: [
          { page: '/dashboard', views: 12543, avgTime: '4:32' },
          { page: '/search', views: 9876, avgTime: '6:45' },
          { page: '/programs', views: 7654, avgTime: '3:21' },
          { page: '/scholarships', views: 5432, avgTime: '2:58' },
          { page: '/profile', views: 3210, avgTime: '2:14' }
        ]
      }

    default:
      return { error: 'Invalid metric' }
  }
}
