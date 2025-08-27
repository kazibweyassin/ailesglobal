import { NextRequest, NextResponse } from 'next/server'
import { EnhancedAIService } from '@/lib/ai-service'
import { mockPrograms } from '@/data/programs'

const aiService = new EnhancedAIService()

export async function POST(request: NextRequest) {
  try {
    // For now, skip authentication check and use mock data
    // const session = await getServerSession()
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    
    const { userProfile, limit = 10 } = await request.json()

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile is required' }, { status: 400 })
    }

    const userId = 'demo-user' // Using demo user for now

    // Update user context
    aiService.updateUserContext(userId, { userProfile })

    // Filter programs based on basic criteria first
    let filteredPrograms = mockPrograms

    // Apply budget filter if provided
    if (userProfile.budgetRange) {
      const [minBudget, maxBudget] = userProfile.budgetRange
      filteredPrograms = filteredPrograms.filter(program => {
        if (!program.tuitionFee) return true // Include programs without fee info
        return program.tuitionFee >= minBudget && program.tuitionFee <= maxBudget
      })
    }

    // Apply field filter if provided
    if (userProfile.fieldOfInterest) {
      filteredPrograms = filteredPrograms.filter(program =>
        program.field.toLowerCase().includes(userProfile.fieldOfInterest.toLowerCase())
      )
    }

    // Apply country filter if provided
    if (userProfile.preferredCountries?.length) {
      filteredPrograms = filteredPrograms.filter(program =>
        userProfile.preferredCountries.some((country: string) =>
          program.country.toLowerCase().includes(country.toLowerCase())
        )
      )
    }

    // Get AI-powered recommendations
    const recommendations = await aiService.getPersonalizedRecommendations(
      userId,
      filteredPrograms.slice(0, 20) // Limit to 20 for AI processing
    )

    // Sort by score and limit results
    const sortedRecommendations = recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)

    return NextResponse.json({
      recommendations: sortedRecommendations,
      totalFound: filteredPrograms.length,
      aiProcessed: recommendations.length
    })

  } catch (error) {
    console.error('Recommendations API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}

// Get user's current recommendation preferences
export async function GET() {
  try {
    // For now, skip authentication and use demo user
    const userId = 'demo-user'
    const context = aiService.getUserContext(userId)

    return NextResponse.json({
      userProfile: context?.userProfile || null,
      hasProfile: !!context?.userProfile
    })

  } catch (error) {
    console.error('Recommendations GET API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    )
  }
}
