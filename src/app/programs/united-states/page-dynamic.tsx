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

export default function UnitedStatesDynamicPage() {
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

  const handleSaveProgram = async (programId: string) => {
    if (isProgramSaved(programId)) {
      await unsaveProgram(programId);
    } else {
      await saveProgram(programId);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Programs</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Study in the United States
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover world-class education opportunities at America's top universities
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🏆 #1 Global Education Destination
              </span>
              <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🌟 Home to 8 of Top 10 Universities
              </span>
              <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                💼 Excellent Career Prospects
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Country Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {countryStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
              >
                <div className="text-blue-600 mx-auto mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Search className="h-6 w-6 mr-3 text-blue-600" />
              Find Your Perfect Program
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Field Filter */}
              <div className="relative">
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Fields</option>
                  {filters.fields.map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>

              {/* Level Filter */}
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Levels</option>
                  {filters.levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedField('');
                  setSelectedLevel('');
                  setSelectedType('');
                }}
                variant="outline"
                className="flex items-center justify-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Universities in the United States
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore prestigious institutions offering world-class education and research opportunities
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading universities...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {universities.map((university, index) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* University Image */}
                  <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
                    {university.imageUrl && (
                      <img 
                        src={university.imageUrl} 
                        alt={university.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {university.ranking && (
                        <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                          {university.ranking}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* University Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {university.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{university.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {university.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      {university.acceptanceRate && (
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-gray-600">Accept: {university.acceptanceRate}</span>
                        </div>
                      )}
                      {university.studentBody && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-gray-600">{university.studentBody} students</span>
                        </div>
                      )}
                    </div>

                    {/* Programs Count */}
                    <div className="mb-4">
                      <span className="text-sm text-gray-600">
                        {university.programs?.length || 0} programs available
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        asChild 
                        className="flex-1"
                      >
                        <Link href={`/programs/${university.id}`}>
                          View Programs
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveProgram(university.id)}
                        className="px-3"
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            isProgramSaved(university.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && universities.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Clock className="h-4 w-4 mr-2" />
                Load More Universities
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your American Dream?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get personalized guidance from our education experts and take the first step towards studying in the USA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/consultation">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" asChild>
                <Link href="/scholarships">
                  <Award className="h-5 w-5 mr-2" />
                  Explore Scholarships
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
