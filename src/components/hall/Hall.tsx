import { useState } from 'react';
import { Container, Row, Col, CardImg } from 'react-bootstrap';
import { getAffectedSeats, type Seat } from './hallHelpers.js';

interface HallProps {
  seats: Seat[][];
  poster: string;
  numPersons: number;
}

function Hall({ seats, poster, numPersons }: HallProps) {
  const [clicked, setClicked] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number[]>([]);

  const handleClick = (seatIndex: number, row: Seat[]) => {
    console.log({ seatIndex, row, clicked: row[seatIndex] });

    setClicked(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  const handleMouseEnter = (seatIndex: number, row: Seat[]) => {
    setHovered(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  return (
    <Container className="d-flex flex-column bg-rosa py-2 align-items-center rounded gap-1">
      <Row className="justify-content-center">
        <Col className="col-6">
          <CardImg src={poster} className="rounded" />
        </Col>
      </Row>
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
                  ${!free ? 'bg-dark' : clicked.includes(seatId) ? 'bg-rosa' : 'bg-light'} ${hovered.includes(seatId) ? 'seat-hover' : ''}
                `}
              />
            ))}
          </Row>
        );
      })}
    </Container>
  );
}

export default Hall;
