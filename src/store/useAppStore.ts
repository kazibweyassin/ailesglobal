import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Program } from '@/types'

// Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'student' | 'admin'
}

export interface Application {
  id: string
  programId: string
  userId: string
  status: 'draft' | 'submitted' | 'under-review' | 'interview' | 'accepted' | 'rejected'
  submittedAt?: Date
  updatedAt: Date
  documents: Document[]
  notes?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// AI-related interfaces
export interface UserProfile {
  academicBackground?: string
  fieldOfInterest?: string
  budgetRange?: [number, number] | null
  preferredCountries?: string[]
  currentApplications?: string[]
  careerGoals?: string
  gpa?: number
  testScores?: {
    toefl?: number
    ielts?: number
    gre?: number
    gmat?: number
  }
}

export interface ProgramRecommendation {
  program: Program
  score: number
  reasoning: string
}

// Main App Store
interface AppStore {
  // User State
  user: User | null
  setUser: (user: User | null) => void
  
  // Search State
  searchQuery: string
  selectedCountry: string
  selectedField: string
  budgetRange: [number, number] | null
  setSearchQuery: (query: string) => void
  setSelectedCountry: (country: string) => void
  setSelectedField: (field: string) => void
  setBudgetRange: (range: [number, number] | null) => void
  
  // Programs State
  programs: Program[]
  featuredPrograms: Program[]
  filteredPrograms: Program[]
  savedPrograms: Program[]
  setPrograms: (programs: Program[]) => void
  setFeaturedPrograms: (programs: Program[]) => void
  filterPrograms: () => void
  saveProgram: (program: Program) => void
  unsaveProgram: (programId: string) => void
  
  // Applications State
  applications: Application[]
  setApplications: (applications: Application[]) => void
  addApplication: (application: Application) => void
  updateApplicationStatus: (id: string, status: Application['status']) => void
  
  // AI Chat State
  chatMessages: ChatMessage[]
  isTyping: boolean
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  setIsTyping: (typing: boolean) => void
  clearChat: () => void
  
  // AI Recommendations State
  userProfile: UserProfile | null
  recommendations: ProgramRecommendation[]
  isLoadingRecommendations: boolean
  updateUserProfile: (profile: Partial<UserProfile>) => void
  setRecommendations: (recommendations: ProgramRecommendation[]) => void
  setLoadingRecommendations: (loading: boolean) => void
  getPersonalizedRecommendations: () => Promise<void>
  sendChatMessage: (message: string) => Promise<string>
  
  // UI State
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  
  // Loading States
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // User State
      user: null,
      setUser: (user) => set({ user }),
      
      // Search State
      searchQuery: '',
      selectedCountry: '',
      selectedField: '',
      budgetRange: null,
      setSearchQuery: (searchQuery) => {
        set({ searchQuery })
        get().filterPrograms()
      },
      setSelectedCountry: (selectedCountry) => {
        set({ selectedCountry })
        get().filterPrograms()
      },
      setSelectedField: (selectedField) => {
        set({ selectedField })
        get().filterPrograms()
      },
      setBudgetRange: (budgetRange) => {
        set({ budgetRange })
        get().filterPrograms()
      },
      
      // Programs State
      programs: [],
      featuredPrograms: [],
      filteredPrograms: [],
      savedPrograms: [],
      setPrograms: (programs) => {
        set({ programs, filteredPrograms: programs })
        get().filterPrograms()
      },
      setFeaturedPrograms: (featuredPrograms) => set({ featuredPrograms }),
      filterPrograms: () => {
        const { programs, selectedCountry, selectedField, budgetRange, searchQuery } = get()
        
        const filtered = programs.filter(program => {
          const matchesCountry = !selectedCountry || program.country.toLowerCase().includes(selectedCountry.toLowerCase())
          const matchesField = !selectedField || program.field.toLowerCase().includes(selectedField.toLowerCase())
          const matchesBudget = !budgetRange || (program.tuitionFee && program.tuitionFee >= budgetRange[0] && program.tuitionFee <= budgetRange[1])
          const matchesSearch = !searchQuery || 
            program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (program.university && program.university.toLowerCase().includes(searchQuery.toLowerCase())) ||
            program.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
            program.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
            program.description.toLowerCase().includes(searchQuery.toLowerCase())
          
          return matchesCountry && matchesField && matchesBudget && matchesSearch
        })
        
        set({ filteredPrograms: filtered })
      },
      saveProgram: (program) => set(state => ({
        savedPrograms: state.savedPrograms.find(p => p.id === program.id) 
          ? state.savedPrograms 
          : [...state.savedPrograms, program]
      })),
      unsaveProgram: (programId) => set(state => ({
        savedPrograms: state.savedPrograms.filter(p => p.id !== programId)
      })),
      
      // Applications State
      applications: [],
      setApplications: (applications) => set({ applications }),
      addApplication: (application) => set(state => ({
        applications: [...state.applications, application]
      })),
      updateApplicationStatus: (id, status) => set(state => ({
        applications: state.applications.map(app =>
          app.id === id ? { ...app, status, updatedAt: new Date() } : app
        )
      })),
      
      // AI Chat State
      chatMessages: [],
      isTyping: false,
      addMessage: (message) => set(state => ({
        chatMessages: [...state.chatMessages, {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date()
        }]
      })),
      setIsTyping: (isTyping) => set({ isTyping }),
      clearChat: () => set({ chatMessages: [] }),
      
      // AI Recommendations State
      userProfile: null,
      recommendations: [],
      isLoadingRecommendations: false,
      updateUserProfile: (profile) => {
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile }
        }))
      },
      setRecommendations: (recommendations) => set({ recommendations }),
      setLoadingRecommendations: (isLoadingRecommendations) => set({ isLoadingRecommendations }),
      
      // AI API calls
      getPersonalizedRecommendations: async () => {
        const { userProfile, setLoadingRecommendations, setRecommendations } = get()
        
        if (!userProfile) return
        
        setLoadingRecommendations(true)
        try {
          const response = await fetch('/api/ai/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userProfile, limit: 10 })
          })
          
          if (response.ok) {
            const data = await response.json()
            setRecommendations(data.recommendations || [])
          }
        } catch (error) {
          console.error('Failed to get recommendations:', error)
        } finally {
          setLoadingRecommendations(false)
        }
      },
      
      sendChatMessage: async (message: string) => {
        const { userProfile, filteredPrograms, addMessage, setIsTyping } = get()
        
        // Add user message
        addMessage({ role: 'user', content: message })
        setIsTyping(true)
        
        try {
          const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message,
              userProfile,
              currentPrograms: filteredPrograms.slice(0, 10)
            })
          })
          
          if (response.ok) {
            const data = await response.json()
            addMessage({ role: 'assistant', content: data.response })
            return data.response
          } else {
            throw new Error('Failed to get AI response')
          }
        } catch (error) {
          console.error('Chat error:', error)
          const errorMessage = 'I apologize, but I\'m experiencing technical difficulties. Please try again.'
          addMessage({ role: 'assistant', content: errorMessage })
          return errorMessage
        } finally {
          setIsTyping(false)
        }
      },
      
      // UI State
      isMenuOpen: false,
      setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
      activeTab: 'dashboard',
      setActiveTab: (activeTab) => set({ activeTab }),
      
      // Loading States
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'ailestravel-store',
      partialize: (state) => ({
        user: state.user,
        selectedCountry: state.selectedCountry,
        selectedField: state.selectedField,
        budgetRange: state.budgetRange,
        applications: state.applications,
        chatMessages: state.chatMessages
      })
    }
  )
)
