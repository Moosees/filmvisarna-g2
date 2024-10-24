import { Container, Row, Col } from 'react-bootstrap';
import NavButton from '../../components/header/NavButton';
import { useState } from 'react';
import MainHeading from '../../components/mainHeading/MainHeading';
import MovieTrailer from '../../components/poster/MovieTrailer';
import MoviePoster from '../../components/poster/MoviePoster';
import ScreeningSelect from '../../components/buttons/ScreeningSelect';
import TextTable from '../../components/typography/TextTable';
import TextBox from '../../components/typography/TextBox';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

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
  const [selectedScreening, setSelectedScreening] = useState<number>(
    movieData.screeningDetails[0].screeningId
  );
  const [openTrailer, setOpenTrailer] = useState(false);

  return (
    <>
      <Container className="p-0">
        <div className="mx-auto" style={{ width: '50%' }}>
          <MainHeading title={movieData.title} />
        </div>
        {/* Row for Poster and Video */}
        <Row className=" my-3 d-flex align-items-center justify-content-evenly ">
          {/* Poster Section */}
          {openTrailer ? (
            <MovieTrailer movieData={movieData} />
          ) : (
            <MoviePoster movieData={movieData} />
          )}
          {/*  */}
          {/* Video Section */}
          {/* <MovieTrailer movieData={movieData} /> */}
          <div
            style={{ width: '100%' }}
            className="d-flex justify-content-center "
          >
            <PrimaryBtn
              title={openTrailer ? 'Visa Poster' : 'Visa Trailer'}
              onClick={(e) => {
                e?.preventDefault();
                setOpenTrailer(!openTrailer);
              }}
            />
          </div>
        </Row>
        {/* Date Buttons */}
        <Row className="mb-3">
          <ScreeningSelect
            selectedScreening={selectedScreening}
            setSelectedScreening={setSelectedScreening}
            movieData={movieData}
          />
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
          <TextTable movieData={movieData} />
          {/* Movie Description */}
          <TextBox movieData={movieData} />
        </Row>
      </Container>
    </>
  );
}

export default MovieBooking;
