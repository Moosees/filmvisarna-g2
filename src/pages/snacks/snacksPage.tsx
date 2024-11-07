import { Col, Container, Row } from 'react-bootstrap';
import { ScrollRestoration } from 'react-router-dom';
import Snacks from '../../components/snacks/snacks';
import CinemaTechnology from '../../components/cinema-technology/cinemaTechnology';

function SnacksPage() {
  return (
    <Container className="d-flex">
      <Row>
        <Col>
          <Snacks />
        </Col>

        <Col id="teknik">
          <ScrollRestoration />
          <CinemaTechnology />
        </Col>
      </Row>
    </Container>
  );
}

export default SnacksPage;
