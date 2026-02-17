'use client';

import { Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';
import { useEffect } from 'react';
import { useMeals } from '@/store/useMeals';
import MealDetail from '@/components/MealDetail';

export default function Page() {
  const { meals, parseMeals } = useMeals();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      const response = await fetch('/api/food', {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      parseMeals(data);
    };

    fetchData().catch((err) => {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
        // This is normal during cleanup, so we don't need to set an error state
      }
    });

    return () => controller.abort();
  }, [parseMeals]);

  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <h1 className={'mb-8 pt-4 text-2xl font-bold'}>Mittagessen</h1>
          <ul className={'flex flex-col gap-y-4'}>
            {meals.map((meal) => (
              <li key={meal.mealDate}>
                <MealDetail
                  mealName={meal.mealName}
                  mealDate={meal.mealDate}
                />
              </li>
            ))}
          </ul>
        </ViewArea>
      </Theme>
    </main>
  );
}
