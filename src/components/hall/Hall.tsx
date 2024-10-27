import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

type seat = { seatId: number; free: boolean };

interface HallProps {
  seats: seat[][];
  numPersons: number;
}

const getAffectedSeats = (row: seat[], index: number, numPersons: number) => {
  if (!row[index].free) return []; // taken seats are not interactible
  if (numPersons < 1) return []; // can't reserve zero seats

  return [{ seatId: row[index].seatId, index }];
};

function Hall({ seats, numPersons }: HallProps) {
  const [clicked, setClicked] = useState<number[]>([]);

  const handleClick = (seatIndex: number, row: seat[]) => {
    console.log({ seatIndex, row, clicked: row[seatIndex] });

    setClicked(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  return (
    <Container className="d-flex flex-column bg-rosa py-4 align-items-center rounded col-sm-12 col-lg-5 col-xl-4">
      {seats.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} className="mb-2 d-flex justify-content-center">
            {row.map(({ seatId, free }, i) => (
              <Col
                key={seatId}
                onClick={() => handleClick(i, row)}
                className={`border d-flex align-items-center justify-content-center p-2 rounded seat ${free ? 'bg-light' : 'bg-rosa'} ${clicked.includes(seatId) ? 'border-danger border-2' : 'border-primary'}`}
              />
            ))}
          </Row>
        );
      })}
    </Container>
  );
}

export default Hall;
