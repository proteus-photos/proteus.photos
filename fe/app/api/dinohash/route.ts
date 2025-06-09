import { NextResponse } from 'next/server';
import { dinohash } from '@proteus-labs/dinohash';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const hash = await dinohash(file);
        return NextResponse.json({ dinohash: hash });
    } catch (error) {
        console.error('Error computing dinohash:', error);
        return NextResponse.json({ error: 'Failed to compute dinohash' }, { status: 500 });
    }
} 