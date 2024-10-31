import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { getMovieDataQuery } from '../../api/details';
import NavButton from '../../components/buttons/NavButton';
import MainHeading from '../../components/mainHeading/MainHeading';
import MovieTrailer from '../../components/poster/MovieTrailer';
import MoviePoster from '../../components/poster/MoviePoster';
import ScreeningSelect from '../../components/buttons/ScreeningSelect';
import TextTable from '../../components/typography/TextTable';
import TextBox from '../../components/typography/TextBox';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';

function MovieDetailsPage() {
  const { movieId } = useLoaderData() as { movieId: number };
  const { data: movieData } = useSuspenseQuery(getMovieDataQuery(movieId));
  const [selectedScreening, setSelectedScreening] = useState<number>(
    movieData.screeningDetails[0]?.screeningId
  );
  const [openTrailer, setOpenTrailer] = useState(false);

  return (
    <>
      <Container className="p-0">
        <MainHeading title={movieData.title} />
        <div
          style={{ width: '100%' }}
          className=" p-3 d-flex flex-column flex-md-row justify-content-evenly"
        >
          {/* Row for Poster and Video */}
          <div className="d-flex flex-column col-md-6 col-lg-5">
            <Row>
              {/* Poster Section */}
              <Col className="text-center">
                {openTrailer ? (
                  <MovieTrailer movieData={movieData} />
                ) : (
                  <MoviePoster movieData={movieData} />
                )}
                {movieData.movieInfo?.trailer && (
                  <PrimaryBtn
                    onClick={(e) => {
                      e?.preventDefault();
                      setOpenTrailer(!openTrailer);
                    }}
                  >
                    {openTrailer ? 'Visa Poster' : 'Visa Trailer'}
                  </PrimaryBtn>
                )}
              </Col>
            </Row>
            <Row className=" my-3 d-flex flex-column align-items-center d-none d-md-block">
              {/* Date Buttons */}
              <Col>
                <ScreeningSelect
                  selectedScreening={selectedScreening}
                  setSelectedScreening={setSelectedScreening}
                  movieData={movieData}
                />
              </Col>

              {/* Book Tickets Button */}
              <Col className="text-center mt-4">
                <NavButton
                  label="Boka Biljetter"
                  to={`/visning/${selectedScreening}`}
                />
              </Col>
            </Row>
          </div>

          {/* Movie Details and  Movie Description  */}
          <Row className=" py-3 d-flex flex-column g-3 col-md-5 ">
            {/* Movie Description */}
            <TextBox movieData={movieData} />

            <div className=" my-3 d-flex flex-column align-items-center d-md-none">
              {/* Date Buttons */}
              <Col>
                <ScreeningSelect
                  selectedScreening={selectedScreening}
                  setSelectedScreening={setSelectedScreening}
                  movieData={movieData}
                />
              </Col>

              {/* Book Tickets Button */}
              <Col className="text-center mt-2">
                <NavButton
                  label="Boka Biljetter"
                  to={`/visning/${selectedScreening}`}
                />
              </Col>
            </div>
            {/* Movie Details */}
            <TextTable movieData={movieData} />
          </Row>
        </div>
      </Container>
    </>
  );
}

export default MovieDetailsPage;
