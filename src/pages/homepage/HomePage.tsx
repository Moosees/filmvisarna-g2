import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';

const movies = [
  {
    id: 1,
    screeningId: 11,
    src: 'https://www.tallengestore.com/cdn/shop/products/Vintage_Movie_Poster_-_Cinema_Paradiso_-_Tallenge_Hollywood_Collection_c446a06a-f353-4fb7-bfd2-5e68e766a5b1.jpg?v=1570155543',
    age: 11,
    title: 'Cinema Paradiso',
    startTime: '18:30-21:05',
    dateFormat: {
      dayName: 'söndag',
      screeningDate: '03 nov',
    },
  },
  {
    id: 2,
    screeningId: 22,
    src: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/img_8305_5.jpeg',
    age: 11,
    title: 'The Last Metro ',
    startTime: '15:00-17:11',
    dateFormat: {
      dayName: 'söndag',
      screeningDate: '03 nov',
    },
  },
  {
    id: 3,
    screeningId: 12,
    src: 'https://m.media-amazon.com/images/M/MV5BMDA1OGEwNzEtNTAxZi00MmIyLWFkOTMtOTQwMjI5YmMxMjk2XkEyXkFqcGc@._V1_.jpg',
    age: 15,
    title: 'Fanny och Alexander',
    startTime: '21:00-22:30',
    dateFormat: {
      dayName: 'söndag',
      screeningDate: '03 nov',
    },
  },
  {
    id: 4,
    screeningId: 33,
    src: 'https://cdn.posteritati.com/posters/000/000/064/450/blow-out-md-web.jpg',
    age: 15,
    title: 'Blow Out',
    startTime: '21:00-22:30',
    dateFormat: {
      dayName: 'söndag',
      screeningDate: '03 nov',
    },
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
            day={movie.dateFormat.dayName}
            screeningDate={movie.dateFormat.screeningDate}
          />
        ))}
      </CardsWrapper>
    </>
  );
}
