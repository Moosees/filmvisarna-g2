import { Card, Col, ListGroup } from 'react-bootstrap';

interface TextTableProps {
  movieData: {
    playTime: number;
    title: string;
    genres: string[];
    director?: string;
    actors?: string[];
    year_recorded: number;
    language: string;
    subtitle: string;
  };
}

export default function TextTable({ movieData }: TextTableProps) {
  const movieDetails = [
    { label: 'Speltid', value: `${movieData.playTime} Minuter` },
    {
      label: 'Språk',
      value: movieData.language || 'okänd',
    },
    { label: 'Undertexter', value: movieData.subtitle || 'okänd' },
    { label: 'Genre', value: movieData.genres?.join(', ') || 'okänd' },
    { label: 'Regi', value: movieData.director || 'okänd' },
    {
      label: 'Skådespelare',
      value: movieData.actors?.join(', ') || 'okänd',
    },
    { label: 'Inspelad', value: movieData.year_recorded || 'okänd' },
  ];

  return (
    <Col>
      <Card className="p-3 text-dark bg-rosa border border-0">
        <Card.Body className="p-0">
          {/* <Card.Title className="my-2 text-center fw-bold text-decoration-underline">
            Detaljer
          </Card.Title> */}
          <ListGroup variant="flush">
            {movieDetails.map((detail, index) => (
              <ListGroup.Item
                key={index}
                className="text-dark bg-rosa p-1 px-0 d-flex align-items-center justify-content-between flex-wrap border border-0 text-capitalize"
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
