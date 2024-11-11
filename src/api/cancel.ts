import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom';
import { getAxios } from './clients';

export interface CancelReservationData {
  bookingNumber: string;
}

async function deleteReservation(bookingNumber: string) {
  const response = await getAxios().delete<{ message: string }>(
    `/reservation/${bookingNumber}`
  );
  return response.data;
}

export const getCancelBookingDataQuery = (bookingNumber: string) => ({
  queryKey: ['cancelBooking', bookingNumber],
  queryFn: () => deleteReservation(bookingNumber),
});

export const cancelLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const bookingNumber = params?.reservationNum;

    if (!bookingNumber) throw new Error('Bokningsnummer saknas');

    await client.fetchQuery(getCancelBookingDataQuery(bookingNumber));

    return { bookingNumber };
  };

export const cancelAction = async ({ params }: ActionFunctionArgs) => {
  const bookingNumber = params?.reservationNum;

  if (!bookingNumber) return 'Bokningsnummer saknas';

  try {
    await deleteReservation(bookingNumber);
    return redirect(`/avbokning/bekräftad`);
  } catch (error) {
    return handleCancellationError(error);
  }
};

function handleCancellationError(error: unknown) {
  if (
    axios.isAxiosError(error) &&
    (error.response?.data?.message || error.response?.data?.error)
  ) {
    return error.response.data.message || error.response.data.error;
  }
  return 'Din avbokning kunde inte slutföras, var god försök igen eller kontakta oss på filmvisarnabio@gmail.com';
}
