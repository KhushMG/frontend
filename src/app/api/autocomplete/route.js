import {NextResponse }from 'next/server'

export async function GET(req) { 
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({error: 'Query parameter missing'}, {status: 400});
  }

  const res = await fetch(
    `https://anime-rec-backend-127821879142.us-west2.run.app/autocomplete/?query=${query}`
  );
  const data = await res.json()

  return NextResponse.json(data);
}