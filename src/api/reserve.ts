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

interface ReservationData {
  results: {
    reservationNumber: string;
    title: string;
    startDate: string;
    timeRange: string;
    auditoriumName: string;
    ticketDetails: string;
    totalPrice: string;
    seats: Seat[];
  };
}

interface Seat {
  row: number;
  number: number;
  seatId: number;
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

//-------------BOOKING-INFORMATION---------------
async function getBookingData(bookingNumber: string) {
  const response = await getAxios().get<ReservationData>(
    `/bekräftelse/${bookingNumber}`
  );

  return response.data.results;
}

export const getBookingDataQuery = (bookingNumber: string) =>
  queryOptions({
    queryKey: ['booking', bookingNumber],
    queryFn: async () => await getBookingData(bookingNumber),
  });

export const bookingLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const bookingNumber = params.bookingNumber;

    if (!params.bookingNumber) throw new Error('Bokingsnummer saknas');

    await client.ensureQueryData(getScreeningDataQuery(+params.bookingNumber));

    return { bookingNumber };
  };
