import React, { useEffect, useState } from 'react';
import { CardImg, Col, Row } from 'react-bootstrap';
import { getAffectedSeats, type Seat } from './hallHelpers';
import SeatsUpdateComponent from '../seatsupdate/SeatsUpdateComponent';

interface SeatUpdate {
  screeningId: number;
  updatedSeat: {
    seatId: number;
    free: boolean;
  };
}
interface HallProps {
  seats: Seat[][];
  poster: string;
  numPersons: number;
  seatIds: number[];
  setSeatIds: React.Dispatch<React.SetStateAction<number[]>>;
  screeningId: number;
}

function Hall({
  seats: initialSeats,
  poster,
  numPersons,
  seatIds,
  setSeatIds,
  screeningId,
}: HallProps) {
  const [hovered, setHovered] = useState<number[]>([]);
  const [seats, setSeats] = useState<Seat[][]>(initialSeats);

  const updateSeats = (seatUpdate: SeatUpdate) => {
    const { seatId, free } = seatUpdate.updatedSeat;
    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((seat) => (seat.seatId === seatId ? { ...seat, free } : seat))
      )
    );
  };

  useEffect(() => {
    setSeats(initialSeats);
  }, [initialSeats]);

  const handleClick = (seatIndex: number, row: Seat[]) => {
    setSeatIds(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  const handleMouseEnter = (seatIndex: number, row: Seat[]) => {
    setHovered(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  return (
    <section className="bg-rosa rounded d-flex flex-column py-2 align-items-center gap-1 container-fluid">
      <CardImg src={poster} className="rounded w-50" />
      {seats.map((row, rowIndex) => {
        return (
          <Row
            key={rowIndex}
            className="justify-content-center"
            onMouseLeave={() => setHovered([])}
          >
            {row.map(({ seatId, free }, i) => (
              <Col
                key={seatId}
                onClick={() => handleClick(i, row)}
                onMouseEnter={() => handleMouseEnter(i, row)}
                className={`border d-flex align-items-center justify-content-center p-2 rounded seat 
                  ${
                    !free
                      ? 'bg-rosa border-light'
                      : seatIds.includes(seatId)
                      ? 'bg-success'
                      : 'bg-light'
                  } ${hovered.includes(seatId) ? 'seat-hover' : ''}
                `}
              />
            ))}
          </Row>
        );
      })}
      <SeatsUpdateComponent
        screeningId={screeningId}
        onSeatUpdate={updateSeats}
      />
    </section>
  );
}

export default Hall;
