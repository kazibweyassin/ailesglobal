import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/saved-programs - Get user's saved programs
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const savedPrograms = await prisma.savedProgram.findMany({
      where: { userId: user.id },
      include: {
        program: {
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
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ savedPrograms })
  } catch (error) {
    console.error('Get Saved Programs Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch saved programs' },
      { status: 500 }
    )
  }
}

// POST /api/saved-programs - Save a program
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { programId } = await request.json()

    if (!programId) {
      return NextResponse.json({ error: 'Program ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if program exists
    const program = await prisma.program.findUnique({
      where: { id: programId }
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Create or get existing saved program
    const savedProgram = await prisma.savedProgram.upsert({
      where: {
        userId_programId: {
          userId: user.id,
          programId: programId
        }
      },
      update: {},
      create: {
        userId: user.id,
        programId: programId
      },
      include: {
        program: {
          include: {
            university: true
          }
        }
      }
    })

    return NextResponse.json({ savedProgram }, { status: 201 })
  } catch (error) {
    console.error('Save Program Error:', error)
    return NextResponse.json(
      { error: 'Failed to save program' },
      { status: 500 }
    )
  }
}

// DELETE /api/saved-programs - Remove saved program
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')

    if (!programId) {
      return NextResponse.json({ error: 'Program ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.savedProgram.delete({
      where: {
        userId_programId: {
          userId: user.id,
          programId: programId
        }
      }
    })

    return NextResponse.json({ message: 'Program removed from saved list' })
  } catch (error) {
    console.error('Remove Saved Program Error:', error)
    return NextResponse.json(
      { error: 'Failed to remove saved program' },
      { status: 500 }
    )
  }
}
