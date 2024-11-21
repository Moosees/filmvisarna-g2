import { Col, Container, Row } from 'react-bootstrap';
import { Children, useState } from 'react';
import PrimaryBtn from '../buttons/PrimaryBtn';
import React from 'react';

interface CardsWrapperProps {
  children: React.ReactNode;
}

function CardsWrapper({ children }: CardsWrapperProps) {
  const [visibleCards, setVisibleCards] = useState(4);
  const totalChildren = React.Children.count(children);

  const showMoreCards = () => {
    setVisibleCards((prevVisible) => Math.min(prevVisible + 4, totalChildren));
  };

  return (
    <Container className="p-0 py-3">
      <Row className="g-1 g-md-3 justify-content-center">
        {Children.map(children, (child, index) =>
          index < visibleCards ? (
            <Col xs={6} md={4} lg={3} key={index}>
              {child}
            </Col>
          ) : null
        )}
      </Row>
      {visibleCards < totalChildren && (
        <div className="text-center mt-3">
          <PrimaryBtn onClick={showMoreCards}>Visa mer</PrimaryBtn>
        </div>
      )}
    </Container>
  );
}

export default CardsWrapper;
