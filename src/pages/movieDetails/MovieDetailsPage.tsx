import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import NavButton from '../../components/header/NavButton';

function MovieBooking() {
  return (
    <Container className="p-0">
      <Row className="mb-4 d-flex align-items-center justify-content-between g-3">
        {/* Poster Section */}
        <Col md={4}>
          <Card>
            <Card.Img
              className=" mx-auto "
              style={{ width: '80%', height: '45vh' }}
              src="https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091"
              alt="Back to the Future Poster"
            />
          </Card>
        </Col>

        {/* Video Section */}
        <Col md={6}>
          <iframe
            style={{ width: '100%', height: '45vh' }}
            src="https://www.youtube.com/embed/owK1qxDselE?controls=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Col>
      </Row>

      {/* Date Buttons */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center flex-wrap gap-3">
          <Badge pill bg="light" text="dark" className="px-4 py-3 mx-2">
            Idag
            <br />
            24 sep
          </Badge>
          <Badge pill bg="light" text="dark" className="px-4 py-3 mx-2">
            Onsdag
            <br />
            25 sep
          </Badge>
          <Badge pill bg="light" text="dark" className="px-4 py-3 mx-2">
            Torsdag
            <br />
            26 sep
          </Badge>
          <Badge pill bg="light" text="dark" className="px-4 py-3 mx-2">
            Fredag
            <br />
            27 sep
          </Badge>
        </Col>
      </Row>

      {/* Book Tickets Button */}
      <Row className="mb-4">
        <Col className="text-center">
          <NavButton label="Boka Biljetter" to={'#'} />
        </Col>
      </Row>

      {/* Movie Details */}
      <Row className="mb-4">
        <Col md={6}>
          <Card bg="dark" text="light" className="p-3 border-0">
            <h4 className="my-3 text-center">Detaljer</h4>
            <ul className="list-unstyled ">
              <li className=" my-2 d-flex align-items-center justify-content-between flex-wrap">
                <strong>Speltid:</strong> 116 minuter
              </li>
              <li className="my-2 d-flex align-items-center justify-content-between flex-wrap">
                <strong>Genre:</strong> Science Fiction
              </li>
              <li className="my-2 d-flex align-items-center justify-content-between flex-wrap">
                <strong>Regi:</strong> Robert Zemeckis
              </li>
              <li className="my-2 d-flex align-items-center justify-content-between flex-wrap">
                <strong>Originaltitel:</strong> "Back to the Future"
              </li>
              <li className="my-2 d-flex align-items-center justify-content-between flex-wrap">
                <strong>Skådespelare:</strong> Michael J. Fox, Christopher
                Lloyd, Lea Thompson, Crispin Glover
              </li>
              <li className="my-2 d-flex align-items-center justify-content-between flex-wrap">
                <strong>Inspelad:</strong> 1985
              </li>
            </ul>
          </Card>
        </Col>

        {/* Movie Description */}
        <Col md={6}>
          <Card bg="dark" text="light" className="p-3 border-0">
            <Card.Text>
              Tonårige Marty McFly skickas av en slump tillbaka till år 1955 i
              en plutoniumdriven tidsmaskin, i form av en bil av märket
              DeLorean, som uppfunnits av hans vän, den smått galne
              vetenskapsmannen Doc Brown. Under resan tillbaka i tiden blir
              Marty tvungen att se till att hans tonåriga föräldrar träffas och
              blir förälskade i varandra - så att han själv kan återvända till
              framtiden för att ens existera alls!
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieBooking;
