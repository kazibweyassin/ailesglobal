import { Program } from '@/types'

export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Computer Science Master\'s Program - MIT',
    description: 'Advanced computer science program focusing on AI, machine learning, and software engineering.',
    country: 'United States',
    field: 'Computer Science',
    scholarshipAmount: 25000,
    deadline: '2025-03-15',
    eligibility: [
      'Bachelor\'s degree in Computer Science or related field',
      'GPA of 3.5 or higher',
      'GRE score of 320 or higher',
      'TOEFL score of 100 or higher (for international students)'
    ],
    applicationSteps: [
      'Submit online application',
      'Upload transcripts',
      'Submit GRE and TOEFL scores', 
      'Provide 3 letters of recommendation',
      'Write statement of purpose',
      'Pay application fee ($100)'
    ],
    university: 'Massachusetts Institute of Technology',
    duration: '2 years',
    language: 'English',
    tuitionFee: 55000
  },
  {
    id: '2',
    name: 'International Business MBA - Oxford',
    description: 'Comprehensive MBA program with focus on global business strategies and leadership.',
    country: 'United Kingdom',
    field: 'Business Administration',
    scholarshipAmount: 35000,
    deadline: '2025-04-30',
    eligibility: [
      'Bachelor\'s degree in any field',
      'Minimum 3 years work experience',
      'GMAT score of 700 or higher',
      'IELTS score of 7.5 or higher'
    ],
    applicationSteps: [
      'Complete online application',
      'Submit work experience documentation',
      'Provide GMAT scores',
      'Submit 2 professional references',
      'Attend interview (virtual/in-person)',
      'Pay application fee (£150)'
    ],
    university: 'University of Oxford',
    duration: '1.5 years',
    language: 'English',
    tuitionFee: 65000
  },
  {
    id: '3',
    name: 'Mechanical Engineering PhD - TU Berlin',
    description: 'Research-focused PhD program in mechanical engineering with emphasis on sustainable technology.',
    country: 'Germany',
    field: 'Engineering',
    scholarshipAmount: 18000,
    deadline: '2025-02-28',
    eligibility: [
      'Master\'s degree in Mechanical Engineering',
      'Research experience preferred',
      'German language proficiency (B2) or English (C1)',
      'Strong academic record'
    ],
    applicationSteps: [
      'Find a supervisor',
      'Submit research proposal',
      'Provide academic transcripts',
      'Submit language certificates',
      'Attend interview',
      'No application fee'
    ],
    university: 'Technical University of Berlin',
    duration: '3-4 years',
    language: 'German/English',
    tuitionFee: 0
  },
  {
    id: '4',
    name: 'Medicine (MBBS) - University of Sydney',
    description: 'Comprehensive medical degree program with clinical training in leading hospitals.',
    country: 'Australia',
    field: 'Medicine',
    scholarshipAmount: 30000,
    deadline: '2025-05-15',
    eligibility: [
      'Completed undergraduate degree with high GPA',
      'MCAT or GAMSAT scores',
      'IELTS/TOEFL scores for international students',
      'Relevant healthcare experience'
    ],
    applicationSteps: [
      'Submit UAC application',
      'Provide academic transcripts',
      'Submit MCAT/GAMSAT scores',
      'Complete MMI (Multiple Mini Interview)',
      'Health and police checks',
      'Pay application fee (AUD $100)'
    ],
    university: 'University of Sydney',
    duration: '6 years (including internship)',
    language: 'English',
    tuitionFee: 75000
  },
  {
    id: '5',
    name: 'Data Science Master\'s - ETH Zurich',  
    description: 'Interdisciplinary program combining statistics, computer science, and domain expertise.',
    country: 'Switzerland',
    field: 'Data Science',
    scholarshipAmount: 22000,
    deadline: '2025-03-31',
    eligibility: [
      'Bachelor\'s in Mathematics, Statistics, CS, or related field',
      'Strong mathematical background',
      'Programming experience (Python/R)',
      'English proficiency (C1 level)'
    ],
    applicationSteps: [
      'Online application submission',
      'Upload academic transcripts',
      'Submit English proficiency scores',
      'Provide CV and motivation letter',
      'Submit 2 letters of recommendation',
      'Application fee (CHF 150)'
    ],
    university: 'ETH Zurich',
    duration: '2 years',
    language: 'English',
    tuitionFee: 1500
  },
  {
    id: '6',
    name: 'Psychology PhD - University of Toronto',
    description: 'Research-intensive doctoral program in clinical and experimental psychology.',
    country: 'Canada',
    field: 'Psychology',
    scholarshipAmount: 28000,
    deadline: '2025-01-15',
    eligibility: [
      'Master\'s degree in Psychology',
      'Research experience and publications',
      'GRE scores (recommended)',
      'Strong letters of recommendation'
    ],
    applicationSteps: [
      'Contact potential supervisors',
      'Submit online application',
      'Provide academic transcripts',
      'Submit GRE scores (if available)',
      'Write research statement',
      'Pay application fee (CAD $125)'
    ],
    university: 'University of Toronto',
    duration: '4-6 years',
    language: 'English',
    tuitionFee: 28000
  },
  {
    id: '7',
    name: 'Architecture Master\'s - Politecnico di Milano',
    description: 'Advanced architecture program focusing on sustainable design and urban planning.',
    country: 'Italy',
    field: 'Architecture',
    scholarshipAmount: 15000,
    deadline: '2025-04-15',
    eligibility: [
      'Bachelor\'s degree in Architecture or related field',
      'Portfolio of design work',
      'Italian (B2) or English (B2) proficiency',
      'Entrance examination'
    ],
    applicationSteps: [
      'Submit online application',
      'Upload portfolio',
      'Provide academic transcripts',
      'Submit language certificates',
      'Take entrance exam',
      'Pay application fee (€50)'
    ],
    university: 'Politecnico di Milano',
    duration: '2 years',
    language: 'Italian/English',
    tuitionFee: 4000
  },
  {
    id: '8',
    name: 'Environmental Science Master\'s - University of Copenhagen',
    description: 'Interdisciplinary program addressing climate change and environmental sustainability.',
    country: 'Denmark',
    field: 'Environmental Science',
    scholarshipAmount: 20000,
    deadline: '2025-02-01',
    eligibility: [
      'Bachelor\'s in Environmental Science, Biology, or related field',
      'English proficiency (IELTS 6.5+)',
      'Relevant coursework in environmental studies',
      'Academic excellence (top 25%)'
    ],
    applicationSteps: [
      'Submit application through optagelse.dk',
      'Upload academic documents',
      'Submit English proficiency scores',
      'Write motivation letter',
      'No application fee for EU/EEA students',
      'Application fee (DKK 750) for non-EU students'
    ],
    university: 'University of Copenhagen',
    duration: '2 years',
    language: 'English',
    tuitionFee: 15000
  }
]

export const countries = Array.from(new Set(mockPrograms.map(p => p.country))).sort()
export const fields = Array.from(new Set(mockPrograms.map(p => p.field))).sort()
