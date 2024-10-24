import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getAxios } from './clients';

interface ScreeningData {
  message: string;
  results: {
    title: string;
    startTime: string;
    screeningId: number;
    auditorium: string;
    seats: { seatId: number; free: boolean }[][];
  };
}

async function getScreeningData(screeningId: number) {
  const response = await getAxios().get<ScreeningData>(`seats/${screeningId}`);
  console.log(response.data.message);

  return response.data.results;
}

export const getScreeningDataQuery = (screeningId: number) =>
  queryOptions({
    queryKey: ['screening', screeningId],
    queryFn: async () => await getScreeningData(screeningId),
  });

export const reserveLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.screeningId) throw new Error('Visnings-id saknas');

    await client.ensureQueryData(getScreeningDataQuery(+params.screeningId));

    return { screeningId: +params.screeningId };
  };
