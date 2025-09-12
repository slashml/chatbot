import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const empires = await prisma.empires.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the empires
        accounts: true, // Include empires accounts
      },
    });

    if (!empires) {
      return NextResponse.json({ message: 'empires not found' }, { status: 404 });
    }

    return NextResponse.json(empires);
  } catch (error) {
    console.error('Error fetching empires:', error);
    return NextResponse.json({ message: 'Error fetching empires' }, { status: 500 });
  }
}