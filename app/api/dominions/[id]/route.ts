import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const dominion = await prisma.dominion.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the dominion
        accounts: true, // Include dominion accounts
      },
    });

    if (!dominion) {
      return NextResponse.json({ message: 'dominion not found' }, { status: 404 });
    }

    return NextResponse.json(dominion);
  } catch (error) {
    console.error('Error fetching dominion:', error);
    return NextResponse.json({ message: 'Error fetching dominion' }, { status: 500 });
  }
}