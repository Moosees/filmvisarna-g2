import { Card, Col } from 'react-bootstrap';

interface MoviePosterProps {
  movieData: {
    posterUrl: string;
    title: string;
  };
}
export default function MoviePoster({ movieData }: MoviePosterProps) {
  return (
    <Col
      md={4}
      // className="d-none d-md-flex"
    >
      <Card className="border border-0">
        <Card.Img
          className=" mx-auto "
          style={{ width: '80%', height: '38vh' }}
          src={movieData.posterUrl}
          alt={movieData.title}
        />
      </Card>
    </Col>
  );
}
