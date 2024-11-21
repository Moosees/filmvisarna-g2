import { Container, Row, Col } from 'react-bootstrap';
import { Link, ScrollRestoration } from 'react-router-dom';
import LogoText from '../../assets/images/logoText.svg';
import MainHeading from '../../components/mainHeading/MainHeading';

function AboutPage() {
  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Container className=" mb-5 rounded bg-rosa p-3 p-lg-4">
          <ScrollRestoration />
          <Row className="align-items-center">
            <Col className="text-center">
              <h4 className="text-black">
                Filmvisarna – Där 80-talet lever vidare!
              </h4>
            </Col>
          </Row>
          <Row>
            <Col className="text-center custom-letterSpacing-technology">
              <p className="text-black ">
                Filmvisarna är en nyöppnad biograf med två moderna och bekväma
                salonger. Vi strävar efter att skapa en nostalgisk
                filmupplevelse med inspiration från ikoniska filmer från
                80-talet.
              </p>
              <p className="text-black ">
                Atmosfären präglas av neonljus, färgstarka affischer och
                autentiska detaljer från 80-talets stora filmverk.
              </p>
              <p className="text-black ">
                Filmvisarna är en perfekt plats för att återuppleva
                actionfilmer, romantiska komedier och kultklassiker från science
                fiction-genren. Välkomna tillbaka till 80-talet!
              </p>
            </Col>
          </Row>
        </Container>
        <MainHeading title="Kontakta oss" />
        <Container className="rounded bg-rosa mt-3 p-3">
          <Row className=" align-items-center g-3">
            <Col xs={12} md={6} className="text-center">
              <Link to="/">
                <img
                  src={LogoText}
                  alt="Filmvisarna logo"
                  className="img-fluid pt-md-0 scale"
                  style={{ width: '8em', cursor: 'pointer' }}
                />
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <div className="text-black text-center">
                <p className="text-black d-flex flex-column align-items-center">
                  Telefon: <span className="fs-md-custom">073 - XXX XX XX</span>
                </p>
                <p className="text-black d-flex flex-column align-items-center">
                  E-post:{' '}
                  <a href="mailto:filmvisarna@gmail.com" className="text-dark">
                    filmvisarna@gmail.com
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

export default AboutPage;
