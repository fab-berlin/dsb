import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const user = process.env.SUNSHINE_USER;
    const password = process.env.SUNSHINE_PASSWORD;

    const data = await fetch(
      `https://ibs.sunshine-catering.de/IBS4/IBS4//login/login?identifierValue=${user}&secretValue=${password}&identifierType=0&secretType=0`,
      { cache: 'no-store', method: 'POST' }
    );

    const returnData = await data.json();
    const token = returnData.token;
    const foodData = await fetch('https://ibs.sunshine-catering.de/IBS4/IBS4//Mealplan/Weekplan', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const mealPlan = await foodData.text();

    // Return a proper response
    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error('Error processing request:', error);
    // @ts-expect-error error type unknown
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
