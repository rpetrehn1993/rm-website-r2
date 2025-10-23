import { NextRequest, NextResponse } from 'next/server';
import { getFigmaFile, getFigmaImages, extractDesignTokens } from '@/lib/figma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get('fileKey');
  const action = searchParams.get('action') || 'file';

  if (!fileKey) {
    return NextResponse.json({ error: 'File key is required' }, { status: 400 });
  }

  try {
    switch (action) {
      case 'file':
        const file = await getFigmaFile(fileKey);
        if (!file) {
          return NextResponse.json({ error: 'Failed to fetch file' }, { status: 404 });
        }
        return NextResponse.json({ file });

      case 'tokens':
        const figmaFile = await getFigmaFile(fileKey);
        if (!figmaFile) {
          return NextResponse.json({ error: 'Failed to fetch file' }, { status: 404 });
        }
        const tokens = extractDesignTokens(figmaFile);
        return NextResponse.json({ tokens });

      case 'images':
        const nodeIds = searchParams.get('nodeIds')?.split(',') || [];
        if (nodeIds.length === 0) {
          return NextResponse.json({ error: 'Node IDs are required for images' }, { status: 400 });
        }
        const images = await getFigmaImages(fileKey, nodeIds);
        return NextResponse.json({ images });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Figma API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
