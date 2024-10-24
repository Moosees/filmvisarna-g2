import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import NavButton from '../../components/header/NavButton';
import { useState } from 'react';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

const movieData = {
  id: 5,
  title: 'Katten, återkomsten',
  paramUrl: 'katten-aterkomsten',
  age: 11,
  playTime: 118,
  posterUrl:
    'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
  movieInfo: {
    trailer: 'https://www.youtube.com/embed/owK1qxDselE?controls=1',
    director: 'Giuseppe Tornatore',
    actors: ['Philippe ', 'Jacques Perrin'],
    description:
      'Tonårige Marty McFly skickas av en slump tillbaka till år 1955 i en plutoniumdriven tidsmaskin, i form av en bil av märket DeLorean, som uppfunnits av hans vän, den smått galne vetenskapsmannen Doc Brown. Under resan tillbaka i tiden blir Marty tvungen att se till att hans tonåriga föräldrar träffas och blir förälskade i varandra - så att han själv kan återvända till framtiden för att ens existera alls!',
    year_recorded: 1988,
  },
  screeningDetails: [
    {
      dayName: 'fredag',
      screeningId: 2,
      screeningDate: '01 nov',
    },
    {
      dayName: 'torsdag',
      screeningId: 18,
      screeningDate: '07 nov',
    },
    {
      dayName: 'torsdag',
      screeningId: 21,
      screeningDate: '17 okt',
    },
    {
      dayName: 'söndag',
      screeningId: 26,
      screeningDate: '10 nov',
    },
    {
      dayName: 'onsdag',
      screeningId: 34,
      screeningDate: '13 nov',
    },
  ],
};

function MovieBooking() {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(
    movieData.screeningDetails[0].screeningId
  );
  const fullText =
    'Tonårige Marty McFly skickas av en slump tillbaka till år 1955 i en plutoniumdriven tidsmaskin, i form av en bil av märket DeLorean, som uppfunnits av hans vän, den smått galne vetenskapsmannen Doc Brown. Under resan tillbaka i tiden blir Marty tvungen att se till att hans tonåriga föräldrar träffas och blir förälskade i varandra - så att han själv kan återvända till framtiden för att ens existera alls!';

  const shortText = fullText.substring(0, 200) + '...';

  const handleSelect = (value: number) => {
    setSelectedOption(value);
    console.log('Selected:', value);
  };
  return (
    <Container className="p-0">
      {/* Row for Poster and Video */}
      <Row className="mb-4 d-flex align-items-center justify-content-between g-3">
        {/* Poster Section */}
        <Col md={4} className="d-none d-md-flex">
          <Card className="border border-0">
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
          <div>
            <h5>Screening Id: {selectedOption || 'None'}</h5>
            <ButtonGroup className="bg-rosa p-3 mb-3 d-flex align-items-center justify-content-center flex-wrap gap-3">
              {movieData.screeningDetails.map((screening) => (
                <Button
                  key={screening.screeningId}
                  className={`py-1 px-4 rounded border border-0 text-capitalize ${
                    selectedOption === screening.screeningId
                      ? 'body-bg-dark text-light'
                      : 'bg-light text-dark'
                  }`}
                  onClick={() => handleSelect(screening.screeningId)}
                >
                  {screening.dayName}
                  <br />
                  {screening.screeningDate}{' '}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </Col>
      </Row>

      {/* Book Tickets Button */}
      <Row className="mb-4">
        <Col className="text-center">
          <NavButton label="Boka Biljetter" to={'#'} />
        </Col>
      </Row>

      {/* Movie Details and  Movie Description  */}
      <Row className="my-4 d-flex align-items-center justify-content-between g-3 ">
        <Col md={6} xl={4}>
          <Card className="text-dark bg-rosa ">
            <Card.Body className="py-2">
              <Card.Title className="my-2 text-center fw-bold text-decoration-underline">
                Detaljer
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="text-dark p-1 px-0 bg-rosa  d-flex align-items-center justify-content-between flex-wrap">
                  <strong>Speltid:</strong> <span>116 minuter</span>
                </ListGroup.Item>
                <ListGroup.Item className="text-dark p-1 px-0  bg-rosa  d-flex align-items-center justify-content-between flex-wrap">
                  <strong>Genre:</strong> <span>Science Fiction</span>
                </ListGroup.Item>
                <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                  <strong>Regi:</strong> <span>Robert Zemeckis</span>
                </ListGroup.Item>
                <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                  <strong>Originaltitel:</strong>{' '}
                  <span>"Back to the Future"</span>
                </ListGroup.Item>
                <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                  <strong>Skådespelare:</strong>
                  <span>
                    Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin
                    Glover
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                  <strong>Inspelad:</strong> <span>1985</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Movie Description */}
        <Col md={6} lg={6}>
          <Card className="p-3 border-0 bg-rosa text-dark fw-bold">
            <Card.Title className="my-2 fw-bold text-decoration-underline">
              Gladiator
            </Card.Title>

            <Card.Text className="d-none d-xl-block custom-letterSpacing">
              {fullText}
            </Card.Text>

            <Card.Text className="d-block d-xl-none custom-letterSpacing ">
              {openCollapse ? fullText : shortText}{' '}
            </Card.Text>
            <div
              style={{ width: '100%' }}
              className="d-flex justify-content-end d-xl-none"
            >
              <PrimaryBtn
                title={openCollapse ? 'Visa Mindre' : 'Visa Mer'}
                onClick={(e) => {
                  e?.preventDefault();
                  setOpenCollapse(!openCollapse);
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieBooking;
