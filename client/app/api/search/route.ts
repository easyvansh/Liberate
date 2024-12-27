import { NextRequest, NextResponse } from "next/server";
import { semanticSearch } from "../../lib/vector";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const results = await semanticSearch(query);
    return NextResponse.json({ matches: results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
