import { Container, Row, Col } from 'react-bootstrap';
import { Link, ScrollRestoration } from 'react-router-dom';
import LogoText from '../../assets/images/logoText.svg';

function AboutPage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <ScrollRestoration />
      <Row className="w-75 mb-5">
        <Col
          xs={12}
          className="rounded bg-rosa mt-3 p-3 d-flex flex-column align-items-center justify-content-center"
        >
          <h4 className="text-black">
            Filmvisarna – Där 80-talet lever vidare!
          </h4>
          <p className="text-black technology-text">
            Filmvisarna är en nyöppnad biograf med två moderna och bekväma
            salonger. Vi strävar efter att skapa en nostalgisk filmupplevelse
            med inspiration från ikoniska filmer från 80-talet. Atmosfären
            präglas av neonljus, färgstarka affischer och autentiska detaljer
            från 80-talets stora filmverk. Filmvisarna är en perfekt plats för
            att återuppleva actionfilmer, romantiska komedier och kultklassiker
            från science fiction-genren. Välkomna tillbaka till 80-talet!
          </p>
        </Col>
      </Row>
      <div className="row justify-content-center">
        <h1
          id="kontakt"
          className="bg-rosa text-dark fs-5 fw-bold text-decoration-underline py-2 px-5 custom-rounded col-auto"
        >
          Kontakta oss
        </h1>
      </div>
      <Row className="rounded bg-rosa  w-75 mt-4 justify-content-evenly align-items-center">
        <Col className=" d-flex flex-column align-items-center justify-content-center">
          <Link to="/">
            <img
              src={LogoText}
              alt="Filmvisarna logo"
              className="img-fluid pt-3 pt-md-0 scale"
              style={{ width: '8em', cursor: 'pointer' }}
            />
          </Link>
        </Col>
        <Col className="mt-3 p-3 d-flex flex-column align-items-center justify-content-center">
          <h4 className="text-black text-center">Kontakta oss:</h4>
          <p className="text-black text-center">
            <br />
            Telefon: 073 - XXX XX XX
            <br />
            E-post: filmvisarna@gmail.com
            <br />
            <br />
            Vi öppnar: <br />
            Mån - fre: 17:00 <br />
            Lör - sön: 13:00 <br />
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
