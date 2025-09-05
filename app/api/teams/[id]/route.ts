import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the team
        accounts: true, // Include team accounts
      },
    });

    if (!team) {
      return NextResponse.json({ message: 'team not found' }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ message: 'Error fetching team' }, { status: 500 });
  }
}