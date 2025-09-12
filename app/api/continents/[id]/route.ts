import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const continents = await prisma.continents.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the continents
        accounts: true, // Include continents accounts
      },
    });

    if (!continents) {
      return NextResponse.json({ message: 'continents not found' }, { status: 404 });
    }

    return NextResponse.json(continents);
  } catch (error) {
    console.error('Error fetching continents:', error);
    return NextResponse.json({ message: 'Error fetching continents' }, { status: 500 });
  }
}