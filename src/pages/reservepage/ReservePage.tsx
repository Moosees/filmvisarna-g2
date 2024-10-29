import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import Hall from '../../components/hall/Hall';
import TicketSelector from '../../components/hall/TicketSelector';
import { useState } from 'react';

function ReservePage() {
  const [numPersons, setNumPersons] = useState(0);

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));
  console.log({ data });

  return (
    <>
      <Hall seats={data.seats} numPersons={numPersons} />
      <TicketSelector setNumPersons={setNumPersons} />
    </>
  );
}

export default ReservePage;
