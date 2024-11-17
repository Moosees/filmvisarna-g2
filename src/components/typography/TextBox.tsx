import { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import PrimaryBtn from '../buttons/PrimaryBtn';

interface TextBoxProps {
  movieData: {
    title: string;
    movieInfo?: {
      description?: string;
      original_title?: string;
    };
  };
}
export default function TextBox({ movieData }: TextBoxProps) {
  const [openCollapse, setOpenCollapse] = useState(false);

  const description =
    movieData.movieInfo?.description ?? 'Ingen information tillgänglig';
  const shortText =
    description.length > 100
      ? description.substring(0, 100) + '...'
      : description;

  const showButton = description.length > 100;

  return (
    <Col>
      <Card className="p-3 border-0 bg-rosa text-dark fw-bold">
        <Card.Title className="my-3 fw-bold text-decoration-underline">
          {movieData.movieInfo?.original_title}
        </Card.Title>

        <Card.Text className="d-none d-xl-block custom-letterSpacing">
          {description}
        </Card.Text>

        <Card.Text className="d-block d-xl-none custom-letterSpacing ">
          {openCollapse ? description : shortText}{' '}
        </Card.Text>
        <div
          style={{ width: '100%' }}
          className="d-flex justify-content-end d-xl-none"
        >
          {showButton && (
            <PrimaryBtn
              onClick={(e) => {
                e?.preventDefault();
                setOpenCollapse(!openCollapse);
              }}
            >
              {openCollapse ? 'Visa Mindre' : 'Visa Mer'}
            </PrimaryBtn>
          )}
        </div>
      </Card>
    </Col>
  );
}
