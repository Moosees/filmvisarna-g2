import { Col } from 'react-bootstrap';
interface MovieTrailerProps {
  movieData: {
    movieInfo: {
      trailer: string;
    };
    title: string;
  };
}

export default function MovieTrailer({ movieData }: MovieTrailerProps) {
  return (
    <Col md={6}>
      <iframe
        style={{ width: '100%', height: '38vh' }}
        src={movieData.movieInfo.trailer}
        title={`${movieData.title} trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Col>
  );
}
