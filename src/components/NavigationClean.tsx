'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Globe,
  GraduationCap,
  BookOpen,
  User,
  Settings,
  LogOut,
  Heart,
  FileText
} from 'lucide-react'

const countryFlags = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧', 
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Netherlands': '🇳🇱',
  'Sweden': '🇸🇪',
  'Switzerland': '🇨🇭',
  'Japan': '🇯🇵'
}

export default function NavigationNew() {
  const { data: session } = useSession()
  const router = useRouter()
  const { searchQuery, setSearchQuery, filteredPrograms } = useAppStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Group programs by country and field for mega menu
  const programsByCountry = filteredPrograms.reduce((acc, program) => {
    if (!acc[program.country]) {
      acc[program.country] = []
    }
    acc[program.country].push(program)
    return acc
  }, {} as Record<string, typeof filteredPrograms>)

  const programsByField = filteredPrograms.reduce((acc, program) => {
    if (!acc[program.field]) {
      acc[program.field] = []
    }
    acc[program.field].push(program)
    return acc
  }, {} as Record<string, typeof filteredPrograms>)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push('/search')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AilesTravel</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search programs, countries, or fields..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Programs Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProgramsOpen(true)}
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-primary-600 font-medium">
                Programs
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isProgramsOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* By Country */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        By Country
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(programsByCountry).slice(0, 6).map(([country, programs]) => (
                          <Link
                            key={country}
                            href={`/search?country=${encodeURIComponent(country)}`}
                            className="flex items-center justify-between text-sm text-gray-600 hover:text-primary-600 py-1"
                          >
                            <span className="flex items-center">
                              <span className="mr-2">{countryFlags[country as keyof typeof countryFlags] || '🌍'}</span>
                              {country}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {programs.length}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* By Field */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        By Field
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(programsByField).slice(0, 6).map(([field, programs]) => (
                          <Link
                            key={field}
                            href={`/search?field=${encodeURIComponent(field)}`}
                            className="flex items-center justify-between text-sm text-gray-600 hover:text-primary-600 py-1"
                          >
                            <span>{field}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {programs.length}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href="/search"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Programs
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            <Link href="/scholarships" className="text-gray-700 hover:text-primary-600 font-medium">
              Scholarships
            </Link>
            <Link href="/universities" className="text-gray-700 hover:text-primary-600 font-medium">
              Universities
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary-600 font-medium">
              Resources
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              {session ? (
                <Link href="/dashboard/saved" className="p-2 text-gray-700 hover:text-primary-600">
                  <Heart className="h-5 w-5" />
                </Link>
              ) : null}
            </div>

            {/* User Menu */}
            {session ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href="/dashboard/enhanced"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/applications"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <FileText className="h-4 w-4 mr-3" />
                        Applications
                      </Link>
                      <Link
                        href="/dashboard/saved"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Saved Programs
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={() => signOut()}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => signIn()}
                  variant="outline"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => signIn()}
                  size="sm"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                href="/search"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/scholarships"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Scholarships
              </Link>
              <Link
                href="/universities"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Universities
              </Link>
              <Link
                href="/resources"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>

              {session ? (
                <>
                  <Link
                    href="/dashboard/enhanced"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="px-4 py-2 space-y-2">
                  <Button
                    onClick={() => {
                      signIn()
                      setIsMenuOpen(false)
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      signIn()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
