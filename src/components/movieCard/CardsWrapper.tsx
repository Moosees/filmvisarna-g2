import { Col, Container, Row } from 'react-bootstrap';
import { Children } from 'react';

interface CardsWrapperProps {
  children: React.ReactNode;
}

function CardsWrapper({ children }: CardsWrapperProps) {
  return (
    <Container className="p-0 py-3">
      <Row className="g-1 g-md-3 ">
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
