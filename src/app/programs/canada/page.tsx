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

export default function CanadaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [savedPrograms, setSavedPrograms] = useState<string[]>([]);

  const countryStats = [
    { number: "100+", label: "Universities", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "800K+", label: "International Students", icon: <Users className="h-8 w-8" /> },
    { number: "CAD $500M+", label: "Scholarships Available", icon: <DollarSign className="h-8 w-8" /> },
    { number: "96%", label: "Student Satisfaction", icon: <Star className="h-8 w-8" /> }
  ];

  const topUniversities = [
    {
      id: 'toronto',
      name: 'University of Toronto',
      location: 'Toronto, Ontario',
      ranking: '#1 in Canada',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&auto=format',
      description: 'Canada\'s leading research university with world-class programs and facilities.',
      tuition: 'CAD $58,160',
      acceptanceRate: '43%',
      studentBody: '97,000',
      programs: [
        { name: 'Computer Science', level: 'Bachelor', duration: '4 years', tuition: 'CAD $58,160' },
        { name: 'Rotman MBA', level: 'Master', duration: '2 years', tuition: 'CAD $119,000' },
        { name: 'Medicine', level: 'Doctorate', duration: '4 years', tuition: 'CAD $94,500' },
        { name: 'Engineering', level: 'Bachelor', duration: '4 years', tuition: 'CAD $63,310' }
      ],
      highlights: ['Top Global Research', 'AI Vector Institute', 'Nobel Laureates', 'Downtown Campus'],
      applicationDeadline: '2025-01-13',
      requirements: ['High School: 85%+', 'IELTS: 6.5+', 'SAT/ACT Optional', 'Strong Essays'],
      scholarships: ['Lester B. Pearson', 'University of Toronto Scholar', 'Entrance Awards'],
      featured: true
    },
    {
      id: 'mcgill',
      name: 'McGill University',
      location: 'Montreal, Quebec',
      ranking: '#2 in Canada',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
      description: 'Prestigious research university known for academic excellence and beautiful campus.',
      tuition: 'CAD $50,000',
      acceptanceRate: '46%',
      studentBody: '40,000',
      programs: [
        { name: 'Medicine', level: 'Bachelor', duration: '4 years', tuition: 'CAD $70,000' },
        { name: 'Engineering', level: 'Bachelor', duration: '4 years', tuition: 'CAD $55,000' },
        { name: 'Business', level: 'Bachelor', duration: '3 years', tuition: 'CAD $50,000' },
        { name: 'Arts', level: 'Bachelor', duration: '3 years', tuition: 'CAD $45,000' }
      ],
      highlights: ['Montreal Location', '12 Nobel Prizes', 'Bilingual Environment', 'Historic Campus'],
      applicationDeadline: '2025-01-15',
      requirements: ['High School: 85%+', 'IELTS: 6.5+', 'French Optional', 'Academic Excellence'],
      scholarships: ['Major Entrance', 'International Student', 'Quebec Resident'],
      featured: true
    },
    {
      id: 'ubc',
      name: 'University of British Columbia',
      location: 'Vancouver, British Columbia',
      ranking: '#3 in Canada',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop&auto=format',
      description: 'Research-intensive university with stunning campus and innovative programs.',
      tuition: 'CAD $52,000',
      acceptanceRate: '52%',
      studentBody: '65,000',
      programs: [
        { name: 'Computer Science', level: 'Bachelor', duration: '4 years', tuition: 'CAD $52,000' },
        { name: 'Sauder MBA', level: 'Master', duration: '2 years', tuition: 'CAD $89,000' },
        { name: 'Forest Resources Management', level: 'Bachelor', duration: '4 years', tuition: 'CAD $48,000' },
        { name: 'Medicine', level: 'Doctorate', duration: '4 years', tuition: 'CAD $85,000' }
      ],
      highlights: ['Pacific Coast', 'Top Research', 'Sustainability Leader', 'Beautiful Campus'],
      applicationDeadline: '2025-01-15',
      requirements: ['High School: 84%+', 'IELTS: 6.5+', 'Personal Profile', 'English 12'],
      scholarships: ['International Leader of Tomorrow', 'Outstanding International Student', 'President\'s Entrance'],
      featured: true
    },
    {
      id: 'waterloo',
      name: 'University of Waterloo',
      location: 'Waterloo, Ontario',
      ranking: '#4 in Canada',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&auto=format',
      description: 'Innovation powerhouse known for co-op programs and technology excellence.',
      tuition: 'CAD $56,000',
      acceptanceRate: '53%',
      studentBody: '42,000',
      programs: [
        { name: 'Computer Science', level: 'Bachelor', duration: '4 years', tuition: 'CAD $56,000' },
        { name: 'Software Engineering', level: 'Bachelor', duration: '4 years', tuition: 'CAD $59,000' },
        { name: 'Mathematics', level: 'Bachelor', duration: '4 years', tuition: 'CAD $54,000' },
        { name: 'Business', level: 'Bachelor', duration: '4 years', tuition: 'CAD $53,000' }
      ],
      highlights: ['Co-op Programs', 'Tech Innovation Hub', 'Blackberry Legacy', 'Startup Incubator'],
      applicationDeadline: '2025-01-31',
      requirements: ['High School: 85%+', 'IELTS: 6.5+', 'Math Required', 'AIF Form'],
      scholarships: ['President\'s Scholarship', 'International Student', 'Merit-based Awards'],
      featured: false
    },
    {
      id: 'queens',
      name: 'Queen\'s University',
      location: 'Kingston, Ontario',
      ranking: '#5 in Canada',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&auto=format',
      description: 'Historic university with strong alumni network and beautiful limestone campus.',
      tuition: 'CAD $50,000',
      acceptanceRate: '41%',
      studentBody: '29,000',
      programs: [
        { name: 'Smith Business', level: 'Bachelor', duration: '4 years', tuition: 'CAD $55,000' },
        { name: 'Engineering', level: 'Bachelor', duration: '4 years', tuition: 'CAD $52,000' },
        { name: 'Arts & Science', level: 'Bachelor', duration: '4 years', tuition: 'CAD $50,000' },
        { name: 'Medicine', level: 'Doctorate', duration: '4 years', tuition: 'CAD $88,000' }
      ],
      highlights: ['School Spirit', 'Alumni Network', 'Research Excellence', 'Historic Campus'],
      applicationDeadline: '2025-01-31',
      requirements: ['High School: 86%+', 'IELTS: 6.5+', 'PSE Required', 'Leadership'],
      scholarships: ['Chancellor\'s Scholarship', 'International Admission', 'Queen\'s National Scholar'],
      featured: false
    },
    {
      id: 'calgary',
      name: 'University of Calgary',
      location: 'Calgary, Alberta',
      ranking: '#6 in Canada',
      image: 'https://images.unsplash.com/photo-1464822759844-d150baec4494?w=400&h=300&fit=crop&auto=format',
      description: 'Dynamic research university in Canada\'s energy capital with modern facilities.',
      tuition: 'CAD $28,000',
      acceptanceRate: '65%',
      studentBody: '33,000',
      programs: [
        { name: 'Petroleum Engineering', level: 'Bachelor', duration: '4 years', tuition: 'CAD $32,000' },
        { name: 'Haskayne Business', level: 'Bachelor', duration: '4 years', tuition: 'CAD $30,000' },
        { name: 'Medicine', level: 'Doctorate', duration: '4 years', tuition: 'CAD $85,000' },
        { name: 'Computer Science', level: 'Bachelor', duration: '4 years', tuition: 'CAD $28,000' }
      ],
      highlights: ['Energy Research', 'Modern Campus', 'Mountain Views', 'Innovation Hub'],
      applicationDeadline: '2025-03-01',
      requirements: ['High School: 80%+', 'IELTS: 6.5+', 'Competitive Admission', 'Portfolio (Arts)'],
      scholarships: ['International Entrance', 'Academic Excellence', 'Schulich Leader'],
      featured: false
    }
  ];

  const fields = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts & Humanities', 'Natural Sciences'];
  const levels = ['Bachelor', 'Master', 'Doctorate', 'Diploma'];
  const provinces = ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Saskatchewan', 'Manitoba'];

  const filteredUniversities = topUniversities.filter(university => {
    const matchesSearch = searchQuery === '' || 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.programs.some(program => program.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesField = selectedField === '' || 
      university.programs.some(program => program.name.includes(selectedField));
    
    const matchesLevel = selectedLevel === '' ||
      university.programs.some(program => program.level === selectedLevel);

    const matchesProvince = selectedProvince === '' ||
      university.location.includes(selectedProvince);

    return matchesSearch && matchesField && matchesLevel && matchesProvince;
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
      <section className="bg-gradient-to-br from-red-500 via-white to-red-500 text-gray-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mb-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=80&h=60&fit=crop&auto=format" 
                  alt="Canada Flag"
                  className="w-12 h-8 mr-4 rounded"
                />
                <h1 className="text-4xl md:text-5xl font-bold text-red-600">Study in Canada</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-8 max-w-3xl text-gray-700"
              >
                Experience world-class education in one of the most welcoming and diverse countries. Canada offers excellent programs, research opportunities, and pathways to permanent residence.
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
                    placeholder="Search universities, programs, or provinces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-red-400 focus:outline-none text-lg"
                  />
                </div>
              </motion.div>
            </div>
            <div className="hidden lg:block ml-8">
              <img 
                src="https://images.unsplash.com/photo-1503614472-8c93d56cd040?w=400&h=300&fit=crop&auto=format" 
                alt="Canadian Universities"
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
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Provinces</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedField('');
                setSelectedLevel('');
                setSelectedProvince('');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* University Listings - Same structure but with Canadian styling */}
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
              <option>Sort by Province</option>
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
                setSelectedProvince('');
                setSearchQuery('');
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Study in Canada?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on applications, scholarships, and immigration processes for Canadian universities
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
