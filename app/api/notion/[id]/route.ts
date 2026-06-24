import { NotionAPI } from 'notion-client';
import { NextResponse } from 'next/server';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN_V2,
  activeUser: process.env.NOTION_ACTIVE_USER,
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recordMap = await notion.getPage(id, {
    fetchCollections: true,
  });

  if (!recordMap.collection_view) {
    recordMap.collection_view = {};
  }

  const collectionViewId = '3e9ad4ec-e99e-4942-8f2b-0155311b2832';

  if (!recordMap.collection_view[collectionViewId]) {
    recordMap.collection_view[collectionViewId] = {
      value: {
        id: collectionViewId,
        type: 'gallery',
        name: '갤러리 보기',
        format: {
          gallery_cover: { type: 'page_content' },
          gallery_cover_size: 'medium',
          gallery_cover_aspect: 'cover',
          gallery_properties: [
            { visible: true, property: 'title' },
            { visible: true, property: '{Ht[' },
            { visible: true, property: 'iLYG' },
          ],
        },
      },
    } as any;
  }

  return NextResponse.json(recordMap);
}