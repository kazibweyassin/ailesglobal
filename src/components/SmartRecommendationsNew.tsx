'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAppStore, UserProfile } from '@/store/useAppStore'
import { Button } from '@/components/ui/Button'
import {
  Lightbulb,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  GraduationCap,
  Heart,
  Settings,
  X,
  Check
} from 'lucide-react'

export default function SmartRecommendations() {
  const { data: session } = useSession()
  const [showSettings, setShowSettings] = useState(false)
  
  const { 
    userProfile,
    recommendations,
    isLoadingRecommendations,
    updateUserProfile,
    getPersonalizedRecommendations,
    saveProgram
  } = useAppStore()

  useEffect(() => {
    if (session && userProfile) {
      getPersonalizedRecommendations()
    }
  }, [session, userProfile, getPersonalizedRecommendations])

  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    updateUserProfile(updates)
    setShowSettings(false)
    setTimeout(() => {
      getPersonalizedRecommendations()
    }, 500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50'
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 0.9) return 'Excellent Match'
    if (score >= 0.8) return 'Great Match'
    if (score >= 0.7) return 'Good Match'
    if (score >= 0.6) return 'Fair Match'
    return 'Consider Requirements'
  }

  if (!session) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <Lightbulb className="h-12 w-12 text-primary-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Get Personalized Recommendations
        </h3>
        <p className="text-gray-600 mb-4">
          Sign in to receive AI-powered program recommendations tailored to your profile
        </p>
        <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
          Sign In to Continue
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Recommendations</h2>
            <p className="text-gray-600">AI-powered program suggestions just for you</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowSettings(true)}
          className="flex items-center space-x-2"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </div>

      {!userProfile && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-primary-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-primary-900">Complete Your Profile</h4>
              <p className="text-sm text-primary-700">
                Add your academic background and preferences to get personalized recommendations
              </p>
            </div>
            <Button
              onClick={() => setShowSettings(true)}
              size="sm"
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Set Up Profile
            </Button>
          </div>
        </div>
      )}

      {isLoadingRecommendations && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoadingRecommendations && recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.program.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {rec.program.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {rec.program.university} • {rec.program.country}
                    </p>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(rec.score)}`}>
                    <Star className="h-3 w-3" />
                    <span>{Math.round(rec.score * 100)}%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {rec.program.degree}
                  </div>
                  {rec.program.tuitionFee && (
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${rec.program.tuitionFee.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className={`text-xs font-medium mb-3 ${getScoreColor(rec.score)}`}>
                  {getScoreLabel(rec.score)}
                </div>

                <div className="text-sm text-gray-700 mb-4">
                  <p className="font-medium mb-1">Why this matches:</p>
                  <p>{rec.reasoning}</p>
                </div>
              </div>

              <div className="px-6 pb-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => saveProgram(rec.program)}
                  className="flex items-center space-x-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoadingRecommendations && recommendations.length === 0 && userProfile && (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Recommendations Yet
          </h3>
          <p className="text-gray-600 mb-4">
            We&apos;re working on finding the perfect programs for you. Try updating your preferences or check back later.
          </p>
          <Button
            onClick={() => getPersonalizedRecommendations()}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            Refresh Recommendations
          </Button>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Profile Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Interest
                </label>
                <select
                  defaultValue={userProfile?.fieldOfInterest || ''}
                  onChange={(e) => handleProfileUpdate({ fieldOfInterest: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a field</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Arts & Design">Arts & Design</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Background
                </label>
                <textarea
                  defaultValue={userProfile?.academicBackground || ''}
                  onChange={(e) => handleProfileUpdate({ academicBackground: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Describe your educational background..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Goals
                </label>
                <textarea
                  defaultValue={userProfile?.careerGoals || ''}
                  onChange={(e) => handleProfileUpdate({ careerGoals: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="What are your career aspirations?"
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleProfileUpdate({})}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
