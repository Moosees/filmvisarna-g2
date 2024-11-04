import { Card } from 'react-bootstrap';
import PrimaryBtn from '../buttons/PrimaryBtn';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movieId: number;
  screeningId: number;
  posterUrl: string;
  age: number;
  title: string;
  startTime: string;
  showButton?: boolean;
  className?: string;
  reservationNum?: string;
  confirmationButton?: boolean;
  smallFont?: boolean;
  hideAge?: boolean;
  allowConfirmationOnly?: boolean;
  day?: string;
  screeningDate?: string;
  isStatic?: boolean;
}

function MovieCard({
  posterUrl,
  age,
  title,
  startTime,
  movieId,
  screeningId,
  showButton = true,
  className,
  reservationNum,
  confirmationButton = false,
  smallFont = false,
  hideAge = false,
  allowConfirmationOnly = false,
  day,
  screeningDate,
  isStatic = false,
}: MovieCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isStatic) {
      if (allowConfirmationOnly && reservationNum) {
        navigate(`/bokning/${reservationNum}`);
      } else {
        navigate(`/film/${movieId}`);
      }
    }
  };
  const handleButtonClick = (e?: React.MouseEvent) => {
    if (!allowConfirmationOnly) {
      e?.stopPropagation();
      navigate(`/visning/${screeningId}`);
    }
  };
  const handleConfirmationLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (reservationNum) navigate(`/bokning/${reservationNum}`);
  };

  return (
    <Card
      className={`text-center text-white border border-warning shadow movie-card py-2 ${className} ${
        isStatic ? 'static-card' : ''
      }`}
      onClick={isStatic ? undefined : handleCardClick}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={posterUrl}
          className="img-fluid p-2 card-img"
        />
        {!hideAge && (
          <div
            style={{ width: '1.5em', height: '1.5em' }}
            className="position-absolute bottom-0 end-0 bg-danger text-white digital m-2 border border-warning rounded-circle"
          >
            {age}
          </div>
        )}
      </div>
      <Card.Body className="p-1">
        <Card.Text
          style={{ height: '49px' }}
          className=" text-capitalize m-0 text-decoration-underline d-flex align-items-center justify-content-center "
        >
          {title}
        </Card.Text>
        <Card.Text
          className={`digital m-1 d-flex flex-column  ${
            smallFont ? 'small-font' : ''
          }`}
        >
          {day && screeningDate && (
            <span className="orbitron fs-s-custom">{`${day} ${screeningDate}`}</span>
          )}{' '}
          <span>{startTime}</span>
        </Card.Text>
        {confirmationButton && reservationNum ? (
          <a
            href="#"
            onClick={handleConfirmationLinkClick}
            className="text-black text-decoration-underline small-font"
          >
            Visa bokning
          </a>
        ) : (
          showButton && (
            <PrimaryBtn onClick={handleButtonClick}>Boka</PrimaryBtn>
          )
        )}
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
