import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are an AI study abroad advisor for AilesTravel, a platform that helps students find international education opportunities. Your role is to provide helpful, accurate, and encouraging advice about:

1. Study abroad programs and universities
2. Scholarship opportunities and applications
3. Visa requirements and processes
4. Application procedures and deadlines
5. Academic requirements and preparation
6. Cost of living and budgeting for study abroad
7. Career benefits of international education
8. Cultural adaptation and preparation

Guidelines:
- Be friendly, supportive, and encouraging
- Provide specific, actionable advice when possible
- If you don't know something, acknowledge it and suggest reliable resources
- Keep responses concise but informative
- Always emphasize the importance of checking official sources for the most current information
- Encourage students to pursue their international education dreams

Remember that students may be nervous or overwhelmed about studying abroad, so maintain a positive and reassuring tone.`

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Convert chat history to OpenAI format
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    })

    const responseMessage = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ message: responseMessage })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    // Fallback response when OpenAI is not available
    const fallbackResponses = [
      "I'd be happy to help you with your study abroad questions! However, I'm experiencing some technical difficulties right now. In the meantime, I recommend checking university websites directly for the most current information about programs and applications.",
      "That's a great question about studying abroad! While I'm having some connectivity issues, I can suggest that you explore our program database and consider factors like your field of study, preferred countries, and scholarship opportunities when making your decision.",
      "Thank you for your question! I'm currently unable to provide a detailed response, but I encourage you to research specific university requirements, visa processes, and application deadlines for your target programs. Feel free to try asking again in a moment!"
    ]
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return NextResponse.json({ message: randomResponse })
  }
}
