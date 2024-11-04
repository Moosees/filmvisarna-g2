import { useSuspenseQuery } from '@tanstack/react-query';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import { getTodaysMoviesQuery } from '../../api/home';

export default function HomePage() {
  const { data: movies } = useSuspenseQuery(getTodaysMoviesQuery());

  return (
    <>
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
            day={movie.dateFormat.dayName}
            screeningDate={movie.dateFormat.screeningDate}
          />
        ))}
      </CardsWrapper>
    </>
  );
}
