import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const countries = await prisma.countries.findUnique({
      where: { id },
      include: {
        posts: true, // Include posts by the countries
        accounts: true, // Include countries accounts
      },
    });

    if (!countries) {
      return NextResponse.json({ message: 'countries not found' }, { status: 404 });
    }

    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ message: 'Error fetching countries' }, { status: 500 });
  }
}