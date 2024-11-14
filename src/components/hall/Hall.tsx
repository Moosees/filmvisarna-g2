import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { CardImg, Col, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import { getAffectedSeats, type Seat } from './hallHelpers';

interface HallProps {
  numPersons: number;
  seatIds: number[];
  setSeatIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function Hall({ numPersons, seatIds, setSeatIds }: HallProps) {
  const [hovered, setHovered] = useState<number[]>([]);

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));

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
      <CardImg src={data.poster} className="rounded w-50" />
      {data.seats.map((row, rowIndex) => {
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
                  ${!free ? 'bg-rosa border-light' : seatIds.includes(seatId) ? 'bg-success' : 'bg-light'} ${hovered.includes(seatId) ? 'seat-hover' : ''}
                `}
              />
            ))}
          </Row>
        );
      })}
    </section>
  );
}

export default Hall;
