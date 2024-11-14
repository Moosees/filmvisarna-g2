import { QueryClient, queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom';
import { getAxios } from './clients';
import { toast } from 'react-toastify';

export interface ScreeningData {
  title: string;
  date: string;
  time: string;
  screeningId: number;
  poster: string;
  tickets: { ticketId: number; name: string; price: number }[];
  seats: { seatId: number; free: boolean }[][];
}

interface PostReservationData {
  email: string;
  screeningId: number;
  tickets: number[];
  seats: number[];
}

async function getScreeningData(screeningId: number) {
  const response = await getAxios().get<ScreeningData>(`seats/${screeningId}`);

  return response.data;
}

export const getScreeningDataQuery = (screeningId: number) =>
  queryOptions({
    queryKey: ['screening', screeningId],
    queryFn: async () => await getScreeningData(screeningId),
    refetchInterval: 3000,
  });

export const reserveLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.screeningId) throw new Error('Visnings-id saknas');

    await client.ensureQueryData(getScreeningDataQuery(+params.screeningId));

    return { screeningId: +params.screeningId };
  };

async function postReservation(reservationData: PostReservationData) {
  const response = await getAxios().post<{
    message: string;
    reservationNum: string;
  }>('reservation', reservationData);

  return response.data;
}

export const reserveAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as Omit<
    PostReservationData,
    'screeningId'
  >;

  if (!params.screeningId) return 'Bokningen är inte korrekt ifylld';

  try {
    const resData = await postReservation({
      ...data,
      screeningId: +params.screeningId,
    });

    toast.success('Vi har skickat en bokningsbekräftelse till din e-post');
    return redirect(`/bokning/${resData.reservationNum}`);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.data?.message || error.response?.data?.error)
    ) {
      return error.response.data.message || error.response.data.error;
    }
    return 'Din bokning kunde inte slutföras, var god försök igen eller kontakta oss på filmvisarnabio@gmail.com';
  }
};
