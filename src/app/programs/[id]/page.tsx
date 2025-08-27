'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { mockPrograms } from '@/data/programs'
import { 
  ArrowLeft,
  MapPin, 
  Calendar, 
  DollarSign,
  GraduationCap,
  Clock,
  Award,
  CheckCircle,
  Globe,
  Heart,
  HeartIcon,
  Users
} from 'lucide-react'
import { formatCurrency, formatDate, getDaysUntilDeadline } from '@/lib/utils'

export default function ProgramDetailsPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [isSaved, setIsSaved] = useState(false)
  
  const program = mockPrograms.find(p => p.id === params.id)
  
  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Program Not Found</h1>
          <p className="text-gray-600 mb-4">The program you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  const daysUntilDeadline = getDaysUntilDeadline(program.deadline)
  const isUrgent = daysUntilDeadline <= 30
  const isPassed = daysUntilDeadline < 0

  const handleSaveProgram = () => {
    if (!session) {
      // Redirect to login or show modal
      window.location.href = '/auth/signin'
      return
    }
    
    // In a real app, this would save to database
    setIsSaved(!isSaved)
    
    // Show toast notification (simplified)
    const message = isSaved ? 'Program removed from saved list' : 'Program saved successfully'
    alert(message)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/search">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Search</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{program.country}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">{program.field}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {program.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                {program.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={handleSaveProgram}
                className="flex items-center space-x-2"
              >
                {isSaved ? (
                  <HeartIcon className="h-4 w-4 fill-current text-red-500" />
                ) : (
                  <Heart className="h-4 w-4" />
                )}
                <span>{isSaved ? 'Saved' : 'Save Program'}</span>
              </Button>
              
              {!isPassed && (
                <Button className="flex items-center space-x-2">
                  <span>Apply Now</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Program Overview</h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {program.university && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-medium text-gray-900">{program.university}</p>
                    </div>
                  </div>
                )}
                
                {program.duration && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">{program.duration}</p>
                    </div>
                  </div>
                )}
                
                {program.language && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Globe className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="font-medium text-gray-900">{program.language}</p>
                    </div>
                  </div>
                )}
                
                {program.tuitionFee !== undefined && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <DollarSign className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tuition Fee</p>
                      <p className="font-medium text-gray-900">
                        {program.tuitionFee === 0 ? 'Free' : formatCurrency(program.tuitionFee)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Eligibility Requirements */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility Requirements</h2>
              <div className="space-y-3">
                {program.eligibility.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Steps */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Application Process</h2>
              <div className="space-y-4">
                {program.applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Application Deadline</span>
                  <span className={`font-medium ${isUrgent ? 'text-red-600' : isPassed ? 'text-gray-400' : 'text-gray-900'}`}>
                    {formatDate(program.deadline)}
                  </span>
                </div>
                
                {daysUntilDeadline >= 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Days Remaining</span>
                    <span className={`font-medium ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                      {daysUntilDeadline} days
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Field of Study</span>
                  <span className="font-medium text-gray-900">{program.field}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium text-gray-900">{program.country}</span>
                </div>
              </div>
            </div>

            {/* Scholarship Info */}
            {program.scholarshipAmount > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Scholarship Available</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(program.scholarshipAmount)}
                </p>
                <p className="text-green-700 text-sm">
                  Merit-based scholarship available for qualified students
                </p>
              </div>
            )}

            {/* Deadline Warning */}
            {isUrgent && !isPassed && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold text-red-900">Deadline Alert</h3>
                </div>
                <p className="text-red-700 text-sm">
                  Only {daysUntilDeadline} days left to apply. Don&apos;t miss this opportunity!
                </p>
              </div>
            )}

            {isPassed && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Application Closed</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  The application deadline for this program has passed.
                </p>
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Need Help?</h3>
              </div>
              <p className="text-blue-700 text-sm mb-3">
                Have questions about this program? Our AI chat advisor can help!
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Ask AI Advisor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
