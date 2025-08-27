'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  MapPin, 
  Calendar,
  Star,
  Quote,
  Trophy,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  Award,
  BookOpen,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SuccessStoriesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);

  const successStats = [
    { number: "2,500+", label: "Students Placed", icon: <Users className="h-8 w-8" /> },
    { number: "98%", label: "Visa Success Rate", icon: <TrendingUp className="h-8 w-8" /> },
    { number: "50+", label: "Partner Universities", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "$2.5M+", label: "Scholarships Secured", icon: <Award className="h-8 w-8" /> }
  ];

  const featuredStories = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 23,
      country: "Malaysia",
      university: "Harvard University",
      program: "Computer Science PhD",
      scholarship: "$120,000",
      year: "2024",
      image: "/api/placeholder/400/400",
      category: "computer-science",
      story: "Sarah dreamed of studying AI at a top-tier university. With our guidance, she not only got into Harvard but also secured a full scholarship. Her journey from a small town in Malaysia to Cambridge, Massachusetts, is truly inspiring.",
      quote: "Ailesglobal didn't just help me get into Harvard - they helped me believe I belonged there. Their support was incredible throughout the entire process.",
      videoUrl: "/videos/sarah-story.mp4",
      achievements: [
        "Full PhD scholarship at Harvard",
        "Published 3 research papers",
        "Selected for Google PhD Fellowship",
        "Teaching assistant for CS50"
      ],
      timeline: [
        { date: "Jan 2023", event: "Initial consultation" },
        { date: "Mar 2023", event: "Application preparation" },
        { date: "Dec 2023", event: "Harvard acceptance" },
        { date: "Feb 2024", event: "Scholarship confirmation" },
        { date: "Sep 2024", event: "Started PhD program" }
      ]
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      age: 25,
      country: "Egypt",
      university: "Oxford University",
      program: "Rhodes Scholarship",
      scholarship: "$180,000",
      year: "2024",
      image: "/api/placeholder/400/400",
      category: "business",
      story: "Ahmed's passion for sustainable development led him to pursue a Rhodes Scholarship at Oxford. Our comprehensive support helped him craft a compelling narrative that impressed the selection committee.",
      quote: "The team at Ailesglobal understood my vision and helped me articulate it in a way that resonated with Oxford's values. I'm now living my dream.",
      videoUrl: "/videos/ahmed-story.mp4",
      achievements: [
        "Rhodes Scholarship recipient",
        "Founded NGO for clean water",
        "Featured in Oxford Magazine",
        "UN Youth Ambassador"
      ],
      timeline: [
        { date: "Jun 2022", event: "First consultation" },
        { date: "Sep 2022", event: "Rhodes application prep" },
        { date: "Nov 2023", event: "Rhodes interview" },
        { date: "Dec 2023", event: "Scholarship awarded" },
        { date: "Oct 2024", event: "Started at Oxford" }
      ]
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      age: 22,
      country: "Colombia",
      university: "MIT",
      program: "Mechanical Engineering",
      scholarship: "$95,000",
      year: "2023",
      image: "/api/placeholder/400/400",
      category: "engineering",
      story: "Maria's innovative approach to renewable energy caught MIT's attention. Our engineering program guidance and scholarship assistance made her American dream come true.",
      quote: "From Bogotá to Boston, AilesTravel was with me every step of the way. They helped me showcase my potential and secure funding for my studies.",
      videoUrl: "/videos/maria-story.mp4",
      achievements: [
        "MIT merit scholarship",
        "Inventor of solar panel design",
        "Published in Nature Energy",
        "MIT entrepreneurship award"
      ],
      timeline: [
        { date: "May 2022", event: "Educational tour to US" },
        { date: "Aug 2022", event: "MIT application started" },
        { date: "Dec 2022", event: "MIT acceptance" },
        { date: "Mar 2023", event: "Scholarship secured" },
        { date: "Sep 2023", event: "Started at MIT" }
      ]
    },
    {
      id: 4,
      name: "Raj Patel",
      age: 24,
      country: "India",
      university: "Stanford University",
      program: "MBA",
      scholarship: "$75,000",
      year: "2024",
      image: "/api/placeholder/400/400",
      category: "business",
      story: "Raj transformed from a software engineer to a future business leader with Stanford's MBA program. Our career transition guidance was crucial to his success.",
      quote: "Ailesglobal helped me transition from tech to business school seamlessly. Their mentorship was invaluable in shaping my business school applications.",
      videoUrl: "/videos/raj-story.mp4",
      achievements: [
        "Stanford MBA scholarship",
        "Tech startup co-founder",
        "Case competition winner",
        "Stanford venture capital fellow"
      ],
      timeline: [
        { date: "Jan 2023", event: "Career consultation" },
        { date: "Apr 2023", event: "GMAT preparation" },
        { date: "Sep 2023", event: "Stanford application" },
        { date: "Mar 2024", event: "Acceptance & scholarship" },
        { date: "Sep 2024", event: "MBA program started" }
      ]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Stories' },
    { id: 'computer-science', label: 'Computer Science' },
    { id: 'business', label: 'Business & MBA' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'medicine', label: 'Medicine' }
  ];

  const filteredStories = activeFilter === 'all' 
    ? featuredStories 
    : featuredStories.filter(story => story.category === activeFilter);

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
            Success Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Real students, real achievements, real dreams fulfilled. Discover how AilesTravel has helped transform lives through education.
          </motion.p>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {successStats.map((stat, index) => (
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

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredStories.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedStory(story)}
              >
                <div className="relative">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {story.year}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{story.name}</h3>
                    <p className="text-sm opacity-90">Age {story.age} • {story.country}</p>
                  </div>
                  <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-primary-600" />
                      <span className="font-semibold text-gray-900">{story.university}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">{story.scholarship}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2">{story.program}</h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">{story.story}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <Quote className="h-5 w-5 text-primary-600 mb-2" />
                    <p className="text-sm italic text-gray-700">"{story.quote}"</p>
                  </div>
                  
                  <Button className="w-full" onClick={() => setSelectedStory(story)}>
                    Read Full Story <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedStory.name}</h2>
                  <p className="text-gray-600">Age {selectedStory.age} • {selectedStory.country}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">{selectedStory.university}</div>
                  <div className="text-gray-600">{selectedStory.program}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">The Journey</h3>
                  <p className="text-gray-700 mb-6">{selectedStory.story}</p>
                  
                  <div className="bg-primary-50 rounded-lg p-4 mb-6">
                    <Quote className="h-6 w-6 text-primary-600 mb-2" />
                    <p className="italic text-gray-700">"{selectedStory.quote}"</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedStory.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Timeline</h3>
                  <div className="space-y-4">
                    {selectedStory.timeline.map((milestone, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary-600 rounded-full w-3 h-3 mt-2 mr-4 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-gray-900">{milestone.date}</div>
                          <div className="text-gray-600">{milestone.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg text-white">
                    <h4 className="text-lg font-semibold mb-2">Scholarship Secured</h4>
                    <div className="text-3xl font-bold">{selectedStory.scholarship}</div>
                    <p className="text-sm opacity-90">Total funding received</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Success Story Starts Here</h2>
          <p className="text-xl mb-8">
            Join thousands of students who have achieved their dreams with AilesTravel's comprehensive support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-50">
              Start Your Journey
            </Button>
            <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
