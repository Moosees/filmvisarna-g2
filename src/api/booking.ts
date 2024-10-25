import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { getAxios } from './clients';

interface ReservationData {
  reservationNumber: string;
  title: string;
  startDate: string;
  timeRange: string;
  auditoriumName: string;
  ticketDetails: string;
  totalPrice: string;
  seats: Seat[];
}

export interface Seat {
  row: number;
  number: number;
  seatId: number;
}

//-------------BOOKING-INFORMATION---------------
async function getBookingData(bookingNumber: string) {
  const response = await getAxios().get<ReservationData>(
    `/reservation/${bookingNumber}`
  );

  return response.data;
}

export const getBookingDataQuery = (bookingNumber: string) =>
  queryOptions({
    queryKey: ['booking', bookingNumber],
    queryFn: async () => await getBookingData(bookingNumber),
  });

export const bookingLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const bookingNumber = params.reservationNum;

    if (!bookingNumber) {
      throw new Error('Bokingsnummer saknas');
    }

    await client.ensureQueryData(getBookingDataQuery(bookingNumber));

    return { bookingNumber };
  };
