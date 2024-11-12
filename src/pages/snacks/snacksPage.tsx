import { Col, Container, Row } from 'react-bootstrap';
import { ScrollRestoration } from 'react-router-dom';
import Snacks from '../../components/snacks/snacks';
import CinemaTechnology from '../../components/cinema-technology/cinemaTechnology';

function SnacksPage() {
  return (
    <Container>
      <Row>
        <Col>
          <Snacks />
        </Col>
      </Row>

      <div id="teknik" className="row justify-content-center mt-4">
        <div className="bg-rosa text-dark text-center fs-5 fw-bold text-decoration-underline py-2 px-5 custom-rounded col-auto">
          {'Teknik'}
        </div>
      </div>

      <Row>
        <Col>
          <ScrollRestoration />
          <CinemaTechnology />
        </Col>
      </Row>
    </Container>
  );
}

export default SnacksPage;
