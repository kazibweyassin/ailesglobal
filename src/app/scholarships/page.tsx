'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Star,
  Calendar,
  DollarSign,
  GraduationCap,
  MapPin,
  Users,
  Clock,
  Award,
  BookOpen,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Download,
  Heart,
  Share2,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedDeadline, setSelectedDeadline] = useState('');
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);

  const scholarshipStats = [
    { number: "$2.5M+", label: "Total Scholarships Secured", icon: <DollarSign className="h-8 w-8" /> },
    { number: "500+", label: "Available Scholarships", icon: <Award className="h-8 w-8" /> },
    { number: "85%", label: "Success Rate", icon: <TrendingUp className="h-8 w-8" /> },
    { number: "50+", label: "Partner Universities", icon: <GraduationCap className="h-8 w-8" /> }
  ];

  const featuredScholarships = [
    {
      id: 'harvard-cs',
      title: 'Harvard University Computer Science Fellowship',
      university: 'Harvard University',
      country: 'United States',
      field: 'Computer Science',
      amount: '$75,000',
      type: 'Full Tuition + Stipend',
      deadline: '2025-01-15',
      eligibility: 'PhD applicants in Computer Science',
      description: 'Full fellowship covering tuition, fees, and living stipend for outstanding PhD candidates in Computer Science.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        'GPA of 3.7 or higher',
        'GRE scores (optional but recommended)',
        'Research experience in AI, ML, or Systems',
        'Strong letters of recommendation'
      ],
      benefits: [
        'Full tuition coverage',
        '$45,000 annual stipend',
        'Health insurance coverage',
        'Research funding up to $5,000',
        'Conference travel support'
      ],
      applicationUrl: 'https://harvard.edu/scholarships',
      featured: true,
      tags: ['PhD', 'STEM', 'Research'],
      rating: 4.9,
      applicants: 1200,
      awarded: 15
    },
    {
      id: 'oxford-rhodes',
      title: 'Rhodes Scholarship at Oxford',
      university: 'Oxford University',
      country: 'United Kingdom',
      field: 'Any Field',
      amount: '$180,000',
      type: 'Full Scholarship',
      deadline: '2024-10-01',
      eligibility: 'Outstanding students from select countries',
      description: 'The most prestigious international scholarship program, supporting exceptional students from around the world.',
      requirements: [
        'Exceptional academic achievement',
        'Leadership and service experience',
        'Strong moral character',
        'Physical vigor and outdoor interests',
        'Age 18-24 at time of application'
      ],
      benefits: [
        'Full tuition and fees',
        'Living stipend',
        'Travel to/from Oxford',
        '2-3 years of study',
        'Global Rhodes network access'
      ],
      applicationUrl: 'https://rhodesscholarships.org',
      featured: true,
      tags: ['Masters', 'PhD', 'Leadership'],
      rating: 5.0,
      applicants: 2800,
      awarded: 100
    },
    {
      id: 'mit-energy',
      title: 'MIT Energy Fellowship',
      university: 'MIT',
      country: 'United States',
      field: 'Energy & Environment',
      amount: '$50,000',
      type: 'Research Fellowship',
      deadline: '2025-03-01',
      eligibility: 'Graduate students in energy-related fields',
      description: 'Supporting innovative research in sustainable energy and environmental technologies.',
      requirements: [
        'Enrolled in MIT graduate program',
        'Research focus on energy/environment',
        'Faculty sponsor required',
        'Research proposal submission'
      ],
      benefits: [
        '$50,000 research funding',
        'Lab access and equipment',
        'Mentorship program',
        'Industry networking events',
        'Publication support'
      ],
      applicationUrl: 'https://mit.edu/energy-fellowship',
      featured: false,
      tags: ['Graduate', 'Research', 'Environment'],
      rating: 4.7,
      applicants: 450,
      awarded: 25
    },
    {
      id: 'cambridge-gates',
      title: 'Gates Cambridge Scholarship',
      university: 'Cambridge University',
      country: 'United Kingdom',
      field: 'Any Field',
      amount: '$120,000',
      type: 'Full Scholarship',
      deadline: '2024-12-15',
      eligibility: 'Outstanding students from outside the UK',
      description: 'Transformational scholarship for future leaders committed to improving the lives of others.',
      requirements: [
        'Outstanding intellectual ability',
        'Leadership potential',
        'Commitment to improving others\' lives',
        'Good fit with Cambridge',
        'Non-UK citizenship'
      ],
      benefits: [
        'Full tuition coverage',
        'Maintenance allowance',
        'Travel allowance',
        'Academic development funding',
        'Family allowance if applicable'
      ],
      applicationUrl: 'https://gatescambridge.org',
      featured: true,
      tags: ['Masters', 'PhD', 'Leadership'],
      rating: 4.9,
      applicants: 5000,
      awarded: 80
    },
    {
      id: 'stanford-knight',
      title: 'Knight-Hennessy Scholars Program',
      university: 'Stanford University',
      country: 'United States',
      field: 'Any Field',
      amount: '$90,000',
      type: 'Full Fellowship',
      deadline: '2024-10-10',
      eligibility: 'Graduate students from all fields',
      description: 'Developing a community of future global leaders to address complex challenges.',
      requirements: [
        'Applying to Stanford graduate program',
        'Leadership experience',
        'Civic commitment',
        'Academic excellence',
        'Collaborative spirit'
      ],
      benefits: [
        'Full funding for degree',
        'Leadership development',
        'Global community',
        'Mentorship opportunities',
        'Service learning'
      ],
      applicationUrl: 'https://knight-hennessy.stanford.edu',
      featured: true,
      tags: ['Graduate', 'Leadership', 'Service'],
      rating: 4.8,
      applicants: 4500,
      awarded: 100
    },
    {
      id: 'eth-excellence',
      title: 'ETH Zurich Excellence Scholarship',
      university: 'ETH Zurich',
      country: 'Switzerland',
      field: 'STEM Fields',
      amount: '$40,000',
      type: 'Partial Scholarship',
      deadline: '2024-12-15',
      eligibility: 'Outstanding STEM students',
      description: 'Supporting exceptional students in science, technology, engineering, and mathematics.',
      requirements: [
        'Bachelor\'s degree in STEM field',
        'Top 10% of graduating class',
        'Strong academic record',
        'Research interest alignment',
        'English proficiency'
      ],
      benefits: [
        'Partial tuition coverage',
        'Living allowance',
        'Research opportunities',
        'Industry connections',
        'Swiss residence permit support'
      ],
      applicationUrl: 'https://ethz.ch/scholarships',
      featured: false,
      tags: ['Masters', 'STEM', 'Research'],
      rating: 4.6,
      applicants: 800,
      awarded: 40
    }
  ];

  const countries = ['United States', 'United Kingdom', 'Switzerland', 'Germany', 'Canada', 'Australia'];
  const fields = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts & Humanities', 'Social Sciences'];
  const amounts = ['Under $25,000', '$25,000 - $50,000', '$50,000 - $100,000', 'Over $100,000'];
  const deadlines = ['Next 30 days', 'Next 3 months', 'Next 6 months', 'Next year'];

  const filteredScholarships = featuredScholarships.filter(scholarship => {
    return (
      (searchQuery === '' || 
       scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
       scholarship.field.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCountry === '' || scholarship.country === selectedCountry) &&
      (selectedField === '' || scholarship.field.includes(selectedField)) &&
      (selectedAmount === '' || 
       (selectedAmount === 'Under $25,000' && parseInt(scholarship.amount.replace(/[$,]/g, '')) < 25000) ||
       (selectedAmount === '$25,000 - $50,000' && parseInt(scholarship.amount.replace(/[$,]/g, '')) >= 25000 && parseInt(scholarship.amount.replace(/[$,]/g, '')) <= 50000) ||
       (selectedAmount === '$50,000 - $100,000' && parseInt(scholarship.amount.replace(/[$,]/g, '')) >= 50000 && parseInt(scholarship.amount.replace(/[$,]/g, '')) <= 100000) ||
       (selectedAmount === 'Over $100,000' && parseInt(scholarship.amount.replace(/[$,]/g, '')) > 100000))
    );
  });

  const toggleSaveScholarship = (scholarshipId: string) => {
    setSavedScholarships(prev => 
      prev.includes(scholarshipId) 
        ? prev.filter(id => id !== scholarshipId)
        : [...prev, scholarshipId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Find Your Perfect Scholarship
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Discover thousands of scholarship opportunities from top universities worldwide. Fund your dreams with our comprehensive scholarship database.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search scholarships by university, field, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-secondary-400 focus:outline-none text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarshipStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">{stat.icon}</div>
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
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>

            <select
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any Amount</option>
              {amounts.map(amount => (
                <option key={amount} value={amount}>{amount}</option>
              ))}
            </select>

            <select
              value={selectedDeadline}
              onChange={(e) => setSelectedDeadline(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any Deadline</option>
              {deadlines.map(deadline => (
                <option key={deadline} value={deadline}>{deadline}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedCountry('');
                setSelectedField('');
                setSelectedAmount('');
                setSelectedDeadline('');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Scholarship Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Scholarships ({filteredScholarships.length})
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by Relevance</option>
              <option>Sort by Amount (High to Low)</option>
              <option>Sort by Deadline</option>
              <option>Sort by University</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div 
                key={scholarship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 ${
                  scholarship.featured ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {scholarship.featured && (
                        <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                          Featured
                        </span>
                      )}
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(scholarship.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({scholarship.rating})</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{scholarship.title}</h3>
                    <p className="text-gray-600">{scholarship.university}</p>
                  </div>
                  <button
                    onClick={() => toggleSaveScholarship(scholarship.id)}
                    className={`p-2 rounded-full transition-colors ${
                      savedScholarships.includes(scholarship.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedScholarships.includes(scholarship.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{scholarship.country}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{scholarship.field}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-semibold text-green-600">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 line-clamp-2">{scholarship.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {scholarship.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{scholarship.applicants.toLocaleString()} applicants</span>
                  <span>{scholarship.awarded} awarded annually</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No scholarships found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
              <Button onClick={() => {
                setSelectedCountry('');
                setSelectedField('');
                setSelectedAmount('');
                setSelectedDeadline('');
                setSearchQuery('');
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding Scholarships?</h2>
          <p className="text-xl mb-8">
            Our scholarship experts can help you identify and apply for the best funding opportunities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-50">
              Free Scholarship Consultation
            </Button>
            <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 flex items-center">
              Download Scholarship Guide <Download className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
