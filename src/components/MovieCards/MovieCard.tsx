import { Card, Button } from 'react-bootstrap';
import '../../main.scss';

interface MovieCardProps {
  src: string;
  age: number;
  title: string;
  startTime: string;
}

function MovieCard({ src, age, title, startTime }: MovieCardProps) {
  return (
    <Card className="text-center bg-card text-white border border-warning shadow">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={src}
          className="img-fluid p-2 "
          style={{ width: '100%', height: '280px', objectFit: 'fill' }}
        />
        <div className="position-absolute bottom-0 end-0 bg-danger text-white p-2 rounded-circle m-3 border border-warning">
          {age}
        </div>
      </div>
      <Card.Body>
        <Card.Text className="text-capitalize">{title}</Card.Text>
        <Card.Text>{startTime}</Card.Text>
        <Button
          href="#"
          className="btn btn-danger text-dark border border-warning"
        >
          Boka
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
