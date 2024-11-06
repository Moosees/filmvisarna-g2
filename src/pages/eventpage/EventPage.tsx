import { Col, Container, Row } from 'react-bootstrap';

const EventPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Halloween</h2>
        </Col>
        <Col>
          <h2>Astrid Lindgren</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default EventPage;
