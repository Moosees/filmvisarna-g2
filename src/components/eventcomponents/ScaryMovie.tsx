import { useSuspenseQuery } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getScaryMovieQuery } from '../../api/event';

const ScaryMovieSection: React.FC = () => {
  const navigate = useNavigate();
  const { data: movies } = useSuspenseQuery(getScaryMovieQuery());

  const handleCardClick = (movieId: number) => {
    navigate(`/film/${movieId}`);
  };

  return (
    <Col
      xs={12}
      className="rounded d-flex flex-column align-items-center mt-3 p-3 scary-movie-container"
    >
      <h2 className="text-danger text-center mb-4 digital scary-heading">
        En ikonisk skräckfilmskväll hos Filmvisarna!
      </h2>

      <Row className="d-flex justify-content-center w-100">
        {movies.map((movie) => (
          <Col
            key={movie.movieId}
            xs={6}
            md={3}
            className="mb-3"
            onClick={() => handleCardClick(movie.movieId)}
          >
            <img
              src={movie.posterUrl}
              alt={`Poster for movie ${movie.movieId}`}
              style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ScaryMovieSection;
