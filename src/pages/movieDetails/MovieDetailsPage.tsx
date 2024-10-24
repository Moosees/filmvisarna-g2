import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { getMovieDataQuery } from '../../api/details';
import NavButton from '../../components/header/NavButton';
import MainHeading from '../../components/mainHeading/MainHeading';
import MovieTrailer from '../../components/poster/MovieTrailer';
import MoviePoster from '../../components/poster/MoviePoster';
import ScreeningSelect from '../../components/buttons/ScreeningSelect';
import TextTable from '../../components/typography/TextTable';
import TextBox from '../../components/typography/TextBox';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

function MovieBooking() {
  const { movieId } = useLoaderData() as { movieId: number };

  const { data: movieData } = useSuspenseQuery(getMovieDataQuery(movieId));

  const [selectedScreening, setSelectedScreening] = useState<number>(
    movieData.screeningDetails[0]?.screeningId
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
        <Row className="my-3 mx-auto d-flex align-items-center  justify-content-around  bg-rosa rounded  col-md-10">
          <TextTable movieData={movieData} />
          {/* Movie Description */}
          <TextBox movieData={movieData} />
        </Row>
      </Container>
    </>
  );
}

export default MovieBooking;
