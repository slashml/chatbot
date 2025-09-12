import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const org = await prisma.org.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the org
        accounts: true, // Include org accounts
      },
    });

    if (!org) {
      return NextResponse.json({ message: 'org not found' }, { status: 404 });
    }

    return NextResponse.json(org);
  } catch (error) {
    console.error('Error fetching org:', error);
    return NextResponse.json({ message: 'Error fetching org' }, { status: 500 });
  }
}