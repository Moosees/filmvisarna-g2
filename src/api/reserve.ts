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

export const getScreeningDataQuery = async (screeningId: number) => {
  const response = await getAxios().get<ScreeningData>(`seats/${screeningId}`);
  console.log(response.data.message);

  return response.data.results;
};
