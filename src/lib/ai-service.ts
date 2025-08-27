import OpenAI from 'openai'
import { Program } from '@/types'

interface ChatContext {
  userId: string
  userProfile?: {
    academicBackground?: string
    fieldOfInterest?: string
    budgetRange?: [number, number] | null
    preferredCountries?: string[]
    currentApplications?: string[]
    gpa?: number
    testScores?: {
      toefl?: number
      ielts?: number
      gre?: number
      gmat?: number
    }
  }
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
  currentPrograms?: Program[]
}

export class EnhancedAIService {
  private openai: OpenAI
  private contextStore: Map<string, ChatContext> = new Map()

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  // Initialize or update user context
  updateUserContext(userId: string, updates: Partial<ChatContext>) {
    const existing = this.contextStore.get(userId) || {
      userId,
      conversationHistory: []
    }
    
    this.contextStore.set(userId, {
      ...existing,
      ...updates,
      userId
    })
  }

  // Get intelligent response with full context
  async getChatResponse(userId: string, message: string): Promise<string> {
    const context = this.contextStore.get(userId)
    if (!context) {
      throw new Error('User context not found')
    }

    // Add user message to history
    context.conversationHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    })

    try {
      const systemPrompt = this.buildSystemPrompt(context)
      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...context.conversationHistory.slice(-10).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }))
      ]

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 800
      })

      const assistantResponse = response.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.'

      // Add assistant response to history
      context.conversationHistory.push({
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      })

      // Update context store
      this.contextStore.set(userId, context)

      return assistantResponse
    } catch (error) {
      console.error('AI Chat Error:', error)
      return 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.'
    }
  }

  // Build context-aware system prompt
  private buildSystemPrompt(context: ChatContext): string {
    const { userProfile, currentPrograms } = context

    let prompt = `You are an expert study abroad counselor at AilesTravel. You help students find the perfect international education opportunities.

IMPORTANT GUIDELINES:
- Always be encouraging and supportive
- Provide specific, actionable advice
- Ask clarifying questions when needed
- Reference the user's profile information when relevant
- Suggest programs from our database when appropriate
- Be concise but comprehensive

`

    if (userProfile) {
      prompt += `USER PROFILE:
`
      if (userProfile.fieldOfInterest) {
        prompt += `- Field of Interest: ${userProfile.fieldOfInterest}
`
      }
      if (userProfile.budgetRange) {
        prompt += `- Budget Range: $${userProfile.budgetRange[0].toLocaleString()} - $${userProfile.budgetRange[1].toLocaleString()}
`
      }
      if (userProfile.preferredCountries?.length) {
        prompt += `- Preferred Countries: ${userProfile.preferredCountries.join(', ')}
`
      }
      if (userProfile.gpa) {
        prompt += `- GPA: ${userProfile.gpa}
`
      }
      if (userProfile.testScores) {
        const scores = Object.entries(userProfile.testScores)
          .filter(([, score]) => score)
          .map(([test, score]) => `${test.toUpperCase()}: ${score}`)
        if (scores.length) {
          prompt += `- Test Scores: ${scores.join(', ')}
`
        }
      }
    }

    if (currentPrograms?.length) {
      prompt += `
AVAILABLE PROGRAMS (reference these when making recommendations):
${currentPrograms.slice(0, 5).map(program => 
  `- ${program.name} in ${program.country} (${program.field}) - $${program.tuitionFee?.toLocaleString() || 'TBD'}/year`
).join('\n')}
`
    }

    prompt += `
Focus on helping the student make informed decisions about their international education journey.`

    return prompt
  }

  // Get program recommendations based on user profile
  async getPersonalizedRecommendations(userId: string, programs: Program[]): Promise<Array<{
    program: Program
    score: number
    reasoning: string
  }>> {
    const context = this.contextStore.get(userId)
    if (!context?.userProfile) {
      return []
    }

    try {
      const prompt = `Based on this student profile, rank and score these programs (0-100):

STUDENT PROFILE:
${JSON.stringify(context.userProfile, null, 2)}

PROGRAMS TO EVALUATE:
${programs.map((p, i) => `${i+1}. ${p.name} - ${p.country} - ${p.field} - $${p.tuitionFee || 'TBD'}/year`).join('\n')}

For each program, provide:
1. Compatibility score (0-100)
2. Brief reasoning (1-2 sentences)

Format as JSON array:
[
  {
    "programIndex": 0,
    "score": 85,
    "reasoning": "Excellent match for your Computer Science interests and budget range."
  }
]`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1000
      })

      const content = response.choices[0]?.message?.content
      if (!content) return []

      // Extract JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) return []

      const recommendations = JSON.parse(jsonMatch[0])
      
      interface RecommendationItem {
        programIndex: number
        score: number
        reasoning: string
      }
      
      return recommendations.map((rec: RecommendationItem) => ({
        program: programs[rec.programIndex],
        score: rec.score,
        reasoning: rec.reasoning
      })).filter((rec: { program: Program | undefined; score: number; reasoning: string }) => rec.program)

    } catch (error) {
      console.error('Recommendation Error:', error)
      return []
    }
  }

  // Analyze and provide feedback on essays/documents
  async analyzeDocument(userId: string, documentText: string, type: 'personal_statement' | 'essay' | 'sop'): Promise<{
    score: number
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }> {
    try {
      const prompt = `Analyze this ${type.replace('_', ' ')} and provide detailed feedback:

DOCUMENT:
${documentText}

Provide a JSON response with:
{
  "score": number (0-100),
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "suggestions": ["suggestion1", "suggestion2"]
}`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 800
      })

      const content = response.choices[0]?.message?.content
      if (!content) throw new Error('No response from AI')

      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('Invalid JSON response')

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Document Analysis Error:', error)
      return {
        score: 0,
        strengths: [],
        improvements: ['Unable to analyze document at this time'],
        suggestions: ['Please try again later']
      }
    }
  }

  // Get context for user (useful for debugging)
  getUserContext(userId: string): ChatContext | undefined {
    return this.contextStore.get(userId)
  }

  // Clear user context
  clearUserContext(userId: string): void {
    this.contextStore.delete(userId)
  }
}

export const aiService = new EnhancedAIService()
