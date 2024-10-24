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
import MainHeading from '../../components/mainHeading/MainHeading';

const movieData = {
  id: 5,
  title: 'Gladiator',
  paramUrl: 'Gladiator',
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
  genres: ['Action', 'Rysare'],
  screeningDetails: [
    {
      dayName: 'fredag',
      timeRange: '22:00-23:58',
      screeningId: 2,
      screeningDate: '01 nov',
    },
    {
      dayName: 'torsdag',
      timeRange: '19:45-21:43',
      screeningId: 18,
      screeningDate: '07 nov',
    },
    {
      dayName: 'torsdag',
      timeRange: '10:45-12:43',
      screeningId: 21,
      screeningDate: '17 okt',
    },
    {
      dayName: 'söndag',
      timeRange: '13:30-15:28',
      screeningId: 26,
      screeningDate: '10 nov',
    },
    {
      dayName: 'onsdag',
      timeRange: '20:45-22:43',
      screeningId: 34,
      screeningDate: '13 nov',
    },
  ],
};

function MovieBooking() {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [selectedScreening, setSelectedScreening] = useState<number>(
    movieData.screeningDetails[0].screeningId
  );
  const fullText = movieData.movieInfo.description;

  const shortText = fullText.substring(0, 150) + '...';

  const handleSelect = (value: number) => {
    setSelectedScreening(value);
    console.log('Selected:', value);
  };
  return (
    <>
      <Container className="p-0">
        <div className="mx-auto" style={{ width: '50%' }}>
          <MainHeading title={movieData.title} />
        </div>
        {/* Row for Poster and Video */}
        <Row className=" my-3 d-flex align-items-center justify-content-evenly ">
          {/* Poster Section */}
          <Col md={4} className="d-none d-md-flex">
            <Card className="border border-0">
              <Card.Img
                className=" mx-auto "
                style={{ width: '80%', height: '38vh' }}
                src={movieData.posterUrl}
                alt={movieData.title}
              />
            </Card>
          </Col>

          {/* Video Section */}
          <Col md={6}>
            <iframe
              style={{ width: '100%', height: '38vh' }}
              src={movieData.movieInfo.trailer}
              title={`${movieData.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Col>
        </Row>

        {/* Date Buttons */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-center flex-wrap gap-3">
            <div>
              {/* <h5>Screening Id: {selectedOption || 'None'}</h5> */}
              <ButtonGroup className="bg-rosa p-2 d-flex align-items-center justify-content-center flex-wrap gap-2 ">
                {movieData.screeningDetails.map((screening) => (
                  <Button
                    key={screening.screeningId}
                    style={{ fontSize: '.7em' }}
                    className={`py-1 px-3  rounded border border-0 text-capitalize ${
                      selectedScreening === screening.screeningId
                        ? 'body-bg-dark text-light'
                        : 'bg-light text-dark'
                    }`}
                    onClick={() => handleSelect(screening.screeningId)}
                  >
                    {screening.dayName}
                    <br />
                    {screening.screeningDate} <br />
                    <span>{screening.timeRange}</span>
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </Col>
        </Row>

        {/* Book Tickets Button */}
        <Row className="mb-4">
          <Col className="text-center">
            <NavButton
              label="Boka Biljetter"
              to={`/visning/${selectedScreening}`}
            />
          </Col>
        </Row>

        {/* Movie Details and  Movie Description  */}
        <Row className="my-3 d-flex align-items-center justify-content-between g-3 ">
          <Col md={6} xl={4}>
            <Card className="text-dark bg-rosa ">
              <Card.Body className="py-2">
                <Card.Title className="my-2 text-center fw-bold text-decoration-underline">
                  Detaljer
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-dark p-1 px-0 bg-rosa  d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Speltid:</strong>{' '}
                    <span>{movieData.playTime} Minuter</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-dark p-1 px-0  bg-rosa  d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Genre:</strong>{' '}
                    <span>{movieData.genres.join(', ')}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Regi:</strong>{' '}
                    <span>{movieData.movieInfo.director}</span>
                  </ListGroup.Item>
                  {/* <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Originaltitel:</strong>{' '}
                    <span>"Back to the Future"</span>
                  </ListGroup.Item> */}
                  <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Skådespelare:</strong>
                    <span>{movieData.movieInfo.actors.join(', ')}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Inspelad:</strong>{' '}
                    <span>{movieData.movieInfo.year_recorded}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Movie Description */}
          <Col md={6} lg={6}>
            <Card className="py-2 px-3 border-0 bg-rosa text-dark fw-bold">
              <Card.Title className="my-2 fw-bold text-decoration-underline">
                {movieData.title}
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
    </>
  );
}

export default MovieBooking;
