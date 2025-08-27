export interface Program {
  id: string
  name: string
  description: string
  country: string
  field: string
  degree: string
  scholarshipAmount: number
  deadline: string
  eligibility: string[]
  applicationSteps: string[]
  university?: string
  duration?: string
  language?: string
  tuitionFee?: number
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface SavedProgram {
  userId: string
  programId: string
  savedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SearchFilters {
  country?: string
  field?: string
  hasScholarship?: boolean
  maxDeadlineDays?: number
  searchQuery?: string
}
