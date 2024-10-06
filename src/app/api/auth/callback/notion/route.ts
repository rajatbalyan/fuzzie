import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const encoded = Buffer.from(
    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_API_SECRET}`
  ).toString('base64');

  console.log('Client ID:', process.env.NOTION_CLIENT_ID);
  console.log('Client Secret:', process.env.NOTION_API_SECRET);
  console.log('Authorization Header:', `Basic ${encoded}`);

  if (code) {
    try {
      const response = await axios.post('https://api.notion.com/v1/oauth/token', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NOTION_REDIRECT_URI!,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encoded}`,
          'Notion-Version': '2022-06-28',
        },
      });

      // Check if the response is successful
      if (response.status === 200) {
        const notion = new Client({
          auth: response.data.access_token,
        });

        const databasesPages = await notion.search({
          filter: {
            value: 'database',
            property: 'object',
          },
          sort: {
            direction: 'ascending',
            timestamp: 'last_edited_time',
          },
        });

        const databaseId = databasesPages?.results?.length
          ? databasesPages.results[0].id
          : '';

        console.log('Database ID:', databaseId);

        return NextResponse.redirect(
          `https://localhost:3000/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}`
        );
      } else {
        console.error('Failed to exchange code for access token:', response.data);
      }
    } catch (error) {
      console.error('Error during Notion OAuth callback:', error);
    }
  }

  return NextResponse.redirect('https://localhost:3000/connections');
}