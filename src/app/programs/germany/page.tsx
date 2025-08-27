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

export default function GermanyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [savedPrograms, setSavedPrograms] = useState<string[]>([]);

  const countryStats = [
    { number: "400+", label: "Universities", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "400K+", label: "International Students", icon: <Users className="h-8 w-8" /> },
    { number: "€0", label: "Public University Tuition", icon: <DollarSign className="h-8 w-8" /> },
    { number: "84%", label: "Graduate Employment", icon: <Star className="h-8 w-8" /> }
  ];

  const topUniversities = [
    {
      id: 'tum',
      name: 'Technical University of Munich (TUM)',
      location: 'Munich, Bavaria',
      ranking: '#1 German Technical University',
      image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=400&h=300&fit=crop&auto=format',
      description: 'World-leading technical university with excellence in engineering and sciences.',
      tuition: '€150/semester',
      acceptanceRate: '8%',
      studentBody: '45,000',
      programs: [
        { name: 'Computer Science', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' },
        { name: 'Mechanical Engineering', level: 'Master', duration: '2 years', tuition: '€150/semester' },
        { name: 'Physics', level: 'PhD', duration: '3-4 years', tuition: 'Funded' },
        { name: 'Business Administration', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' }
      ],
      highlights: ['Nobel Laureates', 'Industry Partnerships', 'Research Excellence', 'Silicon Valley Campus'],
      applicationDeadline: '2025-01-15',
      requirements: ['Abitur or Equivalent', 'DSH-2 or TestDaF 4', 'Strong STEM Background', 'Motivation Letter'],
      scholarships: ['DAAD', 'Deutschlandstipendium', 'TUM Excellence', 'Research Assistantships'],
      featured: true
    },
    {
      id: 'heidelberg',
      name: 'Heidelberg University',
      location: 'Heidelberg, Baden-Württemberg',
      ranking: '#1 German University Overall',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop&auto=format',
      description: 'Germany\'s oldest university with over 630 years of academic excellence.',
      tuition: '€171.75/semester',
      acceptanceRate: '20%',
      studentBody: '30,000',
      programs: [
        { name: 'Medicine', level: 'Bachelor', duration: '6 years', tuition: '€171.75/semester' },
        { name: 'Law', level: 'Bachelor', duration: '4.5 years', tuition: '€171.75/semester' },
        { name: 'Philosophy', level: 'Master', duration: '2 years', tuition: '€171.75/semester' },
        { name: 'Natural Sciences', level: 'PhD', duration: '3-4 years', tuition: 'Funded' }
      ],
      highlights: ['Historic Campus', 'Medical Excellence', 'Research University', 'Castle Location'],
      applicationDeadline: '2025-01-15',
      requirements: ['Abitur 1.0-2.5', 'DSH-2 or C1 German', 'Excellent Grades', 'Interview (Medicine)'],
      scholarships: ['DAAD', 'Baden-Württemberg', 'Merit-based', 'Research Grants'],
      featured: true
    },
    {
      id: 'lmu',
      name: 'Ludwig Maximilian University (LMU)',
      location: 'Munich, Bavaria',
      ranking: '#2 German University',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&auto=format',
      description: 'Prestigious research university in the heart of Munich with diverse programs.',
      tuition: '€150/semester',
      acceptanceRate: '25%',
      studentBody: '52,000',
      programs: [
        { name: 'Psychology', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' },
        { name: 'Economics', level: 'Master', duration: '2 years', tuition: '€150/semester' },
        { name: 'Biology', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' },
        { name: 'History', level: 'Master', duration: '2 years', tuition: '€150/semester' }
      ],
      highlights: ['Munich Location', 'Nobel Prize Winners', 'Research Excellence', 'Liberal Arts Strong'],
      applicationDeadline: '2025-01-15',
      requirements: ['Abitur or Equivalent', 'DSH-2 German', 'Competitive Selection', 'Subject-specific Requirements'],
      scholarships: ['Deutschlandstipendium', 'DAAD', 'Bayern Stipendium', 'Need-based Aid'],
      featured: true
    },
    {
      id: 'kit',
      name: 'Karlsruhe Institute of Technology (KIT)',
      location: 'Karlsruhe, Baden-Württemberg',
      ranking: '#3 German Technical University',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&auto=format',
      description: 'Leading research university combining university and national research center.',
      tuition: '€150/semester',
      acceptanceRate: '15%',
      studentBody: '25,000',
      programs: [
        { name: 'Computer Engineering', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' },
        { name: 'Materials Science', level: 'Master', duration: '2 years', tuition: '€150/semester' },
        { name: 'Energy Engineering', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' },
        { name: 'Information Systems', level: 'Master', duration: '2 years', tuition: '€150/semester' }
      ],
      highlights: ['Research Excellence', 'Industry Connections', 'Innovation Hub', 'Technology Focus'],
      applicationDeadline: '2025-01-15',
      requirements: ['Abitur 1.0-3.0', 'DSH-2 or TestDaF 4', 'STEM Background', 'English Proficiency'],
      scholarships: ['DAAD', 'Industry Sponsorships', 'Research Positions', 'Merit Awards'],
      featured: false
    },
    {
      id: 'humboldt',
      name: 'Humboldt University Berlin',
      location: 'Berlin',
      ranking: '#4 German University',
      image: 'https://images.unsplash.com/photo-1567173632883-d09582a92c55?w=400&h=300&fit=crop&auto=format',
      description: 'Historic university in the capital, known for humanities and social sciences.',
      tuition: '€315/semester',
      acceptanceRate: '30%',
      studentBody: '35,000',
      programs: [
        { name: 'Political Science', level: 'Bachelor', duration: '3 years', tuition: '€315/semester' },
        { name: 'Philosophy', level: 'Master', duration: '2 years', tuition: '€315/semester' },
        { name: 'History', level: 'Bachelor', duration: '3 years', tuition: '€315/semester' },
        { name: 'Mathematics', level: 'Master', duration: '2 years', tuition: '€315/semester' }
      ],
      highlights: ['Berlin Location', 'Nobel Tradition', 'Humanities Excellence', 'Historical Significance'],
      applicationDeadline: '2025-01-15',
      requirements: ['Abitur or Equivalent', 'DSH-2 German', 'Strong Academic Record', 'Motivation Letter'],
      scholarships: ['DAAD', 'Berlin Scholarship', 'International Programs', 'Research Assistantships'],
      featured: false
    },
    {
      id: 'rwth',
      name: 'RWTH Aachen University',
      location: 'Aachen, North Rhine-Westphalia',
      ranking: '#5 German Technical University',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&auto=format',
      description: 'Leading technical university known for engineering and international programs.',
      tuition: '€150/semester',
      acceptanceRate: '12%',
      studentBody: '47,000',
      programs: [
        { name: 'Automotive Engineering', level: 'Master', duration: '2 years', tuition: '€150/semester' },
        { name: 'Computer Science', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' },
        { name: 'Chemical Engineering', level: 'Master', duration: '2 years', tuition: '€150/semester' },
        { name: 'Electrical Engineering', level: 'Bachelor', duration: '3 years', tuition: '€150/semester' }
      ],
      highlights: ['Engineering Excellence', 'Industry Partners', 'International Focus', 'Research Innovation'],
      applicationDeadline: '2025-01-15',
      requirements: ['Abitur or International Equivalent', 'DSH-2 or IELTS 6.5', 'STEM Excellence', 'Technical Background'],
      scholarships: ['DAAD', 'Industry Partnerships', 'Excellence Initiative', 'International Office'],
      featured: false
    }
  ];

  const fields = ['Engineering', 'Computer Science', 'Medicine', 'Business', 'Natural Sciences', 'Humanities'];
  const levels = ['Bachelor', 'Master', 'PhD', 'Doctorate'];
  const states = ['Bavaria', 'Baden-Württemberg', 'Berlin', 'North Rhine-Westphalia', 'Hamburg', 'Saxony'];

  const filteredUniversities = topUniversities.filter(university => {
    const matchesSearch = searchQuery === '' || 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.programs.some(program => program.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesField = selectedField === '' || 
      university.programs.some(program => program.name.includes(selectedField));
    
    const matchesLevel = selectedLevel === '' ||
      university.programs.some(program => program.level === selectedLevel);

    const matchesState = selectedState === '' ||
      university.location.includes(selectedState);

    return matchesSearch && matchesField && matchesLevel && matchesState;
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
      <section className="bg-gradient-to-br from-yellow-400 via-red-500 to-black text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mb-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=80&h=60&fit=crop&auto=format" 
                  alt="Germany Flag"
                  className="w-12 h-8 mr-4 rounded"
                />
                <h1 className="text-4xl md:text-5xl font-bold">Study in Germany</h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-8 max-w-3xl"
              >
                Experience tuition-free education at world-renowned universities. Germany offers cutting-edge research, industrial partnerships, and excellent career prospects in the heart of Europe.
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
                    placeholder="Search universities, programs, or states..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-lg"
                  />
                </div>
              </motion.div>
            </div>
            <div className="hidden lg:block ml-8">
              <img 
                src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop&auto=format" 
                alt="German Universities"
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
                <div className="text-yellow-600 mb-4 flex justify-center">{stat.icon}</div>
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedField('');
                setSelectedLevel('');
                setSelectedState('');
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
              Top Universities ({filteredUniversities.length})
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by Ranking</option>
              <option>Sort by Acceptance Rate</option>
              <option>Sort by Tuition</option>
              <option>Sort by State</option>
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
                  university.featured ? 'ring-2 ring-yellow-500' : ''
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
                    <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
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
                      <div className="text-sm font-medium text-yellow-600">{university.ranking}</div>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{university.tuition}</div>
                      <div className="text-xs text-gray-600">Semester Fee</div>
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
                          <span className="text-yellow-600 font-medium">{program.duration}</span>
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
                          className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/programs/${university.id}`} className="flex-1">
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700" size="sm">
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
                setSelectedState('');
                setSearchQuery('');
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Study in Germany?</h2>
          <p className="text-xl mb-8">
            Get expert guidance on applications, language requirements, and visa processes for German universities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="bg-white text-gray-900 hover:bg-gray-50">
                Free Consultation
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                View Scholarships
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
