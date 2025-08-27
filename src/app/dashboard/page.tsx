'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen,
  GraduationCap,
  Heart, 
  Star,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate, getDaysUntilDeadline } from '@/lib/utils'
import { Program } from '@/types'
import { mockPrograms } from '@/data/programs'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [savedPrograms, setSavedPrograms] = useState<Program[]>([])
  const [activeApplications, setActiveApplications] = useState<Program[]>([])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // In a real app, this would fetch from database
    // For demo, we'll simulate some saved programs
    const demoSavedPrograms = [
      mockPrograms[0], // MIT CS
      mockPrograms[1], // Oxford MBA  
      mockPrograms[4]  // ETH Zurich Data Science
    ]
    setSavedPrograms(demoSavedPrograms)
    
    // Simulate active applications
    const demoApplications = [
      mockPrograms[0], // MIT CS
      mockPrograms[3]  // Sydney Medicine
    ]
    setActiveApplications(demoApplications)
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const upcomingDeadlines = savedPrograms
    .filter(program => getDaysUntilDeadline(program.deadline) > 0)
    .sort((a, b) => getDaysUntilDeadline(a.deadline) - getDaysUntilDeadline(b.deadline))
    .slice(0, 3)

  const totalScholarshipValue = savedPrograms
    .reduce((sum, program) => sum + program.scholarshipAmount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session.user?.name || session.user?.email}!
              </h1>
              <p className="text-lg text-gray-600">
                Track your study abroad journey and manage your applications
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{savedPrograms.length}</p>
                <p className="text-sm text-gray-600">Saved Programs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeApplications.length}</p>
                <p className="text-sm text-gray-600">Active Applications</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalScholarshipValue)}
                </p>
                <p className="text-sm text-gray-600">Potential Scholarships</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Countries Explored</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Programs */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Saved Programs ({savedPrograms.length})
                  </h2>
                  <Link href="/search">
                    <Button variant="outline" size="sm">Find More Programs</Button>
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {savedPrograms.length > 0 ? (
                  <div className="space-y-4">
                    {savedPrograms.map(program => (
                      <SavedProgramCard key={program.id} program={program} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved programs yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring programs and save the ones you&apos;re interested in</p>
                    <Link href="/search">
                      <Button>Browse Programs</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Active Applications */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Active Applications ({activeApplications.length})
                </h2>
              </div>
              
              <div className="p-6">
                {activeApplications.length > 0 ? (
                  <div className="space-y-4">
                    {activeApplications.map(program => (
                      <ApplicationCard key={program.id} program={program} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active applications</h3>
                    <p className="text-gray-600">Your application progress will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                Upcoming Deadlines
              </h3>
              
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-3">
                  {upcomingDeadlines.map(program => (
                    <div key={program.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{program.name}</p>
                        <p className="text-xs text-gray-600">{formatDate(program.deadline)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {getDaysUntilDeadline(program.deadline)} days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No upcoming deadlines</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/search">
                  <Button variant="outline" className="w-full justify-start">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Find New Programs
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Scholarship Search
                </Button>
              </div>
            </div>

            {/* Tips & Resources */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Study Abroad Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">Start your applications early to avoid rushing</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">Research visa requirements for your target countries</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">Apply for multiple scholarships to increase your chances</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SavedProgramCard({ program }: { program: Program }) {
  const daysUntilDeadline = getDaysUntilDeadline(program.deadline)
  const isUrgent = daysUntilDeadline <= 30 && daysUntilDeadline > 0

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{program.country}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{program.field}</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{program.name}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span className={isUrgent ? 'text-orange-600 font-medium' : ''}>
              {formatDate(program.deadline)}
            </span>
          </div>
          {program.scholarshipAmount > 0 && (
            <div className="flex items-center space-x-1">
              <Award className="h-3 w-3" />
              <span>{formatCurrency(program.scholarshipAmount)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link href={`/programs/${program.id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </div>
    </div>
  )
}

function ApplicationCard({ program }: { program: Program }) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-blue-50 border-blue-200">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{program.country}</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{program.name}</h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs">In Progress</span>
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="h-3 w-3" />
            <span>Deadline: {formatDate(program.deadline)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button size="sm">Continue Application</Button>
      </div>
    </div>
  )
}
