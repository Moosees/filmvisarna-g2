import { Container, Row, Col } from 'react-bootstrap';
interface HallProps {
  seatRows: number[];
}

function Hall({ seatRows }: HallProps) {
  // const seatRows: number[] = [8, 9, 10, 10, 10, 10, 12, 12];

  return (
    <Container className="d-flex flex-column bg-rosa py-4 align-items-center rounded col-sm-12 col-lg-5 col-xl-4">
      {seatRows.map((seatCount, rowIndex) => (
        <Row key={rowIndex} className="mb-2 d-flex justify-content-center ">
          {Array.from({ length: seatCount }).map((_, colIndex) => {
            return (
              <Col
                key={colIndex}
                className={`border d-flex align-items-center justify-content-center p-2 rounded bg-light seat`}
              ></Col>
            );
          })}
        </Row>
      ))}
    </Container>
  );
}

export default Hall;
