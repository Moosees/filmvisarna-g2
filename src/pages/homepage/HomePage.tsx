import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';

const movies = [
  {
    id: 1,
    screeningId: 11,
    src: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
    age: 15,
    title: 'Gladiator',
    startTime: '21:00-22:30',
  },
  {
    id: 2,
    screeningId: 22,
    src: 'https://posterhouse.org/wp-content/uploads/2021/05/godfather_0.jpg',
    age: 15,
    title: 'The Godfather',
    startTime: '21:00-22:30',
  },
  {
    id: 3,
    screeningId: 12,
    src: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
    age: 15,
    title: 'Gladiator',
    startTime: '21:00-22:30',
  },
  {
    id: 4,
    screeningId: 33,
    src: 'https://i.ebayimg.com/images/g/86UAAOSweIlb5A3Q/s-l1600.webp',
    age: 15,
    title: 'THE GRINCH',
    startTime: '21:00-22:30',
  },
];

export default function HomePage() {
  return (
    <>
      <CardsWrapper>
        {movies.map((movie) => (
          <MovieCard
            movieId={movie.id}
            screeningId={movie.screeningId}
            age={movie.age}
            posterUrl={movie.src}
            title={movie.title}
            startTime={movie.startTime}
            key={movie.id}
          />
        ))}
      </CardsWrapper>
    </>
  );
}
