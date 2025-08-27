import { NextRequest, NextResponse } from 'next/server'
import { mockPrograms } from '@/data/programs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const country = searchParams.get('country')
  const field = searchParams.get('field')
  const minBudget = searchParams.get('minBudget')
  const maxBudget = searchParams.get('maxBudget')
  const limit = searchParams.get('limit')

  try {
    let filteredPrograms = [...mockPrograms]

    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase()
      filteredPrograms = filteredPrograms.filter(program =>
        program.name?.toLowerCase().includes(searchTerm) ||
        program.university?.toLowerCase().includes(searchTerm) ||
        program.country?.toLowerCase().includes(searchTerm) ||
        program.field?.toLowerCase().includes(searchTerm)
      )
    }

    // Filter by country
    if (country) {
      filteredPrograms = filteredPrograms.filter(program =>
        program.country?.toLowerCase().includes(country.toLowerCase())
      )
    }

    // Filter by field
    if (field) {
      filteredPrograms = filteredPrograms.filter(program =>
        program.field?.toLowerCase().includes(field.toLowerCase())
      )
    }

    // Filter by budget range
    if (minBudget || maxBudget) {
      const min = minBudget ? parseInt(minBudget) : 0
      const max = maxBudget ? parseInt(maxBudget) : Infinity
      
      filteredPrograms = filteredPrograms.filter(program => {
        const tuition = program.tuitionFee || 0
        return tuition >= min && tuition <= max
      })
    }

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit)
      filteredPrograms = filteredPrograms.slice(0, limitNum)
    }

    return NextResponse.json({
      success: true,
      programs: filteredPrograms,
      total: filteredPrograms.length,
      filters: {
        query,
        country,
        field,
        minBudget,
        maxBudget
      }
    })

  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { filters } = body

    // In a real app, you'd save user preferences or perform more complex filtering
    // For now, just return filtered results based on the body
    let filteredPrograms = [...mockPrograms]

    if (filters?.country) {
      filteredPrograms = filteredPrograms.filter(program =>
        program.country?.toLowerCase().includes(filters.country.toLowerCase())
      )
    }

    if (filters?.field) {
      filteredPrograms = filteredPrograms.filter(program =>
        program.field?.toLowerCase().includes(filters.field.toLowerCase())
      )
    }

    if (filters?.budgetRange) {
      const [min, max] = filters.budgetRange
      filteredPrograms = filteredPrograms.filter(program => {
        const tuition = program.tuitionFee || 0
        return tuition >= min && tuition <= max
      })
    }

    return NextResponse.json({
      success: true,
      programs: filteredPrograms,
      total: filteredPrograms.length,
      message: 'Programs filtered successfully'
    })

  } catch (error) {
    console.error('Error filtering programs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to filter programs' },
      { status: 500 }
    )
  }
}
