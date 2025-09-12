import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET() {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const totalcontinents = await prisma.continent.count()
    const activecontinents = await prisma.session.count({
      where: {
        expires: {
          gt: new Date()
        }
      }
    })
    
    const recentcontinents = await prisma.continent.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    })

    return NextResponse.json({
      totalcontinents,
      activecontinents,
      recentcontinents,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}