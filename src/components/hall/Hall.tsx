import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { CardImg, Col, Row } from 'react-bootstrap';
import { Film, SlashCircle } from 'react-bootstrap-icons';
import { useLoaderData } from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import { getAffectedSeats, type Seat } from './hallHelpers';

interface HallProps {
  splitSeats: boolean;
  numPersons: number;
  seatIds: number[];
  setSeatIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function Hall({ splitSeats, numPersons, seatIds, setSeatIds }: HallProps) {
  const [hovered, setHovered] = useState<number[]>([]);

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));

  const handleClick = (seatIndex: number, row: Seat[]) => {
    const { free, seatId } = row[seatIndex];
    if (!free) return;

    if (!splitSeats) {
      setSeatIds(
        getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
      );
      return;
    }

    if (seatIds.includes(seatId)) {
      setSeatIds((ids) => ids.filter((id) => id !== seatId));
    } else {
      setSeatIds((ids) => [...ids, seatId]);
    }
  };

  const handleMouseEnter = (seatIndex: number, row: Seat[]) => {
    if (!splitSeats) {
      setHovered(
        getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
      );
    } else {
      setHovered(row[seatIndex].free ? [row[seatIndex].seatId] : []);
    }
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
            {row.map(({ seatId, free }, i) => {
              const isHovered = hovered.includes(seatId);
              const isSelected = seatIds.includes(seatId);
              return (
                <Col
                  key={seatId}
                  onClick={() => handleClick(i, row)}
                  onMouseEnter={() => handleMouseEnter(i, row)}
                  className={`border d-flex align-items-center justify-content-center p-0 rounded seat 
                  ${!free ? 'bg-rosa border-light' : isSelected ? 'bg-success' : 'bg-light'} ${isHovered ? 'seat-hover' : ''}
                `}
                >
                  {!free && <SlashCircle size="90%" />}
                  {isSelected && <Film size="80%" />}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </section>
  );
}

export default Hall;
