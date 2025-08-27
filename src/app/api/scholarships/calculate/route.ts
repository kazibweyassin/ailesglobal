import { NextRequest, NextResponse } from 'next/server'

interface ScholarshipProfile {
  gpa: number
  testScore: number // TOEFL/IELTS equivalent score
  field: string
  country: string
  degree: string // bachelor, master, phd
  financialNeed: number // 1-10 scale
  extracurriculars: number // 1-10 scale
  workExperience: number // years
}

export async function POST(request: NextRequest) {
  try {
    const profile: ScholarshipProfile = await request.json()

    // Simple scholarship eligibility algorithm
    let eligibilityScore = 0
    let scholarshipAmount = 0
    let eligibleScholarships: string[] = []

    // GPA scoring (40% weight)
    if (profile.gpa >= 3.8) eligibilityScore += 40
    else if (profile.gpa >= 3.5) eligibilityScore += 30
    else if (profile.gpa >= 3.0) eligibilityScore += 20
    else eligibilityScore += 10

    // Test score (20% weight)
    if (profile.testScore >= 110) eligibilityScore += 20
    else if (profile.testScore >= 100) eligibilityScore += 15
    else if (profile.testScore >= 90) eligibilityScore += 10
    else eligibilityScore += 5

    // Field-specific bonuses (10% weight)
    const highDemandFields = ['Computer Science', 'Engineering', 'Medicine', 'Data Science']
    if (highDemandFields.includes(profile.field)) {
      eligibilityScore += 10
    } else {
      eligibilityScore += 5
    }

    // Country-specific adjustments (10% weight)
    const countryBonuses: { [key: string]: number } = {
      'Germany': 8,
      'France': 7,
      'Netherlands': 9,
      'Canada': 6,
      'Australia': 5,
      'United States': 4,
      'United Kingdom': 3
    }
    eligibilityScore += countryBonuses[profile.country] || 5

    // Financial need (10% weight)
    eligibilityScore += profile.financialNeed

    // Extracurriculars and experience (10% weight)
    eligibilityScore += Math.min(profile.extracurriculars + profile.workExperience, 10)

    // Calculate scholarship amount based on score
    if (eligibilityScore >= 85) {
      scholarshipAmount = Math.floor(Math.random() * 20000) + 35000 // $35k-55k
      eligibleScholarships = [
        'Merit Excellence Scholarship',
        'International Leaders Grant',
        'Academic Achievement Award',
        'Field-Specific Research Grant'
      ]
    } else if (eligibilityScore >= 70) {
      scholarshipAmount = Math.floor(Math.random() * 15000) + 20000 // $20k-35k
      eligibleScholarships = [
        'Merit Scholarship',
        'International Student Grant',
        'Academic Progress Award'
      ]
    } else if (eligibilityScore >= 55) {
      scholarshipAmount = Math.floor(Math.random() * 10000) + 10000 // $10k-20k
      eligibleScholarships = [
        'Partial Tuition Grant',
        'Cultural Exchange Scholarship',
        'Study Abroad Support Fund'
      ]
    } else if (eligibilityScore >= 40) {
      scholarshipAmount = Math.floor(Math.random() * 7500) + 2500 // $2.5k-10k
      eligibleScholarships = [
        'Basic Support Grant',
        'Educational Assistance Fund'
      ]
    } else {
      scholarshipAmount = Math.floor(Math.random() * 2500) + 500 // $500-3k
      eligibleScholarships = [
        'Emergency Financial Aid',
        'Basic Educational Support'
      ]
    }

    // Calculate percentage chance
    const successRate = Math.min(Math.round((eligibilityScore / 100) * 100), 95)

    // Generate recommendations
    const recommendations = []
    
    if (profile.gpa < 3.5) {
      recommendations.push('Consider retaking courses to improve your GPA')
    }
    
    if (profile.testScore < 100) {
      recommendations.push('Improve your English test scores (TOEFL/IELTS)')
    }
    
    if (profile.extracurriculars < 6) {
      recommendations.push('Engage in more extracurricular activities and volunteer work')
    }
    
    if (profile.workExperience < 1 && profile.degree !== 'bachelor') {
      recommendations.push('Gain relevant work experience in your field')
    }

    return NextResponse.json({
      success: true,
      eligibilityScore,
      scholarshipAmount,
      successRate,
      eligibleScholarships,
      recommendations,
      analysis: {
        strengths: eligibilityScore >= 70 ? 
          ['Strong academic performance', 'Good test scores', 'Relevant experience'] :
          ['Basic qualifications met'],
        improvements: recommendations.length > 0 ? recommendations : ['Continue maintaining excellent performance'],
        timeline: 'Apply within the next 6 months for best chances'
      }
    })

  } catch (error) {
    console.error('Error calculating scholarship eligibility:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate scholarship eligibility' },
      { status: 500 }
    )
  }
}
