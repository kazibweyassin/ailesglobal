import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Universities (use find-or-create to avoid requiring a unique `where` key)
  const universitySeedData = [
    {
      name: 'Harvard University',
      country: 'United States',
      city: 'Cambridge',
      website: 'https://www.harvard.edu',
      ranking: 1,
      description: 'Ivy League research university renowned for academic excellence and innovation.',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop'
    },
    {
      name: 'Massachusetts Institute of Technology',
      country: 'United States',
      city: 'Cambridge',
      website: 'https://www.mit.edu',
      ranking: 2,
      description: 'Leading institution in science, technology, engineering, and mathematics.',
      logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=200&fit=crop'
    },
    {
      name: 'University of Oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      website: 'https://www.ox.ac.uk',
      ranking: 1,
      description: 'The oldest university in the English-speaking world, renowned for academic excellence.',
      logo: 'https://images.unsplash.com/photo-1520637836862-4d197d17c962?w=200&h=200&fit=crop'
    },
    {
      name: 'University of Toronto',
      country: 'Canada',
      city: 'Toronto',
      website: 'https://www.utoronto.ca',
      ranking: 1,
      description: "Canada's leading research university with world-class programs and facilities.",
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop'
    }
  ]

  const universities = [] as any[]
  for (const u of universitySeedData) {
    let uni = await prisma.university.findFirst({ where: { name: u.name } })
    if (!uni) {
      uni = await prisma.university.create({ data: u })
    }
    universities.push(uni)
  }

  console.log('✅ Universities created')

  // Create Programs
  const programs = await Promise.all([
    // Harvard Programs
    prisma.program.upsert({
      where: { id: 'harvard-cs-bachelor' },
      update: {},
      create: {
        id: 'harvard-cs-bachelor',
        title: 'Bachelor of Science in Computer Science',
        description: 'Comprehensive computer science program covering algorithms, data structures, and software engineering.',
        universityId: universities[0].id,
        degree: 'Bachelor',
        field: 'Computer Science',
        duration: 48,
        language: 'English',
        startDates: [new Date('2025-09-01')],
        requirements: {
          gpa: 3.9,
          sat: { min: 1460, max: 1570 },
          toefl: 100,
          essays: true
        },
        gpaMin: 3.9,
        languageReqs: { toefl: 100, ielts: 7.0 },
        tuitionFee: 59076,
        currency: 'USD',
        country: 'United States',
        city: 'Cambridge',
        campus: 'Main Campus',
        ranking: 1,
        accreditation: ['AACSB', 'ABET'],
        tags: ['STEM', 'Research', 'Ivy League']
      }
    }),
    // MIT Programs
    prisma.program.upsert({
      where: { id: 'mit-ai-master' },
      update: {},
      create: {
        id: 'mit-ai-master',
        title: 'Master of Science in Artificial Intelligence',
        description: 'Advanced AI program focusing on machine learning, neural networks, and robotics.',
        universityId: universities[1].id,
        degree: 'Master',
        field: 'Artificial Intelligence',
        duration: 24,
        language: 'English',
        startDates: [new Date('2025-09-01')],
        requirements: {
          gpa: 3.96,
          gre: { min: 320 },
          toefl: 90,
          research: true
        },
        gpaMin: 3.96,
        languageReqs: { toefl: 90, ielts: 7.0 },
        tuitionFee: 59750,
        currency: 'USD',
        country: 'United States',
        city: 'Cambridge',
        campus: 'Main Campus',
        ranking: 1,
        accreditation: ['ABET'],
        tags: ['STEM', 'Research', 'AI', 'Technology']
      }
    }),
    // Oxford Programs
    prisma.program.upsert({
      where: { id: 'oxford-law-bachelor' },
      update: {},
      create: {
        id: 'oxford-law-bachelor',
        title: 'Bachelor of Arts in Law',
        description: 'Prestigious law program with focus on international and commercial law.',
        universityId: universities[2].id,
        degree: 'Bachelor',
        field: 'Law',
        duration: 36,
        language: 'English',
        startDates: [new Date('2025-10-01')],
        requirements: {
          aLevel: 'A*AA',
          ielts: 7.5,
          interview: true
        },
        gpaMin: 3.8,
        languageReqs: { ielts: 7.5, toefl: 110 },
        tuitionFee: 32760,
        currency: 'GBP',
        country: 'United Kingdom',
        city: 'Oxford',
        campus: 'City Centre',
        ranking: 1,
        accreditation: ['QAA'],
        tags: ['Law', 'Traditional', 'Prestigious']
      }
    })
  ])

  console.log('✅ Programs created')

  // Create Scholarships
  const scholarships = await Promise.all([
    prisma.scholarship.upsert({
      where: { id: 'harvard-merit-scholarship' },
      update: {},
      create: {
        id: 'harvard-merit-scholarship',
        name: 'Harvard Merit Scholarship',
        description: 'Full tuition scholarship for exceptional students.',
        amount: 59076,
        currency: 'USD',
        type: 'MERIT',
        programId: programs[0].id,
        eligibility: {
          gpa: 4.0,
          leadership: true,
          community_service: true
        },
        deadline: new Date('2025-01-01'),
        isActive: true
      }
    }),
    prisma.scholarship.upsert({
      where: { id: 'mit-research-fellowship' },
      update: {},
      create: {
        id: 'mit-research-fellowship',
        name: 'MIT Research Fellowship',
        description: 'Research-based fellowship for AI students.',
        amount: 30000,
        currency: 'USD',
        type: 'MERIT',
        programId: programs[1].id,
        eligibility: {
          gpa: 3.8,
          research_experience: true,
          publications: 'preferred'
        },
        deadline: new Date('2025-02-01'),
        isActive: true
      }
    })
  ])

  console.log('✅ Scholarships created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
