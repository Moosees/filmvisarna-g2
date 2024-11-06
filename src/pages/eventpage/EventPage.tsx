import { Col, Container, Row } from 'react-bootstrap';

const EventPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Astrid Lindgren</h2>
        </Col>
        <Col>
          <h4>Astrid Lindgrens Matinéhelg i November</h4>
          <p>
            Filmer som visas lördag 16 november: <br /> 1. Alla barnen i
            Bullerbyn <br /> Tid: kl. 13:00 (stora salongen) <br /> 2. Mio min
            Mio <br /> Tid: kl. 15:30 (stora salongen) <br /> söndag 17
            november: <br /> 3. Ronja Rövardotter <br /> Tid: kl. 13:00 (stora
            salongen) <br /> Förmåner: <br /> Halva priset på popcorn: De som
            bokar biljetter till alla tre filmer får 50 % rabatt på popcorn vid
            varje visning. <br /> Familjerabatt: Specialerbjudande för familjer
            som bokar fler än fyra biljetter. <br /> Bokningsinformation:
            Biljetter kan bokas via hemsidan eller i biljettkassan. <br />{' '}
            Popcornrabatten gäller för de som bokar alla tre filmer. <br />
            <br /> En underbar matinéhelg med några av Astrid Lindgrens mest
            älskade berättelser!
          </p>
        </Col>
        <Col>
          <h2>Halloween</h2>
        </Col>
        <Col>
          <h4>
            Fira Halloween med några av 80-talets mest ikoniska skräckfilmer
            genom tiderna!
          </h4>
          <p>
            Filmer som visas tisdag 31 oktober: <br /> 1. Nightmare on Elm
            Street <br /> Tid: kl. 18:00 (stora salongen) <br /> 2. The Shining{' '}
            <br />
            Tid: kl. 20:30 (stora salongen) <br /> 3. Friday the 13th <br />
            Tid: kl. 18:00 (lilla salongen) <br /> 4. Poltergeist <br /> Tid:
            kl. 20:30(lilla salongen) <br />
            <br /> Kom utklädd och vi bjuder på en liten popcorn!
            Bokningsinformation: Biljetter kan bokas via hemsidan eller i
            biljettkassan.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default EventPage;
