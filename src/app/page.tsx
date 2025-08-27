'use client'

import Link from 'next/link'
import Image from 'next/image' 
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import { mockPrograms } from '@/data/programs'
import { 
  Search, 
  Globe, 
  Users, 
  Award,
  ArrowRight,
  Star,
  MapPin,
  PlayCircle,
  CheckCircle,
  TrendingUp,
  Clock,
  DollarSign,
  BookOpen,
  MessageCircle,
  Shield,
  Zap,
  Target,
  Heart,
  Sparkles,
  Filter,
  Calendar,
  GraduationCap,
  Compass,
  BarChart3,
  FileText,
  ChevronDown,
  Menu,
  X,
  Calculator,
  Plane,
  Map,
  Route,
  Navigation,
  Building2,
  Languages,
  Banknote
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

export default function Home() {
  // Global state from Zustand store
  const { 
    selectedCountry, 
    selectedField, 
    budgetRange, 
    isMenuOpen,
    filteredPrograms,
    featuredPrograms,
    setSelectedCountry, 
    setSelectedField, 
    setBudgetRange, 
    setIsMenuOpen,
    setPrograms,
    setFeaturedPrograms
  } = useAppStore()

  // Local component state
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  // Initialize programs data
  useEffect(() => {
    setPrograms(mockPrograms)
    setFeaturedPrograms(mockPrograms.slice(0, 3))
  }, [])
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      university: "MIT",
      image: "/testimonials/sarah.jpg",
      content: "AilesTravel's AI advisor helped me secure a $45,000 scholarship to MIT. The personalized guidance was incredible!",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Business Student",
      university: "Oxford University",
      image: "/testimonials/ahmed.jpg",
      content: "From application to visa - everything was seamless. Now studying my dream MBA at Oxford!",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Engineering Student", 
      university: "ETH Zurich",
      image: "/testimonials/maria.jpg",
      content: "The scholarship matching algorithm found opportunities I never knew existed. Saved me thousands!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Navigation with Mega Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/about" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="flex flex-col">
                <Image
                src="/logoglobal.png"
                width={200}
                height={200}
                alt="logo"
                />
                {/* <span className="text-xs text-gray-600 -mt-1">Study Abroad Specialists</span> */}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-secondary-600 transition-colors">
                  <span>Programs</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 z-50">
                  <div className="p-4">
                    <div className="space-y-2">
                      {['United States', 'United Kingdom', 'Canada', 'Germany'].map((country) => (
                        <Link key={country} href={`/programs/${country.toLowerCase().replace(' ', '-')}`} className="block text-sm text-gray-600 hover:text-secondary-600 py-1">
                          {country}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <Link href="/consultation" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
                        Free Consultation →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/scholarships" className="text-gray-700 hover:text-secondary-600 transition-colors">
                Scholarships
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-secondary-600 transition-colors">
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 z-50">
                  <div className="p-4">
                    <div className="space-y-2">
                      <Link href="/services" className="block text-sm text-gray-600 hover:text-secondary-600 py-1">
                        All Services
                      </Link>
                      <Link href="/services#education" className="block text-sm text-gray-600 hover:text-secondary-600 py-1">
                        Education Guidance
                      </Link>
                      <Link href="/services#tours" className="block text-sm text-gray-600 hover:text-secondary-600 py-1">
                        Educational Tours
                      </Link>
                      <Link href="/services#visa" className="block text-sm text-gray-600 hover:text-secondary-600 py-1">
                        Visa Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/success-stories" className="text-gray-700 hover:text-secondary-600 transition-colors">
                Success Stories
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search programs..." 
                className="bg-transparent outline-none text-sm flex-1"
                onChange={(e) => {
                  // You could implement debounced search here
                  console.log('Searching for:', e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Redirect to search page with query
                    window.location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`
                  }
                }}
              />
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Programs</h3>
                <div className="pl-4 space-y-2">
                  <Link href="/programs/united-states" className="block text-sm text-gray-600">United States</Link>
                  <Link href="/programs/united-kingdom" className="block text-sm text-gray-600">United Kingdom</Link>
                  <Link href="/programs/canada" className="block text-sm text-gray-600">Canada</Link>
                  <Link href="/programs/germany" className="block text-sm text-gray-600">Germany</Link>
                </div>
              </div>
              <Link href="/scholarships" className="block text-gray-700 hover:text-secondary-600">Scholarships</Link>
              <Link href="/services" className="block text-gray-700 hover:text-secondary-600">Services</Link>
              <Link href="/success-stories" className="block text-gray-700 hover:text-secondary-600">Success Stories</Link>
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary-500 to-secondary-500">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 pt-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.1, 1, 1.1],
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-100 rounded-full opacity-20"
          />
          
          {/* Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              className={`absolute ${
                i % 2 === 0 ? 'top-1/4' : 'bottom-1/4'
              } ${
                i % 3 === 0 ? 'left-1/4' : i % 3 === 1 ? 'right-1/4' : 'left-1/2'
              } w-4 h-4 bg-primary-400 rounded-full opacity-30`}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial="initial"
              animate={heroInView ? "animate" : "initial"}
              variants={staggerContainer}
              className="text-left"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-100 text-secondary-800 text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  #1 Complete Study Abroad Journey Platform
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Transform Your{' '}
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                with World-Class Education
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed"
              >
                Your complete <strong>educational journey partner</strong>. From university selection 
                to visa approval to arrival support, we handle every step of your 
                <strong>study abroad adventure</strong> with <strong>500+ partner universities</strong> globally.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link href="/search">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 text-lg font-semibold">
                    <span className="flex items-center space-x-2 relative z-10">
                      <Search className="h-5 w-5" />
                      <span>Find Your Program</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Button>
                </Link>
                
                <Button variant="outline" size="lg" className="group border-2 border-secondary-400 hover:border-secondary-600 hover:bg-secondary-50 px-8 py-4 text-lg font-semibold">
                  <PlayCircle className="h-5 w-5 mr-2 group-hover:text-secondary-600" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex items-center space-x-6 text-sm text-gray-600"
              >
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  <span>AI-powered matching</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  <span>24/7 support</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Interactive Elements */}
            <motion.div
              initial="initial"
              animate={heroInView ? "animate" : "initial"}
              variants={slideInRight}
              className="relative"
            >
              {/* Interactive Program Finder Widget */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
                  <h3 className="text-white font-semibold text-lg">Find Your Perfect Program</h3>
                  <p className="text-primary-100 text-sm">Get personalized recommendations in seconds</p>
                </div>
                <div className="p-6 space-y-4">
                  {/* Country Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Country</label>
                    <div className="relative">
                      <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      >
                        <option value="">Select a country</option>
                        <option value="United States">🇺🇸 United States</option>
                        <option value="United Kingdom">🇬🇧 United Kingdom</option>
                        <option value="Germany">🇩🇪 Germany</option>
                        <option value="Canada">🇨🇦 Canada</option>
                        <option value="Australia">🇦🇺 Australia</option>
                        <option value="France">🇫🇷 France</option>
                        <option value="Netherlands">🇳🇱 Netherlands</option>
                      </select>
                    </div>
                  </div>

                  {/* Field of Study */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                    <select 
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    >
                      <option value="">Select your field</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business">Business & Management</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medicine">Medicine & Health</option>
                      <option value="Arts">Arts & Humanities</option>
                      <option value="Social Sciences">Social Sciences</option>
                      <option value="Natural Sciences">Natural Sciences</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setBudgetRange([0, 25000])}
                        className={`bg-gray-50 hover:bg-secondary-50 rounded-lg p-3 text-center border-2 transition-colors ${
                          budgetRange && budgetRange[1] <= 25000 ? 'border-secondary-500 bg-secondary-50' : 'border-transparent'
                        }`}
                      >
                        <div className="text-lg font-bold text-secondary-600">$0 - $25K</div>
                        <div className="text-xs text-gray-500">Budget-friendly</div>
                      </button>
                      <button
                        onClick={() => setBudgetRange([25000, 100000])}
                        className={`bg-gray-50 hover:bg-primary-50 rounded-lg p-3 text-center border-2 transition-colors ${
                          budgetRange && budgetRange[0] >= 25000 ? 'border-primary-500 bg-primary-50' : 'border-transparent'
                        }`}
                      >
                        <div className="text-lg font-bold text-primary-600">$25K - $100K</div>
                        <div className="text-xs text-gray-500">Premium options</div>
                      </button>
                    </div>
                  </div>

                  {/* Find Programs Button */}
                  <Link href="/search">
                    <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3">
                      <span className="flex items-center justify-center space-x-2">
                        <Search className="h-5 w-5" />
                        <span>Find My Programs</span>
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </Button>
                  </Link>

                  {/* Quick Stats */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-secondary-600">{filteredPrograms.length}</div>
                        <div className="text-xs text-gray-500">Programs Found</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary-600">95%</div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                    <span className="text-white text-sm ml-4">AilesTravel Dashboard</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">AI Match Score</span>
                      <span className="text-2xl font-bold text-primary-600">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="bg-gradient-to-r from-primary-400 to-secondary-500 h-2 rounded-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary-600">127</div>
                        <div className="text-xs text-gray-500">Programs Found</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">$25K</div>
                        <div className="text-xs text-gray-500">Avg Scholarship</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-8 bg-white rounded-lg shadow-lg p-4 border-l-4 border-primary-500"
              >
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary-500" />
                  <span className="text-sm font-medium">Scholarship Matched!</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">$30,000 DAAD Scholarship</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border-l-4 border-secondary-500"
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-secondary-500" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Ready to help you!</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Logo Ticker */}
      <section className="py-12 bg-white  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600 text-sm uppercase tracking-wide font-medium">
              Trusted by students from 150+ countries
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Partner universities where our students study
            </p>
          </motion.div>
          
          {/* Logo Ticker Animation */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <motion.div
                animate={{ x: [0, -100 * 6] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                className="flex gap-16 items-center"
              >
                {/* First set of logos */}
                {[
                  { 
                    name: 'Harvard University', 
                    logo: 'https://logos-world.net/wp-content/uploads/2021/09/Harvard-University-Logo.png',
                    alt: 'Harvard University Logo'
                  },
                  { 
                    name: 'MIT', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg',
                    alt: 'MIT Logo'
                  },
                  { 
                    name: 'Oxford University', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg',
                    alt: 'Oxford University Logo'
                  },
                  { 
                    name: 'Cambridge University', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/University_of_Cambridge_coat_of_arms_official.svg',
                    alt: 'Cambridge University Logo'
                  },
                  { 
                    name: 'Stanford University', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg',
                    alt: 'Stanford University Logo'
                  },
                  { 
                    name: 'ETH Zurich', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/ETH_Zurich_Logo_black.svg',
                    alt: 'ETH Zurich Logo'
                  },
                  { 
                    name: 'University of Toronto', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/University_of_Toronto_Logo.svg',
                    alt: 'University of Toronto Logo'
                  },
                  { 
                    name: 'TU Munich', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Technical_University_of_Munich.svg',
                    alt: 'TU Munich Logo'
                  },
                  { 
                    name: 'Imperial College', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Imperial_College_London_crest.svg',
                    alt: 'Imperial College London Logo'
                  },
                  { 
                    name: 'Sorbonne', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Blason_paris_75.svg',
                    alt: 'Sorbonne University Logo'
                  },
                  { 
                    name: 'University of Tokyo', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/University_of_Tokyo_logo.svg',
                    alt: 'University of Tokyo Logo'
                  },
                  { 
                    name: 'NUS Singapore', 
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/1200px-NUS_coat_of_arms.svg.png',
                    alt: 'National University of Singapore Logo'
                  }
                ].map((university, index) => (
                  <div
                    key={`first-${university.name}`}
                    className="flex flex-col items-center justify-center min-w-[120px] group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg transition-all duration-300 border border-gray-100 p-2">
                      <img 
                        src={university.logo} 
                        alt={university.alt}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-sm font-bold text-gray-600">${university.name.split(' ')[0]}</span>`;
                          }
                        }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs font-medium text-center group-hover:text-gray-700 transition-colors duration-300">
                      {university.name}
                    </span>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  { 
                    name: 'Harvard University', 
                    logo: 'https://logos-world.net/wp-content/uploads/2021/09/Harvard-University-Logo.png',
                    alt: 'Harvard University Logo'
                  },
                  { 
                    name: 'MIT', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg',
                    alt: 'MIT Logo'
                  },
                  { 
                    name: 'Oxford University', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg',
                    alt: 'Oxford University Logo'
                  },
                  { 
                    name: 'Cambridge University', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/University_of_Cambridge_coat_of_arms_official.svg',
                    alt: 'Cambridge University Logo'
                  },
                  { 
                    name: 'Stanford University', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg',
                    alt: 'Stanford University Logo'
                  },
                  { 
                    name: 'ETH Zurich', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/ETH_Zurich_Logo_black.svg',
                    alt: 'ETH Zurich Logo'
                  },
                  { 
                    name: 'University of Toronto', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/University_of_Toronto_Logo.svg',
                    alt: 'University of Toronto Logo'
                  },
                  { 
                    name: 'TU Munich', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Technical_University_of_Munich.svg',
                    alt: 'TU Munich Logo'
                  },
                  { 
                    name: 'Imperial College', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Imperial_College_London_crest.svg',
                    alt: 'Imperial College London Logo'
                  },
                  { 
                    name: 'Sorbonne', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Blason_paris_75.svg',
                    alt: 'Sorbonne University Logo'
                  },
                  { 
                    name: 'University of Tokyo', 
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/University_of_Tokyo_logo.svg',
                    alt: 'University of Tokyo Logo'
                  },
                  { 
                    name: 'NUS Singapore', 
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/1200px-NUS_coat_of_arms.svg.png',
                    alt: 'National University of Singapore Logo'
                  }
                ].map((university, index) => (
                  <div
                    key={`second-${university.name}`}
                    className="flex flex-col items-center justify-center min-w-[120px] group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg transition-all duration-300 border border-gray-100 p-2">
                      <img 
                        src={university.logo} 
                        alt={university.alt}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-sm font-bold text-gray-600">${university.name.split(' ')[0]}</span>`;
                          }
                        }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs font-medium text-center group-hover:text-gray-700 transition-colors duration-300">
                      {university.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Gradient overlays for fade effect */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>

          {/* Statistics row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div className="group">
              <div className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">500+</div>
              <div className="text-sm text-gray-500">Partner Universities</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-secondary-600 group-hover:text-secondary-700 transition-colors">50+</div>
              <div className="text-sm text-gray-500">Countries</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">150+</div>
              <div className="text-sm text-gray-500">Study Fields</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-secondary-600 group-hover:text-secondary-700 transition-colors">95%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={featuresInView ? "animate" : "initial"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-secondary-600">AilesTravel</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with human expertise to provide 
              the most comprehensive study abroad platform in the world.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            animate={featuresInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "AI-Powered Matching",
                description: "Our advanced algorithm analyzes 50+ factors to find your perfect program match with 95% accuracy.",
                color: "bg-primary-100 text-primary-600",
                stats: "95% accuracy"
              },
              {
                icon: Shield,
                title: "Verified Programs",
                description: "All programs are verified and updated in real-time. No fake listings or outdated information.",
                color: "bg-primary-100 text-primary-600",
                stats: "100% verified"
              },
              {
                icon: Target,
                title: "Scholarship Discovery",
                description: "Access $500M+ in scholarships with personalized matching based on your profile.",
                color: "bg-secondary-100 text-secondary-600",
                stats: "$500M+ available"
              },
              {
                icon: Users,
                title: "Expert Guidance",
                description: "Get personalized advice from certified education counselors and AI assistants.",
                color: "bg-secondary-100 text-secondary-600",
                stats: "24/7 support"
              },
              {
                icon: Globe,
                title: "Global Network",
                description: "Partner with 500+ top universities across 50+ countries worldwide.",
                color: "bg-primary-100 text-primary-600",
                stats: "500+ partners"
              },
              {
                icon: TrendingUp,
                title: "Success Tracking",
                description: "Monitor your application progress with real-time updates and success predictions.",
                color: "bg-secondary-100 text-secondary-600",
                stats: "85% success rate"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-secondary-600">
                      {feature.stats}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-secondary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scholarship Hub Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Scholarship <span className="text-primary-600">Hub</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access over $500M in scholarships with our AI-powered matching system. 
              Find opportunities you never knew existed.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scholarship Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Eligibility Calculator</h3>
                  <p className="text-sm text-gray-600">Estimate your scholarship potential</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                  <input 
                    type="number" 
                    placeholder="3.5" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">TOEFL/IELTS Score</label>
                  <input 
                    type="number" 
                    placeholder="100" 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
                  Calculate Eligibility
                </Button>
                
                <div className="bg-white rounded-lg p-4 border border-primary-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">$28,500</div>
                    <div className="text-sm text-gray-600">Estimated scholarship amount</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scholarship Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-lg"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Available Scholarships</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "DAAD Germany Scholarship",
                      amount: "$30,000",
                      deadline: "Mar 15, 2025",
                      applicants: "234 applied",
                      match: 95,
                      country: "🇩🇪"
                    },
                    {
                      name: "Chevening UK Scholarship", 
                      amount: "$45,000",
                      deadline: "Apr 1, 2025",
                      applicants: "156 applied",
                      match: 88,
                      country: "🇬🇧"
                    },
                    {
                      name: "Fulbright US Scholarship",
                      amount: "$55,000", 
                      deadline: "May 20, 2025",
                      applicants: "89 applied",
                      match: 92,
                      country: "🇺🇸"
                    }
                  ].map((scholarship, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{scholarship.country}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{scholarship.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{scholarship.amount}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{scholarship.deadline}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{scholarship.applicants}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{scholarship.match}% Match</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                              style={{ width: `${scholarship.match}%` }}
                            />
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Apply</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Deadline Tracker</h4>
                      <p className="text-sm text-gray-600">Never miss an application deadline</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-primary-500 to-secondary-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Set Reminders
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={statsInView ? "animate" : "initial"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their study abroad dreams with AilesTravel
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            animate={statsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: "50,000+", label: "Students Helped", icon: Users },
              { number: "$2.5B+", label: "Scholarships Secured", icon: DollarSign },
              { number: "500+", label: "Partner Universities", icon: BookOpen },
              { number: "150+", label: "Countries Served", icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-secondary-100 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate={testimonialsInView ? "animate" : "initial"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students who transformed their futures with AilesTravel
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            animate={testimonialsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-secondary-600 font-medium">{testimonial.university}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Country/Destination Guides with Interactive Map */}
      <section className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Study <span className="text-secondary-600">Destinations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect country for your studies with comprehensive guides, 
              cost comparisons, and cultural insights.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Interactive World Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Map className="h-6 w-6 mr-3 text-secondary-600" />
                Interactive Destination Map
              </h3>

              {/* Simplified World Map Visualization */}
              <div className="relative bg-gradient-to-br from-blue-50 to-secondary-50 rounded-xl p-8 h-80 overflow-hidden">
                {/* Map Points */}
                {[
                  { country: 'USA', x: '25%', y: '35%', programs: 2450, color: 'bg-primary-500' },
                  { country: 'UK', x: '50%', y: '28%', programs: 1230, color: 'bg-secondary-500' },
                  { country: 'Germany', x: '55%', y: '32%', programs: 890, color: 'bg-primary-400' },
                  { country: 'Canada', x: '22%', y: '25%', programs: 750, color: 'bg-secondary-400' },
                  { country: 'Australia', x: '85%', y: '75%', programs: 650, color: 'bg-primary-600' },
                ].map((point, index) => (
                  <motion.div
                    key={point.country}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute group cursor-pointer"
                    style={{ left: point.x, top: point.y }}
                  >
                    <div className={`w-4 h-4 ${point.color} rounded-full animate-pulse`}>
                      <div className={`absolute inset-0 ${point.color} rounded-full animate-ping opacity-75`}></div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{point.country}</div>
                        <div className="text-sm text-gray-600">{point.programs} programs</div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-xs text-gray-500">
                  Click on countries to explore
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600">10,000+</div>
                  <div className="text-sm text-gray-600">Programs</div>
                </div>
              </div>
            </motion.div>

            {/* Destination Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  country: "United States",
                  flag: "🇺🇸",
                  programs: 2450,
                  avgCost: "$35,000/year",
                  topUnis: ["Harvard", "MIT", "Stanford"],
                  highlights: ["World-class research", "Diverse programs", "Strong alumni network"],
                  visaReq: "F-1 Student Visa",
                  language: "English"
                },
                {
                  country: "Germany", 
                  flag: "🇩🇪",
                  programs: 890,
                  avgCost: "$2,000/year",
                  topUnis: ["TU Munich", "Heidelberg", "Humboldt"],
                  highlights: ["Low tuition fees", "Strong engineering", "EU work opportunities"],
                  visaReq: "Student Visa",
                  language: "German/English"
                },
                {
                  country: "United Kingdom",
                  flag: "🇬🇧", 
                  programs: 1230,
                  avgCost: "$25,000/year",
                  topUnis: ["Oxford", "Cambridge", "Imperial"],
                  highlights: ["Historic universities", "1-year masters", "Global recognition"],
                  visaReq: "Student Visa",
                  language: "English"
                }
              ].map((destination, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{destination.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{destination.country}</h3>
                        <p className="text-sm text-gray-600">{destination.programs} programs available</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-secondary-600">{destination.avgCost}</div>
                      <div className="text-xs text-gray-500">Average cost</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Top Universities</div>
                      <div className="text-xs text-gray-600">{destination.topUnis.join(", ")}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Requirements</div>
                      <div className="text-xs text-gray-600">
                        <div>{destination.visaReq}</div>
                        <div>{destination.language}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Key Highlights</div>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, i) => (
                        <span key={i} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Country Guide
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary-500 to-secondary-500">
                      View Programs
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Cost Comparison Tool */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Cost of Living Comparison
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { country: "🇺🇸 USA", rent: "$1,200", food: "$400", transport: "$100", total: "$1,700" },
                { country: "🇬🇧 UK", rent: "$800", food: "$300", transport: "$80", total: "$1,180" },
                { country: "🇩🇪 Germany", rent: "$600", food: "$250", transport: "$60", total: "$910" },
                { country: "🇨🇦 Canada", rent: "$700", food: "$280", transport: "$70", total: "$1,050" }
              ].map((cost, index) => (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:border-secondary-300 transition-colors">
                  <div className="text-lg font-semibold mb-3">{cost.country}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rent:</span>
                      <span className="font-medium">{cost.rent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Food:</span>
                      <span className="font-medium">{cost.food}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transport:</span>
                      <span className="font-medium">{cost.transport}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-secondary-600">{cost.total}/month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started on your study abroad journey in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create Profile",
                description: "Tell us about your academic background, interests, and goals",
                icon: Users,
                color: "from-primary-400 to-primary-600"
              },
              {
                step: "02", 
                title: "AI Matching",
                description: "Our AI analyzes thousands of programs to find your perfect matches",
                icon: Zap,
                color: "from-secondary-400 to-secondary-600"
              },
              {
                step: "03",
                title: "Apply & Track",
                description: "Submit applications and track progress with real-time updates",
                icon: Target,
                color: "from-primary-400 to-primary-600"
              },
              {
                step: "04",
                title: "Study Abroad",
                description: "Get accepted and start your international education journey",
                icon: BookOpen,
                color: "from-orange-400 to-orange-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -z-10" />
                )}
                
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 shadow">
                  {step.step}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Journey Timeline Visualization */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Study Abroad <span className="text-primary-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate your path to international education with our comprehensive 
              timeline and milestone tracking system.
            </p>
          </motion.div>

          {/* Timeline Visualization */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-200 via-secondary-200 to-primary-200 hidden lg:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  phase: "Phase 1",
                  title: "Research & Discovery",
                  timeframe: "12-18 months before",
                  tasks: ["Explore programs", "Country research", "Budget planning", "Language requirements"],
                  icon: Search,
                  color: "from-blue-400 to-blue-600",
                  bgColor: "bg-blue-50",
                  textColor: "text-blue-600",
                  status: "completed"
                },
                {
                  phase: "Phase 2", 
                  title: "Preparation & Testing",
                  timeframe: "8-12 months before",
                  tasks: ["TOEFL/IELTS prep", "GRE/GMAT if needed", "Document collection", "Portfolio creation"],
                  icon: BookOpen,
                  color: "from-primary-400 to-primary-600",
                  bgColor: "bg-primary-50",
                  textColor: "text-primary-600",
                  status: "in-progress"
                },
                {
                  phase: "Phase 3",
                  title: "Applications & Essays", 
                  timeframe: "6-8 months before",
                  tasks: ["University applications", "Scholarship applications", "Personal statements", "Letters of recommendation"],
                  icon: FileText,
                  color: "from-secondary-400 to-secondary-600",
                  bgColor: "bg-secondary-50", 
                  textColor: "text-secondary-600",
                  status: "pending"
                },
                {
                  phase: "Phase 4",
                  title: "Decisions & Planning",
                  timeframe: "3-6 months before",
                  tasks: ["Acceptance letters", "Scholarship awards", "University selection", "Financial planning"],
                  icon: Award,
                  color: "from-green-400 to-green-600",
                  bgColor: "bg-green-50",
                  textColor: "text-green-600", 
                  status: "upcoming"
                },
                {
                  phase: "Phase 5",
                  title: "Visa & Logistics",
                  timeframe: "1-3 months before",
                  tasks: ["Visa application", "Accommodation booking", "Flight booking", "Pre-departure prep"],
                  icon: Plane,
                  color: "from-purple-400 to-purple-600",
                  bgColor: "bg-purple-50",
                  textColor: "text-purple-600",
                  status: "upcoming"
                },
                {
                  phase: "Phase 6",
                  title: "Departure & Arrival",
                  timeframe: "0-1 months",
                  tasks: ["Final preparations", "Departure", "University enrollment", "Settling in"],
                  icon: GraduationCap,
                  color: "from-orange-400 to-orange-600", 
                  bgColor: "bg-orange-50",
                  textColor: "text-orange-600",
                  status: "future"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className={`${item.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">{item.phase}</div>
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-green-100 text-green-700' :
                          item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.status === 'completed' ? '✓ Completed' :
                           item.status === 'in-progress' ? '⏳ In Progress' :
                           item.status === 'pending' ? '📋 Pending' : '📅 Upcoming'}
                        </div>
                      </div>

                      <div className={`text-sm font-medium ${item.textColor} mb-3`}>
                        {item.timeframe}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {item.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">Progress tracking available</div>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey Progress Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Track Your Progress
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Overall Progress */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48" cy="48" r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48" cy="48" r="40"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.35)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">35%</span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900">Overall Progress</h4>
                <p className="text-sm text-gray-600">2 of 6 phases completed</p>
              </div>

              {/* Next Milestone */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                  <FileText className="h-12 w-12 text-secondary-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Next Milestone</h4>
                <p className="text-sm text-gray-600">Submit applications</p>
                <p className="text-xs text-secondary-600 font-medium">Due in 45 days</p>
              </div>

              {/* Deadline Alert */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="h-12 w-12 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Urgent Deadline</h4>
                <p className="text-sm text-gray-600">TOEFL registration</p>
                <p className="text-xs text-red-600 font-medium">Due in 12 days</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
                <Route className="h-5 w-5 mr-2" />
                View Full Timeline
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Programs Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover popular study abroad opportunities with generous scholarships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                country: "United States",
                university: "MIT",
                program: "Computer Science Master's",
                scholarship: "$25,000",
                rating: 4.9,
                deadline: "Mar 15, 2025",
                image: "/programs/mit.jpg",
                flag: "🇺🇸"
              },
              {
                country: "United Kingdom", 
                university: "Oxford",
                program: "International Business MBA",
                scholarship: "$35,000",
                rating: 4.8,
                deadline: "Apr 30, 2025",
                image: "/programs/oxford.jpg",
                flag: "🇬🇧"
              },
              {
                country: "Germany",
                university: "TU Berlin", 
                program: "Mechanical Engineering PhD",
                scholarship: "$18,000",
                rating: 4.7,
                deadline: "Feb 28, 2025",
                image: "/programs/berlin.jpg",
                flag: "🇩🇪"
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="text-2xl">{program.flag}</span>
                    <span className="text-sm font-medium text-gray-700 bg-white/90 px-2 py-1 rounded-full">
                      {program.country}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {program.scholarship} Scholarship
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {program.program}
                    </h3>
                    <p className="text-secondary-600 font-semibold">
                      {program.university}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">
                        {program.rating}/5
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Deadline: {program.deadline}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="group-hover:border-secondary-600 group-hover:text-secondary-600">
                      Learn More
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/search">
              <Button size="lg" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 px-8 py-4 text-lg font-semibold">
                <span className="flex items-center space-x-2">
                  <span>View All Programs</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Showcase */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Your <span className="text-primary-600">AI Study Advisor</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get 24/7 personalized guidance from our advanced AI assistant. From program selection 
              to application preparation, we're here to help every step of the way.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* AI Chat Interface Demo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Study Advisor</h3>
                    <p className="text-primary-100 text-sm">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {/* Sample conversation */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm looking for Computer Science Master's programs in Europe with good scholarships. Can you help?
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 justify-end">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-white">
                      Absolutely! Based on your profile, I found 23 perfect matches. Here are the top 3 programs:
                      <br /><br />
                      🇩🇪 TU Munich - 95% match, €2,000/year<br />
                      🇳🇱 TU Delft - 92% match, €15,000/year<br />
                      🇸🇪 KTH Royal - 89% match, Free tuition
                      <br /><br />
                      Would you like detailed information about any of these?
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      TU Munich looks great! What are the application requirements?
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 justify-end">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-white">
                      For TU Munich CS Master's:
                      <br /><br />
                      ✅ Bachelor's in CS/related field<br />
                      ✅ GPA: 3.0+ (you have 3.7 ✓)<br />
                      ✅ TOEFL: 88+ or IELTS: 6.5+<br />
                      ✅ 2 LORs, SOP, CV
                      <br /><br />
                      Deadline: March 15, 2025
                      <br /><br />
                      I can help you prepare all documents. Shall we start?
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <input 
                    type="text" 
                    placeholder="Ask me anything about studying abroad..."
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // Simple demo functionality - in real app would call AI API
                        const input = e.currentTarget
                        if (input.value.trim()) {
                          alert(`AI Demo: You asked "${input.value}". In the full app, this would connect to our AI assistant!`)
                          input.value = ''
                        }
                      }
                    }}
                  />
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input')
                      if (input?.value.trim()) {
                        alert(`AI Demo: You asked "${input.value}". In the full app, this would connect to our AI assistant!`)
                        input.value = ''
                      }
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* AI Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Powered by Advanced AI
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Target,
                      title: "Smart Program Matching",
                      description: "AI analyzes 50+ factors including your academic background, career goals, and preferences to find perfect program matches.",
                      stat: "95% accuracy"
                    },
                    {
                      icon: FileText,
                      title: "Document Analysis",
                      description: "Upload your transcripts, CV, and essays for instant feedback and improvement suggestions.",
                      stat: "Real-time feedback"
                    },
                    {
                      icon: Calendar,
                      title: "Application Timeline",
                      description: "Personalized deadlines and reminders ensure you never miss important dates.",
                      stat: "Zero missed deadlines"
                    },
                    {
                      icon: Award,
                      title: "Scholarship Finder",
                      description: "AI scans thousands of scholarships to find opportunities matching your profile.",
                      stat: "$500M+ available"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                          {feature.stat}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Try AI Assistant Now</h4>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                    onClick={() => alert('AI Demo: This would open the AI chat with pre-filled query "Find me CS programs in Germany"')}
                  >
                    <MessageCircle className="h-4 w-4 mr-3" />
                    "Find me CS programs in Germany"
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-primary-50"
                    onClick={() => alert('AI Demo: This would open the scholarship calculator tool')}
                  >
                    <Calculator className="h-4 w-4 mr-3" />
                    "Calculate my scholarship eligibility"
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-secondary-50"
                    onClick={() => alert('AI Demo: This would open the document review feature')}
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    "Review my personal statement"
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Data-Driven <span className="text-secondary-600">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make informed decisions with real-time analytics, success predictions, 
              and comprehensive application tracking.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Success Rate Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Success Predictions</h3>
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">MIT - Computer Science</span>
                    <span className="text-sm font-bold text-green-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Oxford - Business</span>
                    <span className="text-sm font-bold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">TU Munich - Engineering</span>
                    <span className="text-sm font-bold text-green-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">91%</div>
                  <div className="text-sm text-gray-600">Overall success rate</div>
                </div>
              </div>
            </motion.div>

            {/* Application Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Application Status</h3>
                <Target className="h-6 w-6 text-blue-600" />
              </div>

              <div className="space-y-4">
                {[
                  { uni: "Harvard", status: "Under Review", color: "bg-yellow-500", progress: 75 },
                  { uni: "Stanford", status: "Interview", color: "bg-blue-500", progress: 85 },
                  { uni: "MIT", status: "Accepted", color: "bg-green-500", progress: 100 },
                  { uni: "Oxford", status: "Submitted", color: "bg-gray-500", progress: 50 }
                ].map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${app.color} rounded-full`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{app.uni}</div>
                        <div className="text-sm text-gray-600">{app.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{app.progress}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-primary-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Full Dashboard
                </Button>
              </div>
            </motion.div>

            {/* ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">ROI Calculator</h3>
                <DollarSign className="h-6 w-6 text-secondary-600" />
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                    <div className="text-2xl font-bold text-gray-900">$85,000</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Expected Salary Increase</div>
                    <div className="text-2xl font-bold text-green-600">+$45,000/year</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Payback Period</div>
                    <div className="text-2xl font-bold text-secondary-600">1.9 years</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
                  <div className="text-center">
                    <div className="text-sm opacity-90 mb-1">10-Year ROI</div>
                    <div className="text-2xl font-bold">+$365,000</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full hover:bg-secondary-50">
                  <Calculator className="h-4 w-4 mr-2" />
                  Customize Calculator
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Real-time Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Live Activity Feed
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { activity: "Sarah from India got accepted to MIT", time: "2 min ago", icon: "🎉" },
                { activity: "Ahmed secured $35K DAAD scholarship", time: "5 min ago", icon: "💰" },
                { activity: "Maria started application to Oxford", time: "8 min ago", icon: "📝" },
                { activity: "New CS program added in Switzerland", time: "12 min ago", icon: "🆕" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community & Support Section */}
      <section className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Global <span className="text-primary-600">Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow students, alumni mentors, and education experts from around the world. 
              Get support at every step of your journey.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Community Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: Users,
                  title: "Student Forums",
                  description: "Connect with students from your target destinations and fields of study",
                  members: "25,000+ active members",
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  icon: GraduationCap,
                  title: "Alumni Mentors",
                  description: "Get guidance from successful graduates who've walked your path",
                  members: "500+ verified mentors",
                  color: "bg-primary-100 text-primary-600"
                },
                {
                  icon: MessageCircle,
                  title: "Expert Q&A",
                  description: "Direct access to admission counselors and education consultants",
                  members: "24/7 expert support",
                  color: "bg-secondary-100 text-secondary-600"
                },
                {
                  icon: Heart,
                  title: "Study Groups",
                  description: "Form study groups for language tests, entrance exams, and applications",
                  members: "1,200+ active groups",
                  color: "bg-green-100 text-green-600"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {feature.members}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Community Stats & Testimonials */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Community Stats */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Community Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-600 mb-2">4.9/5</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">72h</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                </div>
              </div>

              {/* Recent Community Activity */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    {
                      user: "Alex Chen",
                      action: "shared experience about studying at ETH Zurich",
                      time: "2 hours ago",
                      avatar: "AC"
                    },
                    {
                      user: "Maria Santos", 
                      action: "answered question about DAAD scholarships",
                      time: "4 hours ago",
                      avatar: "MS"
                    },
                    {
                      user: "Dr. Johnson",
                      action: "hosted Q&A session on MBA applications",
                      time: "1 day ago",
                      avatar: "DJ"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {activity.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join Community CTA */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Connect?</h3>
                <p className="mb-6 opacity-90">
                  Join thousands of students and get the support you need to succeed in your study abroad journey.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-white text-primary-600 hover:bg-gray-100">
                    <Users className="h-4 w-4 mr-2" />
                    Join Community Forums
                  </Button>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Find a Mentor
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/85 via-primary-900/85 to-secondary-900/85"></div>
        
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-10" />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Future with
              <br />
              <span className="text-primary-500">World-Class Education</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join over 50,000 students who have secured $2.5B+ in scholarships and gained admission 
              to top universities worldwide. Your success story starts here.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Link href="/auth/signup">
                <Button size="lg" className="group bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold px-10 py-5 text-lg shadow-2xl hover:shadow-primary-500/25 rounded-xl">
                  <span className="flex items-center space-x-3">
                    <Zap className="h-6 w-6 group-hover:text-primary-100 transition-colors" />
                    <span>Get Started Free</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              
              <Link href="/programs">
                <Button variant="outline" size="lg" className="border-2 border-primary-300 text-primary-200 hover:bg-primary-500/20 hover:text-white px-10 py-5 text-lg font-semibold rounded-xl backdrop-blur-sm">
                  <span className="flex items-center space-x-3">
                    <Search className="h-6 w-6" />
                    <span>Browse Programs</span>
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-secondary-600"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-secondary-600" />
                <span className="text-lg font-medium">Free Account Setup</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-secondary-600" />
                <span className="text-lg font-medium">AI-Powered Matching</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-secondary-900" />
                <span className="text-lg font-medium">24/7 Expert Support</span>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center space-x-8 opacity-70"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-black">500+</div>
                <div className="text-sm text-primary-500">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">150+</div>
                <div className="text-sm text-primary-500">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">95%</div>
                <div className="text-sm text-primary-500">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/logo.png"
                  width={200}
                  height={200}
                  alt="Ailesglobal Logo"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering students worldwide to achieve their study abroad dreams through AI-powered guidance, 
                comprehensive support, and access to global opportunities.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5-.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/programs" className="text-gray-300 hover:text-primary-400 transition-colors">Browse Programs</a></li>
                <li><a href="/scholarships" className="text-gray-300 hover:text-primary-400 transition-colors">Scholarships</a></li>
                <li><a href="/universities" className="text-gray-300 hover:text-primary-400 transition-colors">Universities</a></li>
                <li><a href="/countries" className="text-gray-300 hover:text-primary-400 transition-colors">Study Destinations</a></li>
                <li><a href="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">Blog & Resources</a></li>
                <li><a href="/events" className="text-gray-300 hover:text-primary-400 transition-colors">Events & Webinars</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="/help" className="text-gray-300 hover:text-primary-400 transition-colors">Help Center</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact Us</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-primary-400 transition-colors">Community Forums</a></li>
                <li><a href="/mentors" className="text-gray-300 hover:text-primary-400 transition-colors">Find a Mentor</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-primary-400 transition-colors">FAQ</a></li>
                <li><a href="/status" className="text-gray-300 hover:text-primary-400 transition-colors">System Status</a></li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Get the latest study abroad opportunities, scholarship alerts, and expert tips delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <p>&copy; 2025 AilesTravel. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                  <a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                  <a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                  <a href="/cookies" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Global Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Secure Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
