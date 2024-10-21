// import { Button } from 'react-bootstrap';
import CardsWrapper from './components/MovieCards/CardsWrapper';
import MovieCard from './components/MovieCards/MovieCard';

const movies = [
  {
    src: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
    age: 15,
    title: 'Gladiator',
    startTime: '21:00-22:30',
  },
  {
    src: 'https://posterhouse.org/wp-content/uploads/2021/05/godfather_0.jpg',
    age: 15,
    title: 'The Godfather',
    startTime: '21:00-22:30',
  },
  {
    src: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
    age: 15,
    title: 'Gladiator',
    startTime: '21:00-22:30',
  },
  {
    src: 'https://i.ebayimg.com/images/g/86UAAOSweIlb5A3Q/s-l1600.webp',
    age: 15,
    title: 'THE GRINCH',
    startTime: '21:00-22:30',
  },
];

function App() {
  return (
    <CardsWrapper>
      {movies.map((movie, i) => (
        <MovieCard
          age={movie.age}
          src={movie.src}
          title={movie.title}
          startTime={movie.startTime}
          key={i}
        />
      ))}
    </CardsWrapper>
  );
}

export default App;
