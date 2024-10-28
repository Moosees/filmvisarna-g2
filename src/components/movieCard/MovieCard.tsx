import { Card } from 'react-bootstrap';
import PrimaryBtn from '../buttons/PrimaryBtn';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movieId: number;
  screeningId: number;
  src: string;
  age: number;
  title: string;
  startTime: string;
}

function MovieCard({
  src,
  age,
  title,
  startTime,
  movieId,
  screeningId,
}: MovieCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/film/${movieId}`);
  };
  const handleButtonClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/visning/${screeningId}`);
  };

  return (
    <Card
      className="text-center text-white border border-warning shadow movie-card py-2"
      onClick={handleCardClick}
    >
      <div className="position-relative">
        <Card.Img variant="top" src={src} className="img-fluid p-2 card-img" />
        <div
          style={{ width: '1.5em', height: '1.5em' }}
          className="position-absolute bottom-0 end-0 bg-danger text-white digital m-2 border border-warning rounded-circle"
        >
          {age}
        </div>
      </div>
      <Card.Body className="p-1">
        <Card.Text className=" text-capitalize m-0 text-decoration-underline">
          {title}
        </Card.Text>
        <Card.Text className="digital m-0 ">{startTime}</Card.Text>
        <PrimaryBtn title="Boka" onClick={handleButtonClick} />
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
