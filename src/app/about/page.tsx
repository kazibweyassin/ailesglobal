'use client';

import { motion } from 'framer-motion';
import { 
  Users,
  Target,
  Award,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle,
  Quote,
  MapPin,
  Calendar,
  GraduationCap,
  Star,
  ArrowRight,
  BookOpen,
  Shield,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { number: "5+", label: "Years of Excellence", icon: <Calendar className="h-8 w-8" /> },
    { number: "2,500+", label: "Students Placed", icon: <Users className="h-8 w-8" /> },
    { number: "50+", label: "University Partners", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "98%", label: "Visa Success Rate", icon: <CheckCircle className="h-8 w-8" /> }
  ];

  const values = [
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Student-First Approach",
      description: "Every decision we make is centered around what's best for our students. Your success is our success, and we're committed to providing personalized guidance that fits your unique goals and circumstances."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Trust & Transparency",
      description: "We believe in complete transparency throughout your journey. No hidden fees, no false promises – just honest guidance and clear communication every step of the way."
    },
    {
      icon: <Lightbulb className="h-12 w-12" />,
      title: "Innovation in Education",
      description: "We continuously evolve our services and technology to provide the best possible experience. From AI-powered matching to virtual campus tours, we're always finding new ways to serve you better."
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Global Perspective",
      description: "With partnerships worldwide and deep understanding of international education systems, we provide truly global perspective to help you make informed decisions about your future."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      education: "PhD Educational Leadership, Harvard",
      experience: "15+ years in international education",
      image: "/api/placeholder/300/300",
      bio: "Former admissions director at top universities, passionate about democratizing access to world-class education.",
      specialties: ["University Admissions", "Educational Strategy", "Leadership Development"]
    },
    {
      name: "Michael Chen",
      role: "Head of Student Services",
      education: "MBA, Stanford Graduate School",
      experience: "12+ years in student counseling",
      image: "/api/placeholder/300/300",
      bio: "Dedicated to ensuring every student receives personalized attention and achieves their academic dreams.",
      specialties: ["Student Counseling", "Career Guidance", "Application Strategy"]
    },
    {
      name: "Dr. Priya Patel",
      role: "Director of Scholarships",
      education: "PhD Economics, Oxford University",
      experience: "10+ years in financial aid",
      image: "/api/placeholder/300/300",
      bio: "Expert in scholarship strategies and financial planning for international education.",
      specialties: ["Scholarship Strategy", "Financial Planning", "Merit Assessment"]
    },
    {
      name: "James Wilson",
      role: "Visa & Immigration Expert",
      education: "JD Immigration Law, Yale",
      experience: "8+ years in immigration law",
      image: "/api/placeholder/300/300",
      bio: "Specialized in student visas and immigration processes for multiple countries.",
      specialties: ["Visa Processing", "Immigration Law", "Documentation"]
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: "AilesTravel Founded",
      description: "Started with a vision to make quality international education accessible to students worldwide.",
      milestone: "First 100 students placed"
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our digital platform and virtual consultation services during the pandemic.",
      milestone: "Served 500+ students remotely"
    },
    {
      year: "2021",
      title: "University Partnerships",
      description: "Established direct partnerships with 20+ top universities globally.",
      milestone: "$500K+ scholarships secured"
    },
    {
      year: "2022",
      title: "Educational Tours Launch",
      description: "Introduced educational tour programs to help students experience universities firsthand.",
      milestone: "200+ students participated"
    },
    {
      year: "2023",
      title: "AI-Powered Matching",
      description: "Integrated AI technology to provide personalized university and program recommendations.",
      milestone: "95% student satisfaction rate"
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded services to 15+ countries with local partnerships and support.",
      milestone: "2,000+ students placed"
    },
    {
      year: "2025",
      title: "Excellence Recognition",
      description: "Recognized as a leading education consultancy with industry awards and certifications.",
      milestone: "2,500+ students served"
    }
  ];

  const testimonials = [
    {
      name: "Alice Wang",
      university: "MIT",
      program: "Computer Science",
      image: "/api/placeholder/80/80",
      text: "AilesTravel didn't just help me get into MIT – they helped me discover my potential. Their personalized guidance was incredible.",
      rating: 5
    },
    {
      name: "Raj Sharma",
      university: "Oxford",
      program: "Rhodes Scholar",
      image: "/api/placeholder/80/80",
      text: "The scholarship guidance I received was exceptional. They helped me secure the Rhodes Scholarship and changed my life.",
      rating: 5
    },
    {
      name: "Maria Santos",
      university: "Stanford",
      program: "MBA",
      image: "/api/placeholder/80/80",
      text: "From application to arrival, AilesTravel supported me every step. Their expertise in visa processing was invaluable.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Transforming Dreams into Degrees
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              Since 2019, AilesTravel has been dedicated to making world-class international education accessible to ambitious students worldwide. We're more than consultants – we're your partners in success.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-white/80 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To democratize access to world-class international education by providing comprehensive, 
                personalized guidance that empowers students to achieve their academic and career aspirations.
              </p>
              <div className="flex items-start space-x-4">
                <Target className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-700">
                    A world where every talented student, regardless of their background, has the opportunity 
                    to study at the world's best universities and unlock their full potential.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Students celebrating graduation"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary-600/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="text-primary-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Passionate professionals dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.education}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.experience}</p>
                  <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped our mission</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-2xl font-bold text-primary-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full inline-block">
                        {item.milestone}
                      </div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Real stories from real students</p>
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
                <Quote className="h-8 w-8 text-primary-600 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.program}, {testimonial.university}</p>
                  </div>
                </div>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
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
            Join thousands of students who have transformed their lives through international education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-50">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 flex items-center">
                Explore Scholarships <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
