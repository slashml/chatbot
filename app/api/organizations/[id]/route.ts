import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const organizations = await prisma.organizations.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the organizations
        accounts: true, // Include organizations accounts
      },
    });

    if (!organizations) {
      return NextResponse.json({ message: 'organizations not found' }, { status: 404 });
    }

    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json({ message: 'Error fetching organizations' }, { status: 500 });
  }
}