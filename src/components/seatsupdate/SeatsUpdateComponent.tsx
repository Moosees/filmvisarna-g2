import { useEffect } from 'react';

interface Seat {
  seatId: number;
  free: boolean;
}

interface SeatUpdate {
  screeningId: number;
  updatedSeat: {
    seatId: number;
    free: boolean;
  };
}

interface UseSeatUpdateProps {
  screeningId: number;
  onSeatUpdate: (update: SeatUpdate) => void;
}

const SeatsUpdateComponent: React.FC<UseSeatUpdateProps> = ({
  screeningId,
  onSeatUpdate,
}) => {
  useEffect(() => {
    const eventSource = new EventSource(`/api/seats/updates/${screeningId}`);

    eventSource.onmessage = (event) => {
      const data: SeatUpdate = JSON.parse(event.data);
      console.log('Received seat update:', data);
      onSeatUpdate(data); // Pass the update to the provided handler
    };

    eventSource.onerror = () => {
      console.error('Error receiving seat updates');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [screeningId, onSeatUpdate]);

  return null; // This component does not render anything directly
};

export default SeatsUpdateComponent;
