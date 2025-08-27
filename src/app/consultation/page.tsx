'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  CheckCircle,
  User,
  Mail,
  Globe,
  GraduationCap,
  MapPin,
  BookOpen,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    studyDestination: '',
    studyLevel: '',
    fieldOfStudy: '',
    timeline: '',
    consultationType: 'video',
    specificQuestions: ''
  });

  const services = [
    {
      id: 'university-application',
      title: 'University Application Guidance',
      description: 'Complete support for university selection and application process',
      duration: '45 minutes',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'scholarship-guidance',
      title: 'Scholarship & Funding Guidance',
      description: 'Maximize your funding opportunities with expert assistance',
      duration: '30 minutes',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'visa-consultation',
      title: 'Visa & Immigration Support',
      description: 'Expert guidance on visa requirements and application process',
      duration: '30 minutes',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'educational-tours',
      title: 'Educational Tour Planning',
      description: 'Plan university visits and cultural immersion experiences',
      duration: '30 minutes',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'comprehensive-planning',
      title: 'Comprehensive Education Planning',
      description: 'End-to-end planning for your entire study abroad journey',
      duration: '60 minutes',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-red-500'
    }
  ];

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true }
  ];

  const consultationTypes = [
    {
      id: 'video',
      title: 'Video Call',
      description: 'Face-to-face consultation via Zoom',
      icon: <Video className="h-5 w-5" />
    },
    {
      id: 'phone',
      title: 'Phone Call',
      description: 'Voice consultation via phone',
      icon: <Phone className="h-5 w-5" />
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Text-based consultation via chat',
      icon: <MessageSquare className="h-5 w-5" />
    }
  ];

  const studyDestinations = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Netherlands', 'Switzerland', 'New Zealand', 'Ireland', 'Other'
  ];

  const studyLevels = [
    'Undergraduate (Bachelor\'s)', 'Graduate (Master\'s)', 'Doctorate (PhD)', 
    'Diploma/Certificate', 'Foundation/Pathway', 'Language Course'
  ];

  const fieldsOfStudy = [
    'Computer Science & IT', 'Business & Management', 'Engineering', 'Medicine & Health Sciences',
    'Arts & Humanities', 'Social Sciences', 'Natural Sciences', 'Law', 'Education', 'Other'
  ];

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Free 30-Minute Consultation',
      description: 'No cost, no obligation initial assessment'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Expert Guidance',
      description: 'Certified education consultants with 10+ years experience'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Personalized Roadmap',
      description: 'Custom education plan tailored to your goals'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'University Partnerships',
      description: 'Direct connections with 50+ top universities worldwide'
    }
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { selectedService, selectedTime, formData });
    setStep(5); // Show confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Book Your Free Consultation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8"
          >
            Get expert guidance on your study abroad journey. Our certified consultants will help you navigate every step.
          </motion.p>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Service</span>
            <span>Schedule</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What do you need help with?</h2>
              <p className="text-gray-600">Select the service that best matches your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${service.color} text-white mr-3`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleNext} 
                disabled={!selectedService}
                className="flex items-center"
              >
                Next Step <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose your preferred time</h2>
              <p className="text-gray-600">Select a convenient time slot for your consultation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-center ${
                        selectedTime === slot.time
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : slot.available
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Clock className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-sm font-medium">{slot.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Consultation Type</h3>
                <div className="space-y-3">
                  {consultationTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                        formData.consultationType === type.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.id}
                        checked={formData.consultationType === type.id}
                        onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="text-primary-600 mr-3">{type.icon}</div>
                      <div>
                        <div className="font-medium">{type.title}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!selectedTime}
                className="flex items-center"
              >
                Next Step <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about yourself</h2>
              <p className="text-gray-600">Help us prepare for your consultation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select your country</option>
                  {['United States', 'India', 'China', 'Nigeria', 'Pakistan', 'Bangladesh', 'Other'].map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Destination</label>
                <select
                  value={formData.studyDestination}
                  onChange={(e) => setFormData({...formData, studyDestination: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select destination</option>
                  {studyDestinations.map(destination => (
                    <option key={destination} value={destination}>{destination}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Study Level</label>
                <select
                  value={formData.studyLevel}
                  onChange={(e) => setFormData({...formData, studyLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select study level</option>
                  {studyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                <select
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({...formData, fieldOfStudy: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select field of study</option>
                  {fieldsOfStudy.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specific Questions or Goals</label>
              <textarea
                value={formData.specificQuestions}
                onChange={(e) => setFormData({...formData, specificQuestions: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us about your specific goals, questions, or any challenges you're facing..."
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.country}
                className="flex items-center"
              >
                Next Step <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Confirm Your Consultation</h2>
              <p className="text-gray-600">Review your details before booking</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Consultation Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">
                        {services.find(s => s.id === selectedService)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">
                        {consultationTypes.find(t => t.id === formData.consultationType)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {services.find(s => s.id === selectedService)?.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Your Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium">{formData.country}</span>
                    </div>
                    {formData.studyDestination && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Study Destination:</span>
                        <span className="font-medium">{formData.studyDestination}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium text-green-800">Free 30-Minute Consultation</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    No cost, no obligation. Get expert guidance on your study abroad journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
              <Button onClick={handleSubmit} size="lg" className="flex items-center">
                Confirm Booking <CheckCircle className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Consultation Booked!</h2>
              <p className="text-xl text-gray-600 mb-2">
                Thank you {formData.firstName}! Your consultation is confirmed.
              </p>
              <p className="text-gray-600">
                We've sent a confirmation email to {formData.email} with all the details.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm">Check your email for meeting details</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm">Add the event to your calendar</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-sm">Prepare any questions you have</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => window.location.href = '/'}>
                Return to Homepage
              </Button>
              <Button variant="outline" onClick={() => setStep(1)}>
                Book Another Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Benefits Section */}
      {step !== 5 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Why Choose Ailesglobal Consultation?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  {benefit.icon}
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
