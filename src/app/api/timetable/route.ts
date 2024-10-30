export async function GET() {
  const infoApiUrl = process.env.INFO_API_BASE_URL;
  const data = await fetch(`${infoApiUrl}/timetable/timetableHours.php`, { cache: 'no-store' });
  const timetable = await data.json();
  return Response.json(timetable);
}
