import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { authToken } = body;
  const replacementData: string[] = [];
  const data = await fetch(`https://mobileapi.dsbcontrol.de/dsbtimetables?authid=${authToken}`);
  const childData = await data.json();

  // Error messages are a bit short, without status code
  if (!childData[0]) {
    return NextResponse.json({ error: childData.Message });
  }

  for (const el of childData[0].Childs) {
    try {
      const response = await fetch(el.Detail);
      const detailData = await response.text();
      replacementData.push(detailData);
    } catch (e) {
      console.error(e);
    }
  }
  return NextResponse.json(replacementData);
}
