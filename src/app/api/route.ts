import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let authToken: string | undefined;

  try {
    const body = await req.json();
    authToken = body?.authToken;
  } catch {
    // Leerer/abgebrochener Body (z. B. durch AbortController im Dev-Modus)
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 });
  }

  if (!authToken) {
    return NextResponse.json({ error: 'Kein authToken übergeben' }, { status: 401 });
  }

  const res = await fetch(
    `https://mobileapi.dsbcontrol.de/dsbtimetables?authid=${encodeURIComponent(authToken)}`
  );
  const childData = await res.json();

  if (!childData?.[0]) {
    return NextResponse.json({ error: childData?.Message ?? 'Unbekannter Fehler' }, { status: 401 });
  }

  // Parallel statt nacheinander laden
  const results = await Promise.allSettled(
    childData[0].Childs.map((el: { Detail: string }) => fetch(el.Detail).then((r) => r.text()))
  );

  const replacementData = results
    .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
    .map((r) => r.value);

  return NextResponse.json(replacementData);
}
