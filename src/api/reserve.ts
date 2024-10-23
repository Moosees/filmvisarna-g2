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

async function getScreeningDataQuery(screeningId: number) {
  const response = await getAxios().get<ScreeningData>(`seats/${screeningId}`);
  console.log(response.data.message);

  return response.data.results;
}

export async function reserveLoader({ params }: LoaderFunctionArgs) {
  if (!params.screeningId) throw new Error('Visnings-id saknas');

  return await getScreeningDataQuery(+params.screeningId);
}
