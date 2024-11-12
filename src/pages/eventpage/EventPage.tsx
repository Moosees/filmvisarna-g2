import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ScaryMovieSection from '../../components/eventcomponents/ScaryMovieSection';
import AstridLindgrenSection from '../../components/eventcomponents/AstridLindgrenSection';

const EventPage: React.FC = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row className="w-100">
        <AstridLindgrenSection />
        <Col xs={12} className="rounded bg-rosa mt-3 p-3">
          <h4 className="text-black">Astrid Lindgrens Matinéhelg i December</h4>
          <p className="text-black">
            Filmer som visas lördag 14 december: <br />
            <br /> 1. Alla barnen i Bullerbyn <br /> Tid: kl. 13:00 (stora
            salongen) <br />
            <br /> 2. Mio min Mio <br /> Tid: kl. 15:30 (stora salongen) <br />
            <br /> <span className="">söndag 15 december:</span> <br />
            <br /> 3. Ronja Rövardotter <br /> Tid: kl. 13:00 (stora salongen){' '}
            <br />
            <br /> Förmåner: Halva priset på popcorn: De som bokar biljetter
            till alla tre filmer får 50 % rabatt på popcorn vid varje visning.{' '}
            <br />
            <br /> Familjerabatt: Specialerbjudande för familjer som bokar fler
            än fyra biljetter. <br />
            <br /> Bokningsinformation: Biljetter kan bokas via hemsidan eller i
            biljettkassan. <br />
            Popcornrabatten gäller för de som bokar alla tre filmer. <br />
            <br /> En underbar matinéhelg med några av Astrid Lindgrens mest
            älskade berättelser!
          </p>
        </Col>

        <ScaryMovieSection />

        <Col xs={12} className="rounded bg-rosa mt-3 p-3">
          <h4 className="text-black">
            Välkommen till en ikonisk skräck kväll hos Filmvisarna!
          </h4>
          <p className="text-black">
            Filmer som visas fredag 20:e December: <br />
            <br /> 1. Nightmare on Elm Street <br /> Tid: kl. 20:00 (stora
            salongen) <br />
            <br /> 2. The Shining
            <br />
            Tid: kl. 21:30 (stora salongen) <br />
            <br /> 3. Friday the 13th <br />
            Tid: kl. 17:30 (lilla salongen) <br />
            <br /> 4. Poltergeist <br /> Tid: kl. 19:30 (lilla salongen) <br />
            <br /> Kom utklädd och vi bjuder på en liten popcorn! <br />
            <br />
            Bokningsinformation: Biljetter kan bokas via hemsidan eller i
            biljettkassan.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default EventPage;
