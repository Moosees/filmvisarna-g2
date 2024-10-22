import { Col, Container, Row } from 'react-bootstrap';
import { Children } from 'react';

interface CardsWrapperProps {
  children: React.ReactNode;
}

function CardsWrapper({ children }: CardsWrapperProps) {
  return (
    <Container className="p-2  p-md-4 p-lg-5">
      <Row className="g-3 g-md-4 ">
        {Children.map(children, (child) => (
          <Col xs={6} md={4} lg={3}>
            {child}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardsWrapper;
