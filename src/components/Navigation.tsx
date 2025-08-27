'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'
import {
  Search,
  Menu,
  X,
  Globe,
  BookOpen,
  User,
  LogOut,
  Bell,
  Heart,
  ChevronDown
} from 'lucide-react'

export default function Navigation() {
  // Fixed: Removed duplicate session and router declarations
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { searchQuery, setSearchQuery } = useAppStore()

  // Toggle mobile menu function
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
              aria-label="Go to Ailesglobal homepage"
            >
              <Image
                src="/logoglobal.png"
                width={300}
                height={300}
                alt="logo"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs, universities, scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Link 
                href="/search" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center"
              >
                Programs
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/programs/united-states" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">🇺🇸 United States</Link>
                <Link href="/programs/united-kingdom" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">🇬🇧 United Kingdom</Link>
                <Link href="/programs/canada" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">🇨🇦 Canada</Link>
                <Link href="/programs/germany" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">🇩🇪 Germany</Link>
                <div className="border-t border-gray-200 my-2"></div>
                <Link href="/search" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">All Programs</Link>
              </div>
            </div>
            <Link 
              href="/scholarships" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Scholarships
            </Link>
            <div className="relative group">
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center"
              >
                Services
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/consultation" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Free Consultation</Link>
                <Link href="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">All Services</Link>
                <Link href="/success-stories" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Success Stories</Link>
              </div>
            </div>
            
            {session ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4 mr-3" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/applications"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <BookOpen className="h-4 w-4 mr-3" />
                          My Applications
                        </Link>
                        <Link
                          href="/dashboard/saved"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Heart className="h-4 w-4 mr-3" />
                          Saved Programs
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-200 py-2">
                        <button
                          onClick={() => {
                            signOut()
                            setShowUserMenu(false)
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => signIn()}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push('/auth/signup')}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link 
                href="/search" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Programs
              </Link>
              <Link 
                href="/scholarships" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Scholarships
              </Link>
              <Link 
                href="/universities" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Universities
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Welcome, {session.user?.name || session.user?.email}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        signOut()
                        toggleMenu()
                      }}
                      className="w-full justify-center"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="px-4 py-2 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      signIn()
                      toggleMenu()
                    }}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      router.push('/auth/signup')
                      toggleMenu()
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