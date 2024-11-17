import { useEffect } from 'react';

const useSeatUpdate = (screeningId: number) => {
  useEffect(() => {
    const eventSource = new EventSource(`/api/seats/updates/${screeningId}`);

    eventSource.onmessage = (event) => {
      const updateId: number = JSON.parse(event.data);
      console.log('Received seat update:', { updateId });
    };

    eventSource.onerror = () => {
      console.error('Error receiving seat updates');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [screeningId]);
};

export default useSeatUpdate;
