'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Plane, 
  FileText, 
  Users, 
  Calendar,
  MapPin,
  BookOpen,
  Award,
  HeartHandshake,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  Shield,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('education');

  const educationServices = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "University Application Guidance",
      description: "Complete application support from university selection to acceptance",
      features: ["Personal statement writing", "Document preparation", "Interview coaching", "Application tracking"],
      price: "Starting at $299"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Academic Pathway Planning",
      description: "Strategic planning for your entire academic journey",
      features: ["Career assessment", "Course selection", "Credit transfer", "Academic timeline"],
      price: "Starting at $199"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Scholarship Assistance",
      description: "Maximize your funding opportunities with expert guidance",
      features: ["Scholarship research", "Application writing", "Merit assessment", "Financial planning"],
      price: "Starting at $149"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Test Preparation",
      description: "Comprehensive prep for IELTS, TOEFL, GRE, GMAT, and more",
      features: ["1-on-1 tutoring", "Practice tests", "Strategy sessions", "Score improvement guarantee"],
      price: "Starting at $99/session"
    }
  ];

  const tourismServices = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Educational Tours",
      description: "Experience universities and cultures before committing",
      features: ["Campus visits", "City tours", "Cultural immersion", "University meetings"],
      price: "Starting at $1,299"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Summer Programs",
      description: "Academic summer experiences at top universities",
      features: ["Course credits", "Campus housing", "Cultural activities", "Certificate programs"],
      price: "Starting at $2,499"
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Study Abroad Packages",
      description: "Complete travel and accommodation arrangements",
      features: ["Flight booking", "Airport transfers", "Accommodation", "Local support"],
      price: "Starting at $899"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cultural Immersion",
      description: "Language and cultural preparation programs",
      features: ["Language courses", "Host families", "Cultural workshops", "Local mentorship"],
      price: "Starting at $799"
    }
  ];

  const visaServices = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Student Visa Processing",
      description: "Expert visa application support with high success rates",
      features: ["Document review", "Application filing", "Interview preparation", "Status tracking"],
      price: "Starting at $399"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Visa Consultation",
      description: "Professional assessment of your visa eligibility",
      features: ["Eligibility assessment", "Document checklist", "Timeline planning", "Risk evaluation"],
      price: "Starting at $99"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Express Processing",
      description: "Fast-track visa processing for urgent cases",
      features: ["Priority handling", "Expedited review", "Regular updates", "Emergency support"],
      price: "Starting at $599"
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Post-Arrival Support",
      description: "Continued assistance after you arrive in your destination",
      features: ["Airport pickup", "Orientation sessions", "Local registration", "Ongoing support"],
      price: "Starting at $199"
    }
  ];

  const packageDeals = [
    {
      title: "Complete Study Package",
      description: "University application + visa processing + travel arrangements",
      originalPrice: "$1,297",
      discountedPrice: "$999",
      savings: "$298",
      features: [
        "University application support",
        "Student visa processing",
        "Flight booking assistance",
        "Accommodation arrangements",
        "Pre-departure orientation",
        "6 months post-arrival support"
      ],
      popular: true
    },
    {
      title: "Educational Explorer",
      description: "Educational tour + scholarship guidance + cultural preparation",
      originalPrice: "$2,147",
      discountedPrice: "$1,699",
      savings: "$448",
      features: [
        "2-week educational tour",
        "University campus visits",
        "Scholarship application support",
        "Cultural immersion program",
        "Language preparation",
        "Local mentor assignment"
      ],
      popular: false
    },
    {
      title: "Premium Pathway",
      description: "Complete education consulting with premium support",
      originalPrice: "$2,996",
      discountedPrice: "$2,399",
      savings: "$597",
      features: [
        "Personal education consultant",
        "Multiple university applications",
        "Premium visa processing",
        "Educational tour included",
        "1-year ongoing support",
        "Career guidance sessions"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "Harvard University",
      image: "/api/placeholder/64/64",
      text: "AilesTravel made my dream of studying at Harvard a reality. Their comprehensive support was invaluable.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      university: "Oxford University",
      image: "/api/placeholder/64/64",
      text: "The educational tour helped me choose the perfect university. Their visa support was flawless.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      university: "MIT",
      image: "/api/placeholder/64/64",
      text: "From application to arrival, AilesTravel guided me every step. I couldn't have done it without them.",
      rating: 5
    }
  ];

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
            Comprehensive Education Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            From application to graduation, we provide end-to-end support for your international education journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-50">
              Book Free Consultation
            </Button>
            <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600">
              View Package Deals
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg shadow-lg p-2">
              {[
                { id: 'education', label: 'Education Services', icon: <GraduationCap className="h-5 w-5" /> },
                { id: 'tourism', label: 'Educational Tours', icon: <MapPin className="h-5 w-5" /> },
                { id: 'visa', label: 'Visa Support', icon: <FileText className="h-5 w-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {(activeTab === 'education' ? educationServices : 
              activeTab === 'tourism' ? tourismServices : 
              visaServices).map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                <div className="text-primary-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-lg font-semibold text-primary-600 mb-4">{service.price}</div>
                <Button className="w-full">Learn More</Button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Package Deals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Package Deals</h2>
            <p className="text-xl text-gray-600">Save more with our comprehensive service bundles</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packageDeals.map((pkg, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-xl shadow-lg border-2 p-8 ${
                  pkg.popular ? 'border-primary-500 scale-105' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-primary-600">{pkg.discountedPrice}</span>
                    <span className="text-lg text-gray-400 line-through">{pkg.originalPrice}</span>
                  </div>
                  <div className="text-center text-green-600 font-medium">Save {pkg.savings}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-primary-600 hover:bg-primary-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">What our students say about our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.university}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">
            Book a free consultation to discuss your education goals and find the perfect service package
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-50">
              Book Free Consultation
            </Button>
            <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 flex items-center">
              Contact Us <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
