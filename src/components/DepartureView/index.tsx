'use client';

import { useEffect } from 'react';
import { Avatar, Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { useDepartureStore } from '@/app/store/useDeparture';

const DepartureView = () => {
  const { parseAndSetStations, stationList } = useDepartureStore();

  const fetchDepartureData = async (id: string) => {
    const response = await fetch(`/api/departure/${id}`);
    const data = await response.json();
    console.log('DepartureData', data);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/config/departure.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        await parseAndSetStations(data);
      } catch (error) {
        console.error('Could not fetch station data:', error);
      }
    }

    fetchData();
  }, [parseAndSetStations]);

  useEffect(() => {
    console.log('SL', stationList);
  }, [stationList]);

  return (
    <>
      <Grid
        columns={{ initial: '1', md: '2', lg: '4' }}
        gap={'4'}
      >
        {stationList.map((station) => (
          <Card
            key={station.id}
            size={'3'}
            variant={'classic'}
            className={'cursor-pointer hover:before:bg-amber-500 active:before:bg-amber-500'}
            onClick={() => {
              fetchDepartureData(station.id);
            }}
          >
            <Flex
              gap={'3'}
              align={'center'}
            >
              <Avatar
                fallback={'H'}
                size={'3'}
              />

              <Box>
                <Text as="div">{station.label}</Text>
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default DepartureView;
