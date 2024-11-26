import { NextRequest, NextResponse } from 'next/server';
import { LoginRequestBody } from '@/types/types';

export async function POST(req: NextRequest) {
  const body: LoginRequestBody = (await req.json()) as LoginRequestBody;
  const { user, password } = body;
  const data = await fetch(
    `https://mobileapi.dsbcontrol.de/authid?user=${user}&password=${password}&bundleid=de.heinekingmedia.dsbmobile&appversion=35&osversion=22&pushid`,
    { cache: 'no-store' }
  );

  const authToken = await data.json();
  return NextResponse.json({ authToken: authToken });
}
