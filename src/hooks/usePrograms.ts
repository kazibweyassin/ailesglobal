import { useState, useEffect } from 'react'

interface Program {
  id: string
  title: string
  description: string
  university: {
    id: string
    name: string
    country: string
    city: string
    ranking: number
    logo?: string
  }
  degree: string
  field: string
  duration: number
  tuitionFee: number
  currency: string
  country: string
  city: string
  scholarships: Array<{
    id: string
    name: string
    amount: number
    currency: string
    type: string
    deadline: string
  }>
  popularityScore: number
  hasScholarships: boolean
  maxScholarshipAmount: number
}

interface ProgramFilters {
  country?: string
  field?: string
  degree?: string
  search?: string
  minTuition?: number
  maxTuition?: number
  page?: number
  limit?: number
}

interface UseProgramsResult {
  programs: Program[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  filters: {
    countries: Array<{ value: string; count: number }>
    fields: Array<{ value: string; count: number }>
    degrees: Array<{ value: string; count: number }>
  }
  refetch: () => void
}

export function usePrograms(filters: ProgramFilters = {}): UseProgramsResult {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  })
  const [availableFilters, setAvailableFilters] = useState({
    countries: [],
    fields: [],
    degrees: []
  })

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      setError(null)

      const searchParams = new URLSearchParams()
      
      if (filters.country) searchParams.set('country', filters.country)
      if (filters.field) searchParams.set('field', filters.field)
      if (filters.degree) searchParams.set('degree', filters.degree)
      if (filters.search) searchParams.set('search', filters.search)
      if (filters.minTuition) searchParams.set('minTuition', filters.minTuition.toString())
      if (filters.maxTuition) searchParams.set('maxTuition', filters.maxTuition.toString())
      if (filters.page) searchParams.set('page', filters.page.toString())
      if (filters.limit) searchParams.set('limit', filters.limit.toString())

      const response = await fetch(`/api/programs/dynamic?${searchParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch programs')
      }

      const data = await response.json()
      
      setPrograms(data.programs)
      setPagination(data.pagination)
      setAvailableFilters(data.filters)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching programs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [
    filters.country,
    filters.field,
    filters.degree,
    filters.search,
    filters.minTuition,
    filters.maxTuition,
    filters.page,
    filters.limit
  ])

  return {
    programs,
    loading,
    error,
    pagination,
    filters: availableFilters,
    refetch: fetchPrograms
  }
}

// Hook for saved programs
export function useSavedPrograms() {
  const [savedPrograms, setSavedPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSavedPrograms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/saved-programs')
      
      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated
          setSavedPrograms([])
          return
        }
        throw new Error('Failed to fetch saved programs')
      }

      const data = await response.json()
      setSavedPrograms(data.savedPrograms.map((sp: any) => sp.program))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const saveProgram = async (programId: string) => {
    try {
      const response = await fetch('/api/saved-programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId })
      })

      if (!response.ok) {
        throw new Error('Failed to save program')
      }

      // Refresh saved programs
      fetchSavedPrograms()
      return true
    } catch (err) {
      console.error('Error saving program:', err)
      return false
    }
  }

  const removeSavedProgram = async (programId: string) => {
    try {
      const response = await fetch(`/api/saved-programs?programId=${programId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to remove saved program')
      }

      // Refresh saved programs
      fetchSavedPrograms()
      return true
    } catch (err) {
      console.error('Error removing saved program:', err)
      return false
    }
  }

  useEffect(() => {
    fetchSavedPrograms()
  }, [])

  return {
    savedPrograms,
    loading,
    error,
    saveProgram,
    removeSavedProgram,
    refetch: fetchSavedPrograms
  }
}
