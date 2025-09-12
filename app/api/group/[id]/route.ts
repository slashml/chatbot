import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the group
        accounts: true, // Include group accounts
      },
    });

    if (!group) {
      return NextResponse.json({ message: 'group not found' }, { status: 404 });
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json({ message: 'Error fetching group' }, { status: 500 });
  }
}