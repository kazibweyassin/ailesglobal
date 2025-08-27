import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { aiService } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
  const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, userProfile, currentPrograms } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const userId = session.user.email

    // Update user context with profile and current programs
    aiService.updateUserContext(userId, {
      userProfile,
      currentPrograms
    })

    // Get AI response with full context
    const response = await aiService.getChatResponse(userId, message)

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
  const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.email
    const context = aiService.getUserContext(userId)

    return NextResponse.json({
      conversationHistory: context?.conversationHistory || [],
      hasContext: !!context
    })

  } catch (error) {
    console.error('AI Chat Context API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get conversation history' },
      { status: 500 }
    )
  }
}
