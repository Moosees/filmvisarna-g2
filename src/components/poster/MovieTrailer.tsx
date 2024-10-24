import { Col } from 'react-bootstrap';
import { Film } from 'react-bootstrap-icons';
interface MovieTrailerProps {
  movieData: {
    movieInfo?: {
      trailer?: string;
    };
    title: string;
  };
}

export default function MovieTrailer({ movieData }: MovieTrailerProps) {
  return (
    <Col md={6}>
      {movieData.movieInfo?.trailer ? (
        <iframe
          style={{ width: '100%', height: '38vh' }}
          src={movieData.movieInfo.trailer}
          title={`${movieData.title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '38vh',
          }}
          className=" d-flex align-items-center justify-content-center flex-column bg-rosa text-dark gap-3 rounded"
        >
          <Film style={{ fontSize: '4em', color: 'black' }} />
          <p>Inga trailer tillgängliga för den här filmen</p>
        </div>
      )}
    </Col>
  );
}
