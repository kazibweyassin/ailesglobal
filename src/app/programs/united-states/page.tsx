'use client';

import { useState, useEffect } from 'react';
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
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { usePrograms, useSavedPrograms } from '@/hooks/usePrograms';

export default function UnitedStatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Use our dynamic hooks
  const { 
    programs, 
    universities, 
    loading, 
    error, 
    filters, 
    searchPrograms 
  } = usePrograms({
    country: 'United States'
  });

  const { 
    savedPrograms, 
    saveProgram, 
    unsaveProgram, 
    isProgramSaved 
  } = useSavedPrograms();

  // Filter programs based on search and filters
  useEffect(() => {
    searchPrograms({
      query: searchQuery,
      field: selectedField || undefined,
      level: selectedLevel || undefined,
      country: 'United States'
    });
    
  }, [searchQuery, selectedField, selectedLevel, searchPrograms]);

  const countryStats = [
    { number: "4,000+", label: "Universities", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "1.1M+", label: "International Students", icon: <Users className="h-8 w-8" /> },
    { number: "$45B+", label: "Financial Aid Available", icon: <DollarSign className="h-8 w-8" /> },
    { number: "95%", label: "Student Satisfaction", icon: <Star className="h-8 w-8" /> }
  ];

  // Use dynamic filter data instead of static arrays
  const fields = filters?.fields || [];
  const levels = filters?.levels || [];
  const types = ['Public', 'Private', 'Ivy League', 'Research University'];

  // Handle saving programs
  const handleSaveProgram = async (programId: string) => {
    if (isProgramSaved(programId)) {
      await unsaveProgram(programId);
    } else {
      await saveProgram(programId);
    }
  };

  // Show loading or error states
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mb-4"
              >
                <img 
                  src="https://www.applyboard.com/wp-content/uploads/2022/01/USA_BlogPost-1024x538.png" 
                  alt="United States Flag"
                  className="w-12 h-8 mr-4 rounded"
                />
                <h1 className="text-4xl md:text-5xl font-bold">Study in the United States</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-8 max-w-3xl"
              >
                Home to world-renowned universities and cutting-edge research facilities. The US offers unparalleled opportunities for academic excellence and career advancement.
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
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&auto=format" 
                alt="US Universities"
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
                <div className="text-blue-600 mb-4 flex justify-center">{stat.icon}</div>
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

      {/* University Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Universities ({universities?.length || 0})
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by Ranking</option>
              <option>Sort by Acceptance Rate</option>
              <option>Sort by Tuition</option>
              <option>Sort by Location</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
              <span className="text-gray-600">Loading universities...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {(universities || []).map((university, index) => (
                <motion.div 
                  key={university.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${
                    university.featured ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {/* University Header */}
                  <div className="relative">
                    <img 
                      src={university.imageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&auto=format'} 
                      alt={university.name}
                      className="w-full h-48 object-cover"
                    />
                    {university.featured && (
                      <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    <button
                      onClick={() => handleSaveProgram(university.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                        isProgramSaved(university.id)
                          ? 'text-red-500 bg-white'
                          : 'text-gray-600 bg-white/80 hover:bg-white'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isProgramSaved(university.id) ? 'fill-current' : ''}`} />
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
                        <div className="text-sm font-medium text-blue-600">{university.ranking}</div>
                      </div>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{university.tuition || 'N/A'}</div>
                        <div className="text-xs text-gray-600">Annual Tuition</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{university.acceptanceRate || 'N/A'}</div>
                        <div className="text-xs text-gray-600">Acceptance Rate</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{university.studentBody || 'N/A'}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 text-sm">{university.description}</p>

                    {/* Popular Programs */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Available Programs</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {university.programs?.slice(0, 3).map((program, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{program.name} ({program.level})</span>
                            <span className="text-blue-600 font-medium">{program.duration || '4 years'}</span>
                          </div>
                        )) || (
                          <div className="text-sm text-gray-500">Programs available - view details</div>
                        )}
                        {university.programs && university.programs.length > 3 && (
                          <div className="text-xs text-gray-500">+{university.programs.length - 3} more programs</div>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {(university.highlights || ['Research University', 'International Students']).slice(0, 2).map((highlight, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/programs/${university.id}`} className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
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
          )}

          {!loading && (!universities || universities.length === 0) && (
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Study in the United States?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on applications, scholarships, and visa processes for US universities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-50">
                Free Consultation
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                View Scholarships
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
