import { Container, Row, Col } from 'react-bootstrap';

interface HallProps {
  seats: { seatId: number; free: boolean }[][];
}

function Hall({ seats }: HallProps) {
  return (
    <Container className="d-flex flex-column bg-rosa py-4 align-items-center rounded col-sm-12 col-lg-5 col-xl-4">
      {seats.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} className="mb-2 d-flex justify-content-center">
            {row.map(({ seatId, free }) => (
              <Col
                key={seatId}
                className={`border d-flex align-items-center justify-content-center p-2 rounded seat ${free ? 'bg-light' : 'bg-rosa'}`}
              />
            ))}
          </Row>
        );
      })}
    </Container>
  );
}

export default Hall;
