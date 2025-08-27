'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import EnhancedAIChat from '@/components/EnhancedAIChat'
import SmartRecommendations from '@/components/SmartRecommendations'
import {
  User,
  BookOpen,
  Heart,
  Award,
  Bell,
  Calendar,
  TrendingUp,
  Plus,
  Filter,
  Search
} from 'lucide-react'

export default function EnhancedDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const { filteredPrograms } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data - replace with real data from your API
  const dashboardData = {
    stats: {
      totalApplications: 8,
      savedPrograms: 15,
      scholarshipsWon: 2,
      interviewsScheduled: 3
    },
    recentActivity: [
      { id: 1, type: 'application', title: 'MIT Computer Science Master\'s', action: 'Application submitted', date: '2 days ago', status: 'submitted' },
      { id: 2, type: 'interview', title: 'Oxford MBA Program', action: 'Interview scheduled', date: '1 week ago', status: 'scheduled' },
      { id: 3, type: 'scholarship', title: 'Merit Scholarship', action: 'Scholarship awarded', date: '2 weeks ago', status: 'awarded' },
      { id: 4, type: 'saved', title: 'Stanford AI Program', action: 'Program saved', date: '3 weeks ago', status: 'saved' }
    ],
    upcomingDeadlines: [
      { id: 1, program: 'Harvard Business School', deadline: '2025-03-15', daysLeft: 42 },
      { id: 2, program: 'Cambridge Engineering', deadline: '2025-04-01', daysLeft: 59 },
      { id: 3, program: 'ETH Zurich Computer Science', deadline: '2025-04-15', daysLeft: 73 }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'under-review': return 'bg-yellow-100 text-yellow-800'
      case 'interview': return 'bg-purple-100 text-purple-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application': return <BookOpen className="h-4 w-4" />
      case 'interview': return <Calendar className="h-4 w-4" />
      case 'scholarship': return <Award className="h-4 w-4" />
      case 'saved': return <Heart className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {session?.user?.name?.split(' ')[0] || 'Student'}!
                </h1>
                <p className="text-gray-600">
                  Track your applications and discover new opportunities
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push('/search')}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Find Programs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saved Programs</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.savedPrograms}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scholarships</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.scholarshipsWon}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.interviewsScheduled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'applications', name: 'Applications', icon: BookOpen },
              { id: 'saved', name: 'Saved Programs', icon: Heart },
              { id: 'profile', name: 'Profile', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* AI Recommendations */}
                <SmartRecommendations />

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Chart Placeholder */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Progress</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Progress visualization coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Application
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {dashboardData.recentActivity.filter(a => a.type === 'application').map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{app.title}</h4>
                          <p className="text-sm text-gray-600">Status: {app.action}</p>
                        </div>
                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Saved Programs</h3>
                  <Button
                    onClick={() => router.push('/search')}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Find More
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {filteredPrograms.slice(0, 5).map((program) => (
                    <div key={program.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{program.name}</h4>
                          <p className="text-sm text-gray-600">{program.country} • {program.field}</p>
                          {program.tuitionFee && (
                            <p className="text-sm text-primary-600 font-medium">
                              ${program.tuitionFee.toLocaleString()}/year
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={session?.user?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={session?.user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field of Interest</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                      <option>Computer Science</option>
                      <option>Business Administration</option>
                      <option>Engineering</option>
                      <option>Medicine</option>
                    </select>
                  </div>
                  <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {dashboardData.upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{deadline.program}</p>
                      <p className="text-xs text-gray-600">{deadline.deadline}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        deadline.daysLeft <= 30 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deadline.daysLeft} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/search')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Programs
                </Button>
                <Button
                  onClick={() => router.push('/scholarships')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Browse Scholarships
                </Button>
                <Button
                  onClick={() => router.push('/resources')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resources
                </Button>
              </div>
            </div>

            {/* AI Assistant Teaser */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-primary-200 p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get personalized recommendations and application guidance
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                >
                  Chat Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced AI Chat */}
      <EnhancedAIChat />
    </div>
  )
}
