import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/universities - Fetch universities with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    
    if (country) {
      where.country = country
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [universities, total] = await Promise.all([
      prisma.university.findMany({
        where,
        include: {
          programs: {
            include: {
              scholarships: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { ranking: 'asc' }
      }),
      prisma.university.count({ where })
    ])

    return NextResponse.json({
      universities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Universities API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

// POST /api/universities - Create new university (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Add authentication check for admin role
    
    const university = await prisma.university.create({
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        website: body.website,
        logo: body.logo,
        ranking: body.ranking,
        description: body.description
      }
    })

    return NextResponse.json(university, { status: 201 })
  } catch (error) {
    console.error('Create University Error:', error)
    return NextResponse.json(
      { error: 'Failed to create university' },
      { status: 500 }
    )
  }
}
