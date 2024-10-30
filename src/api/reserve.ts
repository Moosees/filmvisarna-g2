import { QueryClient, queryOptions } from '@tanstack/react-query';
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
import { getAxios } from './clients';

export interface ScreeningData {
  title: string;
  startTime: string;
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
  });

export const reserveLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.screeningId) throw new Error('Visnings-id saknas');

    await client.ensureQueryData(getScreeningDataQuery(+params.screeningId));

    return { screeningId: +params.screeningId };
  };

async function postReservation(reservationData: PostReservationData) {
  console.log({ reservationData });
  const response = await getAxios().post('reservation', reservationData);
  console.log(response);

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

  if (!params.screeningId) return 'Bokningen är inte korrekt';

  await postReservation({ ...data, screeningId: +params.screeningId });

  return 'Test';
};
