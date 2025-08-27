import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/programs/dynamic - Dynamic program search with database
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filter parameters
    const country = searchParams.get('country')
    const field = searchParams.get('field')
    const degree = searchParams.get('degree')
    const search = searchParams.get('search')
    const minTuition = searchParams.get('minTuition')
    const maxTuition = searchParams.get('maxTuition')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build dynamic where clause
    const where: any = {
      isActive: true
    }

    if (country) {
      where.country = country
    }

    if (field) {
      where.field = { contains: field, mode: 'insensitive' }
    }

    if (degree) {
      where.degree = degree
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { university: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (minTuition || maxTuition) {
      where.tuitionFee = {}
      if (minTuition) where.tuitionFee.gte = parseInt(minTuition)
      if (maxTuition) where.tuitionFee.lte = parseInt(maxTuition)
    }

    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        where,
        include: {
          university: {
            select: {
              id: true,
              name: true,
              country: true,
              city: true,
              ranking: true,
              logo: true
            }
          },
          scholarships: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              amount: true,
              currency: true,
              type: true,
              deadline: true
            }
          },
          _count: {
            select: {
              applications: true,
              savedBy: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { university: { ranking: 'asc' } },
          { title: 'asc' }
        ]
      }),
      prisma.program.count({ where })
    ])

    // Add computed fields
    const enhancedPrograms = programs.map(program => ({
      ...program,
      popularityScore: program._count.applications + program._count.savedBy,
      hasScholarships: program.scholarships.length > 0,
      maxScholarshipAmount: Math.max(...program.scholarships.map(s => s.amount), 0)
    }))

    return NextResponse.json({
      programs: enhancedPrograms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        countries: await getDistinctValues('country'),
        fields: await getDistinctValues('field'),
        degrees: await getDistinctValues('degree')
      }
    })
  } catch (error) {
    console.error('Dynamic Programs API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

// Helper function to get distinct filter values
async function getDistinctValues(field: string) {
  try {
    const result = await prisma.program.groupBy({
      by: [field as any],
      where: { isActive: true },
      _count: true,
      orderBy: { _count: { [field]: 'desc' } },
      take: 20
    })
    
    return result.map(item => ({
      value: item[field as keyof typeof item],
      count: item._count
    }))
  } catch (error) {
    console.error(`Error getting distinct ${field} values:`, error)
    return []
  }
}
