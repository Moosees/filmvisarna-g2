import { QueryClient, queryOptions } from '@tanstack/react-query';
import { getAxios } from './clients';

interface RootData {
  isLoggedIn: boolean;
}

async function getRootData() {
  const response = await getAxios().get<RootData>(`ping`);

  return response.data.isLoggedIn;
}

export const getRootDataQuery = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: getRootData,
  });

export const rootLoader = (client: QueryClient) => async () => {
  await client.ensureQueryData(getRootDataQuery());

  return null;
};
