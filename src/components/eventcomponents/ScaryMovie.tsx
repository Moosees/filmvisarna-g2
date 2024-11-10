import { useSuspenseQuery } from '@tanstack/react-query';
import { Col } from 'react-bootstrap';
import { getScaryMovieQuery } from '../../api/event';
import CardsWrapper from '../movieCard/CardsWrapper';
import MovieCard from '../movieCard/MovieCard';

const ScaryMovieSection: React.FC = () => {
  const { data: movies } = useSuspenseQuery(getScaryMovieQuery());

  return (
    <Col className="rounded blood-image-wrapper mt-3 position-relative">
      <h2 className="text-center mt-3 digital text-danger">
        En ikonisk skräckfilmskväll hos Filmvisarna!
      </h2>
      <CardsWrapper>
        {movies.map((movie) => (
          <MovieCard
            movieId={movie.movieId}
            screeningId={movie.screeningId}
            age={movie.age}
            posterUrl={movie.posterUrl}
            title={movie.title}
            key={movie.screeningId}
            startTime={movie.startTime}
            day={movie.dateFormat?.dayName || 'N/A'}
            screeningDate={movie.dateFormat?.screeningDate || 'N/A'}
            fullDate={movie.fullDate}
          />
        ))}
      </CardsWrapper>
    </Col>
  );
};

export default ScaryMovieSection;
