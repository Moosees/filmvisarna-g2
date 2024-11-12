import React from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row className="w-100">
        <Col
          xs={12}
          className="rounded bg-rosa mt-3 p-3 justify-content-center"
        >
          <h4 className="text-black text-center">
            Filmvisarna – Där 80-talet lever vidare, en film i taget!
          </h4>
          <p className="text-black text-center">
            <br />
            Filmvisarna är en nyöppnad biograf med två moderna och bekväma
            salonger. <br />
            Vi strävar efter att skapa en nostalgisk filmupplevelse med
            inspiration från ikoniska filmer från 80-talet. <br />
            Atmosfären präglas av neonljus, färgstarka affischer och autentiska
            detaljer från 80-talets stora filmverk.
            <br /> Filmvisarna är en perfekt plats för att återuppleva
            actionfilmer, romantiska komedier och kultklassiker från science
            fiction-genren. <br />
            <br />
            Välkomna tillbaka till 80-talet!
          </p>
        </Col>
      </Row>
      <div className="row justify-content-center">
        <h1 className="bg-rosa text-dark text-center fs-5 fw-bold text-decoration-underline py-2 px-5 custom-rounded col-auto">
          Kontakta oss
        </h1>
      </div>
      <Row className="w-100">
        <Col
          xs={12}
          className="rounded bg-rosa mt-3 p-3 justify-content-center"
        >
          <h4 className="text-black text-center">Kontakta oss:</h4>
          <p className="text-black text-center">
            <br />
            Telefon: <br />
            E-post: <br />
            Atmosfären präglas av neonljus, färgstarka affischer och autentiska
            detaljer från 80-talets stora filmverk.
            <br /> Filmvisarna är en perfekt plats för att återuppleva
            actionfilmer, romantiska komedier och kultklassiker från science
            fiction-genren. <br />
            <br />
            Välkomna tillbaka till 80-talet!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
