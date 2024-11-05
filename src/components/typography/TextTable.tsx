import { Card, Col, ListGroup } from 'react-bootstrap';

interface TextTableProps {
  movieData: {
    playTime: number;
    title: string;
    genres: string[];
    movieInfo?: {
      director?: string;
      actors?: string[];
      year_recorded: number;
    };
  };
}

export default function TextTable({ movieData }: TextTableProps) {
  const movieDetails = [
    { label: 'Speltid', value: `${movieData.playTime} Minuter` },
    { label: 'Genre', value: movieData.genres.join(', ') },
    { label: 'Regi', value: movieData.movieInfo?.director || 'okänd' },
    {
      label: 'Skådespelare',
      value: movieData.movieInfo?.actors?.join(', ') || 'okänd',
    },
    { label: 'Inspelad', value: movieData.movieInfo?.year_recorded || 'okänd' },
  ];

  return (
    <Col>
      <Card className="p-3 text-dark bg-rosa border border-0">
        <Card.Body className="p-0">
          <Card.Title className="my-2 text-center fw-bold text-decoration-underline">
            Detaljer
          </Card.Title>
          <ListGroup variant="flush">
            {movieDetails.map((detail, index) => (
              <ListGroup.Item
                key={index}
                className="text-dark bg-rosa p-1 px-0 d-flex align-items-center justify-content-between flex-wrap border border-0"
              >
                <strong>{detail.label}:</strong> <span>{detail.value}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}
