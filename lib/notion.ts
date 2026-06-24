import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 공식 클라이언트 - DB 목록용
const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 비공식 클라이언트 - 페이지 렌더링용
export const notion = new NotionAPI();

export async function getProjects() {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  return response.results;
}

export async function getPage(pageId: string) {
  return await notion.getPage(pageId);
}