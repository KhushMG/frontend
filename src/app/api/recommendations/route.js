import { NextResponse } from "next/server";

export async function POST(req) { 
  const body = await req.json();
  const { anime_name } = body;

  if (!anime_name) { 
    return NextResponse.json({error: "Anime name is missing"}, {status: 400})
  }

  const res = await fetch(
    "https://anime-rec-backend-127821879142.us-west2.run.app/recommendations/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ anime_name }),
    }
  );

  if (!response.ok) { 
    return NextResponse.json({error: "failed to fetch recommendations"}, {status:500});
  }

  const data = await response.json()
  return NextResponse.json(data);
}