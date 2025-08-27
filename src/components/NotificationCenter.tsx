'use client'

import { useState, useEffect } from 'react'
import { 
  Bell, 
  X, 
  Calendar, 
  FileText, 
  Star, 
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Notification {
  id: string
  title: string
  message: string
  type: 'deadline' | 'update' | 'recommendation' | 'system' | 'interview' | 'document'
  isRead: boolean
  actionUrl?: string
  createdAt: Date
  metadata?: any
}

interface NotificationCenterProps {
  userId?: string
}

export default function NotificationCenter({ userId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate fetching notifications
    fetchNotifications()
    
    // Set up real-time updates (in production, use WebSockets or SSE)
    const interval = setInterval(fetchNotifications, 30000) // Poll every 30 seconds
    
    return () => clearInterval(interval)
  }, [userId])

  useEffect(() => {
    const count = notifications.filter(n => !n.isRead).length
    setUnreadCount(count)
  }, [notifications])

  const fetchNotifications = async () => {
    // Simulated notifications data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Application Deadline Approaching',
        message: 'MIT Computer Science application deadline is in 3 days',
        type: 'deadline',
        isRead: false,
        actionUrl: '/programs/mit-cs',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        metadata: { programId: 'mit-cs', daysLeft: 3 }
      },
      {
        id: '2', 
        title: 'New Scholarship Match',
        message: 'Found 3 new scholarships matching your profile',
        type: 'recommendation',
        isRead: false,
        actionUrl: '/scholarships',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        metadata: { count: 3 }
      },
      {
        id: '3',
        title: 'Document Processed',
        message: 'Your transcript has been analyzed and verified',
        type: 'document',
        isRead: true,
        actionUrl: '/dashboard/documents',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        metadata: { documentType: 'transcript', status: 'verified' }
      },
      {
        id: '4',
        title: 'Interview Scheduled',
        message: 'Oxford MBA interview scheduled for next week',
        type: 'interview',
        isRead: false,
        actionUrl: '/dashboard/interviews',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        metadata: { university: 'Oxford', program: 'MBA', date: '2025-08-12' }
      }
    ]
    
    setNotifications(mockNotifications)
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    )
  }

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="w-5 h-5 text-red-500" />
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'recommendation':
        return <Star className="w-5 h-5 text-yellow-500" />
      case 'interview':
        return <Clock className="w-5 h-5 text-green-500" />
      case 'system':
        return <AlertCircle className="w-5 h-5 text-gray-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-50 border-gray-200'
    
    switch (type) {
      case 'deadline':
        return 'bg-red-50 border-red-200'
      case 'interview':
        return 'bg-green-50 border-green-200'
      case 'recommendation':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  ({unreadCount} unread)
                </span>
              )}
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(notification.type, notification.isRead)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              notification.isRead ? 'text-gray-600' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm mt-1 ${
                              notification.isRead ? 'text-gray-500' : 'text-gray-700'
                            }`}>
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-400">
                                {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                              </span>
                              
                              {notification.actionUrl && (
                                <a
                                  href={notification.actionUrl}
                                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  View <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-green-600"
                                title="Mark as read"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <a
                href="/dashboard/notifications"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
