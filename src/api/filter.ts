import { QueryClient, queryOptions } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

async function getFilter(fromDate: string) {
  // axios stuff
}

export const getFilterQuery = (fromDate: string) =>
  queryOptions({
    queryKey: ['filter', fromDate],
    queryFn: async () => await getFilter(fromDate),
  });

export const filterLoader =
  (client: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    console.log(url);
    const fromDate = url.searchParams.get('startDatum') || null;
    console.log(fromDate);

    await client.ensureQueryData(getFilterQuery(fromDate));

    return null;
  };
