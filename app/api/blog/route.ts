import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}