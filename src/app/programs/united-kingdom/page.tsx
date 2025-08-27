'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Star,
  MapPin,
  GraduationCap,
  DollarSign,
  Calendar,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Heart,
  Share2,
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function UnitedKingdomPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [savedPrograms, setSavedPrograms] = useState<string[]>([]);

  const countryStats = [
    { number: "130+", label: "Universities", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "500K+", label: "International Students", icon: <Users className="h-8 w-8" /> },
    { number: "£3B+", label: "Scholarships Available", icon: <DollarSign className="h-8 w-8" /> },
    { number: "93%", label: "Graduate Employment", icon: <TrendingUp className="h-8 w-8" /> }
  ];

  const topUniversities = [
    {
      id: 'oxford',
      name: 'University of Oxford',
      location: 'Oxford, England',
      ranking: '#1 UK Universities',
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c962?w=400&h=300&fit=crop&auto=format',
      description: 'The oldest university in the English-speaking world, renowned for academic excellence.',
      tuition: '£32,760',
      acceptanceRate: '17.5%',
      studentBody: '24,515',
      programs: [
        { name: 'Philosophy, Politics & Economics', level: 'Bachelor', duration: '3 years', tuition: '£32,760' },
        { name: 'MBA', level: 'Master', duration: '1 year', tuition: '£64,200' },
        { name: 'Medicine', level: 'Bachelor', duration: '6 years', tuition: '£35,380' },
        { name: 'Computer Science', level: 'Bachelor', duration: '3 years', tuition: '£32,760' }
      ],
      highlights: ['#1 Global Ranking', 'Rhodes Scholarship', '900+ Years History', '72 Nobel Laureates'],
      applicationDeadline: '2025-01-15',
      requirements: ['A-levels: A*A*A', 'IELTS: 7.0+', 'Oxford Admissions Test', 'Interview Required'],
      scholarships: ['Rhodes Scholarship', 'Reach Oxford', 'Clarendon Fund'],
      featured: true
    },
    {
      id: 'cambridge',
      name: 'University of Cambridge',
      location: 'Cambridge, England',
      ranking: '#2 UK Universities',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&auto=format',
      description: 'Historic collegiate research university with outstanding academic reputation.',
      tuition: '£33,972',
      acceptanceRate: '21%',
      studentBody: '23,247',
      programs: [
        { name: 'Natural Sciences', level: 'Bachelor', duration: '3 years', tuition: '£33,972' },
        { name: 'Engineering', level: 'Bachelor', duration: '4 years', tuition: '£33,972' },
        { name: 'Mathematics', level: 'Bachelor', duration: '3 years', tuition: '£33,972' },
        { name: 'Economics', level: 'Bachelor', duration: '3 years', tuition: '£33,972' }
      ],
      highlights: ['31 Colleges', '121 Nobel Prizes', 'Stephen Hawking Legacy', 'Silicon Fen'],
      applicationDeadline: '2025-01-15',
      requirements: ['A-levels: A*A*A', 'IELTS: 7.5+', 'Cambridge Admissions Test', 'Interview'],
      scholarships: ['Gates Cambridge', 'Cambridge Trust', 'Trinity College'],
      featured: true
    },
    {
      id: 'imperial',
      name: 'Imperial College London',
      location: 'London, England',
      ranking: '#3 UK Universities',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format',
      description: 'World-class university focusing on science, engineering, medicine and business.',
      tuition: '£36,200',
      acceptanceRate: '14.3%',
      studentBody: '19,000',
      programs: [
        { name: 'Aeronautical Engineering', level: 'Bachelor', duration: '3 years', tuition: '£36,200' },
        { name: 'Medicine', level: 'Bachelor', duration: '6 years', tuition: '£47,900' },
        { name: 'Data Science', level: 'Master', duration: '1 year', tuition: '£36,500' },
        { name: 'Business School', level: 'MBA', duration: '1 year', tuition: '£59,500' }
      ],
      highlights: ['London Location', '#1 in Engineering', 'Tech Innovation Hub', '87% International'],
      applicationDeadline: '2025-01-15',
      requirements: ['A-levels: A*A*A', 'IELTS: 6.5+', 'Strong Math/Science', 'Personal Statement'],
      scholarships: ['President\'s Scholarships', 'Imperial Bursaries', 'Country-specific Awards'],
      featured: true
    },
    {
      id: 'lse',
      name: 'London School of Economics',
      location: 'London, England',
      ranking: '#4 UK Universities',
      image: 'https://images.unsplash.com/photo-1529655683826-3c25c58e0b36?w=400&h=300&fit=crop&auto=format',
      description: 'Specialist university focusing on social sciences with global perspective.',
      tuition: '£25,920',
      acceptanceRate: '8.9%',
      studentBody: '12,330',
      programs: [
        { name: 'Economics', level: 'Bachelor', duration: '3 years', tuition: '£25,920' },
        { name: 'International Relations', level: 'Bachelor', duration: '3 years', tuition: '£25,920' },
        { name: 'Finance', level: 'Master', duration: '1 year', tuition: '£38,280' },
        { name: 'Public Policy', level: 'Master', duration: '1 year', tuition: '£30,960' }
      ],
      highlights: ['Central London', '16 Nobel Prizes', 'Global Network', 'Government Links'],
      applicationDeadline: '2025-01-15',
      requirements: ['A-levels: A*AA', 'IELTS: 7.0+', 'Personal Statement', 'LNAT (Law)'],
      scholarships: ['LSE Undergraduate Support', 'Graduate Support Scheme', 'Country Awards'],
      featured: false
    },
    {
      id: 'ucl',
      name: 'University College London',
      location: 'London, England',
      ranking: '#8 UK Universities',
      image: 'https://images.unsplash.com/photo-1554734867-bf3c00a49371?w=400&h=300&fit=crop&auto=format',
      description: 'London\'s leading multidisciplinary university with global reputation.',
      tuition: '£28,500',
      acceptanceRate: '48%',
      studentBody: '48,000',
      programs: [
        { name: 'Architecture', level: 'Bachelor', duration: '3 years', tuition: '£28,500' },
        { name: 'Medicine', level: 'Bachelor', duration: '6 years', tuition: '£38,000' },
        { name: 'Computer Science', level: 'Bachelor', duration: '3 years', tuition: '£32,100' },
        { name: 'Psychology', level: 'Bachelor', duration: '3 years', tuition: '£28,500' }
      ],
      highlights: ['Bloomsbury Campus', 'Research Excellence', 'Diverse Community', 'London Location'],
      applicationDeadline: '2025-01-15',
      requirements: ['A-levels: AAA', 'IELTS: 6.5+', 'Personal Statement', 'Portfolio (Architecture)'],
      scholarships: ['UCL Global Undergraduate', 'Denys Holland', 'Faculty Scholarships'],
      featured: false
    },
    {
      id: 'edinburgh',
      name: 'University of Edinburgh',
      location: 'Edinburgh, Scotland',
      ranking: '#15 UK Universities',
      image: 'https://images.unsplash.com/photo-1599417421808-5f8a4ed76b56?w=400&h=300&fit=crop&auto=format',
      description: 'Ancient Scottish university known for research excellence and beautiful campus.',
      tuition: '£26,500',
      acceptanceRate: '46%',
      studentBody: '47,000',
      programs: [
        { name: 'Veterinary Medicine', level: 'Bachelor', duration: '5 years', tuition: '£38,500' },
        { name: 'Artificial Intelligence', level: 'Bachelor', duration: '4 years', tuition: '£32,100' },
        { name: 'International Business', level: 'Master', duration: '1 year', tuition: '£34,200' },
        { name: 'Literature', level: 'Bachelor', duration: '4 years', tuition: '£26,500' }
      ],
      highlights: ['UNESCO World Heritage', 'Festival City', 'Research Excellence', 'Beautiful Campus'],
      applicationDeadline: '2025-01-15',
      requirements: ['A-levels: AAA-ABB', 'IELTS: 6.5+', 'Personal Statement', 'Portfolio (Arts)'],
      scholarships: ['Edinburgh Global', 'Principal\'s Career Development', 'Commonwealth'],
      featured: false
    }
  ];

  const fields = ['Business', 'Computer Science', 'Engineering', 'Medicine', 'Social Sciences', 'Arts & Humanities'];
  const levels = ['Bachelor', 'Master', 'Doctorate', 'Foundation'];
  const types = ['Russell Group', 'Ancient Universities', 'Modern Universities', 'Specialist'];

  const filteredUniversities = topUniversities.filter(university => {
    const matchesSearch = searchQuery === '' || 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.programs.some(program => program.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesField = selectedField === '' || 
      university.programs.some(program => program.name.includes(selectedField));
    
    const matchesLevel = selectedLevel === '' ||
      university.programs.some(program => program.level === selectedLevel);

    return matchesSearch && matchesField && matchesLevel;
  });

  const toggleSaveProgram = (programId: string) => {
    setSavedPrograms(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-blue-600 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mb-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=80&h=60&fit=crop&auto=format" 
                  alt="UK Flag"
                  className="w-12 h-8 mr-4 rounded"
                />
                <h1 className="text-4xl md:text-5xl font-bold">Study in the United Kingdom</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-8 max-w-3xl"
              >
                Experience centuries of academic tradition combined with cutting-edge research. The UK offers world-class education in a rich cultural environment.
              </motion.p>
              
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search universities, programs, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
                  />
                </div>
              </motion.div>
            </div>
            <div className="hidden lg:block ml-8">
              <img 
                src="https://images.unsplash.com/photo-1520637736862-4d197d17c962?w=400&h=300&fit=crop&auto=format" 
                alt="UK Universities"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {countryStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-red-600 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedField('');
                setSelectedLevel('');
                setSelectedType('');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* University Listings - Same structure as US page but with UK-specific styling */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Universities ({filteredUniversities.length})
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by Ranking</option>
              <option>Sort by Acceptance Rate</option>
              <option>Sort by Tuition</option>
              <option>Sort by Location</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredUniversities.map((university, index) => (
              <motion.div 
                key={university.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${
                  university.featured ? 'ring-2 ring-red-500' : ''
                }`}
              >
                {/* University Header */}
                <div className="relative">
                  <img 
                    src={university.image} 
                    alt={university.name}
                    className="w-full h-48 object-cover"
                  />
                  {university.featured && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <button
                    onClick={() => toggleSaveProgram(university.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      savedPrograms.includes(university.id)
                        ? 'text-red-500 bg-white'
                        : 'text-gray-600 bg-white/80 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedPrograms.includes(university.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-6">
                  {/* University Info */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{university.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{university.location}</span>
                      </div>
                      <div className="text-sm font-medium text-red-600">{university.ranking}</div>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{university.tuition}</div>
                      <div className="text-xs text-gray-600">Annual Tuition</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{university.acceptanceRate}</div>
                      <div className="text-xs text-gray-600">Acceptance Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{university.studentBody}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 text-sm">{university.description}</p>

                  {/* Popular Programs */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Popular Programs</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {university.programs.slice(0, 3).map((program, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{program.name} ({program.level})</span>
                          <span className="text-red-600 font-medium">{program.duration}</span>
                        </div>
                      ))}
                      {university.programs.length > 3 && (
                        <div className="text-xs text-gray-500">+{university.programs.length - 3} more programs</div>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.highlights.slice(0, 2).map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/programs/${university.id}`} className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
              <Button onClick={() => {
                setSelectedField('');
                setSelectedLevel('');
                setSelectedType('');
                setSearchQuery('');
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Study in the United Kingdom?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on applications, scholarships, and visa processes for UK universities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="bg-white text-red-600 hover:bg-gray-50">
                Free Consultation
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button size="lg" className="bg-red-500 hover:bg-red-600">
                View Scholarships
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
