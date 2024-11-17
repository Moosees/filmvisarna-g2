import { useEffect } from 'react';
import { getQueryClient } from '../api/clients';

const useSeatUpdate = () => {
  useEffect(() => {
    const eventSource = new EventSource(`/api/seatsupdates`);

    eventSource.onmessage = (event) => {
      const screeningId: number = JSON.parse(event.data);

      getQueryClient().invalidateQueries({
        queryKey: ['screening', screeningId],
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
};

export default useSeatUpdate;
