import { Card, Col, ListGroup } from 'react-bootstrap';

interface TextTableProps {
  movieData: {
    playTime: number;
    title: string;
    genres: string[];
    movieInfo: {
      director: string;
      actors: string[];
      year_recorded: number;
    };
  };
}

export default function TextTable({ movieData }: TextTableProps) {
  return (
    <Col md={6} xl={4}>
      <Card className="text-dark bg-rosa ">
        <Card.Body className="py-2">
          <Card.Title className="my-2 text-center fw-bold text-decoration-underline">
            Detaljer
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item className="text-dark p-1 px-0 bg-rosa  d-flex align-items-center justify-content-between flex-wrap">
              <strong>Speltid:</strong>{' '}
              <span>{movieData.playTime} Minuter</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-dark p-1 px-0  bg-rosa  d-flex align-items-center justify-content-between flex-wrap">
              <strong>Genre:</strong> <span>{movieData.genres.join(', ')}</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
              <strong>Regi:</strong> <span>{movieData.movieInfo.director}</span>
            </ListGroup.Item>
            {/* <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
                    <strong>Originaltitel:</strong>{' '}
                    <span>"Back to the Future"</span>
                  </ListGroup.Item> */}
            <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
              <strong>Skådespelare:</strong>
              <span>{movieData.movieInfo.actors.join(', ')}</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-dark p-1 px-0  bg-rosa d-flex align-items-center justify-content-between flex-wrap">
              <strong>Inspelad:</strong>{' '}
              <span>{movieData.movieInfo.year_recorded}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}
