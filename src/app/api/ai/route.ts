import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Enhanced AI system prompt for study abroad counseling
const SYSTEM_PROMPT = `You are AilesTravel AI, a world-class study abroad and scholarship advisor with expertise in:

1. **Academic Guidance**: University rankings, program quality, admission requirements
2. **Financial Planning**: Scholarship opportunities, cost analysis, funding strategies
3. **Cultural Adaptation**: Country-specific advice, cultural norms, lifestyle tips
4. **Visa & Immigration**: Requirements, processes, documentation needed
5. **Career Development**: Post-graduation opportunities, industry connections
6. **Application Strategy**: Timeline management, document preparation, interview prep

**Personality**: Professional yet friendly, encouraging, detail-oriented, culturally sensitive

**Response Style**:
- Provide specific, actionable advice
- Include relevant statistics and data when helpful
- Suggest concrete next steps
- Ask clarifying questions when needed
- Acknowledge cultural and financial constraints
- Be supportive and motivational

**Knowledge Areas**:
- Global university systems and rankings
- Scholarship databases and eligibility criteria
- Visa requirements for major study destinations
- Cost of living in different countries
- Academic calendar and application deadlines
- Language requirements (IELTS, TOEFL, etc.)
- Post-study work opportunities

Always aim to provide comprehensive, personalized guidance while being encouraging about the student's goals.`

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: number
}

interface UserProfile {
  educationLevel?: string
  fieldOfStudy?: string
  targetCountries?: string[]
  budgetRange?: { min: number; max: number }
  languageSkills?: string[]
  careerGoals?: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userProfile, context } = await request.json()

    // Enhanced context with user profile
    let enhancedMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ]

    // Add user profile context if available
    if (userProfile) {
      const profileContext = `User Profile:
${userProfile.educationLevel ? `Education Level: ${userProfile.educationLevel}` : ''}
${userProfile.fieldOfStudy ? `Field of Study: ${userProfile.fieldOfStudy}` : ''}
${userProfile.targetCountries ? `Interested Countries: ${userProfile.targetCountries.join(', ')}` : ''}
${userProfile.budgetRange ? `Budget: $${userProfile.budgetRange.min} - $${userProfile.budgetRange.max}` : ''}
${userProfile.languageSkills ? `Languages: ${userProfile.languageSkills.join(', ')}` : ''}
${userProfile.careerGoals ? `Career Goals: ${userProfile.careerGoals}` : ''}

Please tailor your advice based on this profile information.`

      enhancedMessages.push({ role: 'system', content: profileContext })
    }

    // Add conversation context if available
    if (context) {
      enhancedMessages.push({ role: 'system', content: `Additional Context: ${context}` })
    }

    // Add user messages
    enhancedMessages.push(...messages)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: enhancedMessages,
      max_tokens: 1500,
      temperature: 0.7,
      presence_penalty: 0.1,
    })

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.'

    return NextResponse.json({ 
      message: aiResponse,
      usage: completion.usage
    })

  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // Enhanced fallback responses based on common queries
    const fallbackResponses = {
      scholarship: "I'd be happy to help you find scholarship opportunities! Here are some general tips:\n\n1. **Merit-based scholarships**: Focus on maintaining high academic performance\n2. **Need-based aid**: Prepare financial documentation early\n3. **Country-specific programs**: Many countries offer special scholarships for international students\n4. **University scholarships**: Check directly with your target universities\n5. **External organizations**: Look into Fulbright, Chevening, DAAD, and other prestigious programs\n\nCould you tell me more about your academic background and target countries?",
      
      visa: "Visa requirements vary by country, but here's a general framework:\n\n1. **Student Visa Types**: F-1 (USA), Tier 4 (UK), Study Permit (Canada)\n2. **Required Documents**: Passport, acceptance letter, financial proof, health insurance\n3. **Financial Requirements**: Usually 1-2 years of expenses in bank statements\n4. **Processing Time**: 2-8 weeks typically\n5. **Interview Preparation**: Be ready to explain your study plans and future goals\n\nWhich country are you planning to study in?",
      
      application: "Here's a comprehensive application timeline:\n\n**12-18 months before**: Research programs, prepare for standardized tests\n**9-12 months before**: Take tests (TOEFL/IELTS, GRE/GMAT), request transcripts\n**6-9 months before**: Submit applications, write essays\n**3-6 months before**: Interview preparation, scholarship applications\n**1-3 months before**: Visa application, accommodation arrangements\n\nWhat stage are you currently at in your application process?",
      
      default: "I'm here to help with your study abroad journey! I can assist with:\n\n• University and program selection\n• Scholarship opportunities\n• Application strategies\n• Visa requirements\n• Cultural preparation\n• Financial planning\n\nWhat specific aspect would you like guidance on?"
    }

    // Determine appropriate fallback based on user message
    const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    let fallbackResponse = fallbackResponses.default

    if (userMessage.includes('scholarship') || userMessage.includes('funding')) {
      fallbackResponse = fallbackResponses.scholarship
    } else if (userMessage.includes('visa') || userMessage.includes('immigration')) {
      fallbackResponse = fallbackResponses.visa
    } else if (userMessage.includes('application') || userMessage.includes('apply')) {
      fallbackResponse = fallbackResponses.application
    }

    return NextResponse.json({ 
      message: fallbackResponse,
      error: 'AI service temporarily unavailable, showing helpful guidance instead.'
    })
  }
}

// New endpoint for personalized recommendations
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  
  try {
    // This would fetch user profile and generate personalized recommendations
    // For now, return sample recommendations
    const recommendations = {
      programs: [
        {
          id: '1',
          title: 'Computer Science Master - Technical University of Munich',
          match: 95,
          reason: 'Perfect match for your academic background and budget'
        },
        {
          id: '2', 
          title: 'Data Science MSc - University of Edinburgh',
          match: 88,
          reason: 'Strong program with excellent scholarship opportunities'
        }
      ],
      scholarships: [
        {
          id: '1',
          name: 'DAAD Master\'s Scholarship',
          amount: 25000,
          match: 92,
          deadline: '2025-03-15'
        }
      ],
      actions: [
        'Complete your TOEFL exam by February 2025',
        'Submit University of Munich application',
        'Prepare scholarship essay for DAAD program'
      ]
    }

    return NextResponse.json(recommendations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 })
  }
}
