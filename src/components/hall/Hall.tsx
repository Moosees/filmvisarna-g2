import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface HallProps {
  seats: { seatId: number; free: boolean }[][];
  numPersons: number;
}

function Hall({ seats, numPersons }: HallProps) {
  const [clicked, setClicked] = useState<number[]>([]);

  const handleClick = (
    seatId: number,
    seatIndex: number,
    rowLength: number
  ) => {
    console.log({ seatId, seatIndex, rowLength, numPersons });

    setClicked([seatId]);
  };

  return (
    <Container className="d-flex flex-column bg-rosa py-4 align-items-center rounded col-sm-12 col-lg-5 col-xl-4">
      {seats.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} className="mb-2 d-flex justify-content-center">
            {row.map(({ seatId, free }, i) => (
              <Col
                key={seatId}
                onClick={() => handleClick(seatId, i, row.length)}
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
