import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In production, fetch from database
    // For now, return mock notifications
    const notifications = [
      {
        id: '1',
        title: 'Application Deadline Approaching',
        message: 'MIT Computer Science application deadline is in 3 days',
        type: 'deadline',
        isRead: false,
        actionUrl: '/programs/mit-cs',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metadata: { programId: 'mit-cs', daysLeft: 3 }
      },
      {
        id: '2',
        title: 'New Scholarship Match',
        message: 'Found 3 new scholarships matching your profile',
        type: 'recommendation',
        isRead: false,
        actionUrl: '/scholarships',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        metadata: { count: 3 }
      },
      {
        id: '3',
        title: 'Document Processed',
        message: 'Your transcript has been analyzed and verified',
        type: 'document',
        isRead: true,
        actionUrl: '/dashboard/documents',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        metadata: { documentType: 'transcript', status: 'verified' }
      },
      {
        id: '4',
        title: 'Interview Scheduled',
        message: 'Oxford MBA interview scheduled for next week',
        type: 'interview',
        isRead: false,
        actionUrl: '/dashboard/interviews',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        metadata: { university: 'Oxford', program: 'MBA', date: '2025-08-12' }
      }
    ]

    return NextResponse.json({ notifications })

  } catch (error) {
    console.error('Fetch notifications error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
  const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { notificationId, action } = await request.json()

    if (!notificationId || !action) {
      return NextResponse.json({ error: 'Notification ID and action required' }, { status: 400 })
    }

    // In production, update database
    if (action === 'markRead') {
      // Mark notification as read
      await new Promise(resolve => setTimeout(resolve, 200))
      return NextResponse.json({ success: true })
    }

    if (action === 'markAllRead') {
      // Mark all notifications as read for user
      await new Promise(resolve => setTimeout(resolve, 500))
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Update notification error:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
  const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const notificationId = searchParams.get('id')

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 })
    }

    // In production, delete from database
    await new Promise(resolve => setTimeout(resolve, 200))

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete notification error:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
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

    // Only admins can send notifications (role may be absent from session.user)
    const userRole = (session.user as any)?.role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, message, type, targetUsers, actionUrl } = await request.json()

    if (!title || !message || !type) {
      return NextResponse.json({ error: 'Title, message and type are required' }, { status: 400 })
    }

    // In production, create notifications in database
    const notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      actionUrl,
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata: {}
    }

    // Simulate sending notifications
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true, 
      notification,
      sentTo: targetUsers?.length || 'all users'
    })

  } catch (error) {
    console.error('Send notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}
