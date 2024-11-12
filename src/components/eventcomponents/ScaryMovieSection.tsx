import { useSuspenseQuery } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getScaryMovieQuery } from '../../api/event';
import PrimaryBtn from '../buttons/PrimaryBtn';

interface ScaryMovieSectionProps {
  showMoreButton?: boolean;
}

const ScaryMovieSection: React.FC<ScaryMovieSectionProps> = ({
  showMoreButton = false,
}) => {
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
      <h2 className="text-danger text-center mb-4 digital scary-heading rounded p-2">
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
              style={{ cursor: 'pointer', width: '100%', height: '100%' }}
              className="scale rounded"
            />
          </Col>
        ))}
      </Row>
      {showMoreButton && (
        <PrimaryBtn type="button">
          <Link to="/evenemang">Visa mer</Link>
        </PrimaryBtn>
      )}
    </Col>
  );
};

export default ScaryMovieSection;
