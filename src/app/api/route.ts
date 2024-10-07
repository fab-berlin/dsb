export async function GET() {
  const replacementData: string[] = [];
  let data = await fetch(
    'https://mobileapi.dsbcontrol.de/authid?user=userid&password=password&bundleid=de.heinekingmedia.dsbmobile&appversion=35&osversion=22&pushid',
    { cache: 'no-store' }
  );
  data = await fetch(`https://mobileapi.dsbcontrol.de/dsbtimetables?authid=${await data.json()}`);
  const childData = await data.json();

  for (const el of childData[0].Childs) {
    try {
      const response = await fetch(el.Detail);
      const detailData = await response.text();
      replacementData.push(detailData);
    } catch (e) {
      console.error(e);
    }
  }
  return Response.json(replacementData);
}
