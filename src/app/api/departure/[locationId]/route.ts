export async function GET(request: Request, { params }: { params: { locationId: string } }) {
  //https://v6.bvg.transport.rest/locations?query=alexanderplatz&results=1

  const stationId = params.locationId;
  /*const data = await fetch(
    `https://v6.bvg.transport.rest/locations?query=${locationName}&results=1`
  );
  const locationData = await data.json();

  const stationId = locationData[0].location.id;

  console.log(locationData);*/

  console.log(`https://v6.bvg.transport.rest/stops/${stationId}/departures?results=10&duration=90`);

  const departureResponse = await fetch(
    `https://v6.bvg.transport.rest/stops/${stationId}/departures?results=10&duration=90`
  );
  const departureData = await departureResponse.json();

  return Response.json(departureData);
}
