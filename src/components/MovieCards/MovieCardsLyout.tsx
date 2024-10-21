import { Col, Container, Row } from 'react-bootstrap';
import { Children } from 'react';

interface MoviesCardsLayoutProps {
  children: React.ReactNode;
}

function MoviesCardsLayout({ children }: MoviesCardsLayoutProps) {
  return (
    <Container className="p-2">
      <Row className="g-2">
        {Children.map(children, (child) => (
          <Col xs={6} md={4} lg={3}>
            {child}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MoviesCardsLayout;
