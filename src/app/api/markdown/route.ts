import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
    }

    // Ensure the file is from the mediatranscripts directory and is a markdown file
    if (!file.endsWith('.md')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'mediatranscripts', file);

    // Read the file content
    const content = await fs.readFile(filePath, 'utf8');

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
  }
}