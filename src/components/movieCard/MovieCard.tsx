import { Card } from 'react-bootstrap';
import '../../main.scss';
import YellowBtn from '../buttons/yellowBtn';

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
  const handleCardClick = () => {
    console.log('movieId', movieId);
  };
  const handleButtonClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('screeningId ', screeningId);
  };

  return (
    <Card
      className="text-center text-white border border-warning shadow movie-card"
      onClick={handleCardClick}
    >
      <div className="position-relative">
        <Card.Img variant="top" src={src} className="img-fluid p-2 card-img" />
        <div className="position-absolute bottom-0 end-0 bg-danger text-white p-2 rounded-circle m-3 border border-warning">
          {age}
        </div>
      </div>
      <Card.Body className="p-1">
        <Card.Text className=" text-capitalize m-0 text-decoration-underline">
          {title}
        </Card.Text>
        <Card.Text className="digital m-0 ">{startTime}</Card.Text>
        <YellowBtn title="Boka" onClick={handleButtonClick} />
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
