import { NextRequest, NextResponse } from 'next/server';
import { DocumentDataProps, DsbEntry } from '@/types/types';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { authToken } = body;
  const documentsData: DocumentDataProps[] = [];
  const data = await fetch(`https://mobileapi.dsbcontrol.de/dsbdocuments?authid=${authToken}`);
  const childData = await data.json();

  // Error messages are a bit short, without status code
  if (!childData[0]) {
    return NextResponse.json({ error: childData.Message });
  }

  childData.forEach((item: DsbEntry) => {
    documentsData.push({ id: item.Id, date: item.Date, title: item.Title, children: [] });
    item.Childs.forEach((child) => {
      documentsData[documentsData.length - 1].children.push({
        id: child.Id,
        date: child.Date,
        title: child.Title,
        detail: child.Detail,
      });
    });
  });

  return NextResponse.json(documentsData.reverse());
}
