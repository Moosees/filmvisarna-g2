import { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import PrimaryBtn from '../buttons/PrimaryBtn';

interface TextBoxProps {
  movieData: {
    title: string;
    movieInfo: {
      description?: string;
    };
  };
}
export default function TextBox({ movieData }: TextBoxProps) {
  const [openCollapse, setOpenCollapse] = useState(false);

  const fullText =
    movieData.movieInfo?.description ?? 'Ingen information tillgänglig';
  const shortText =
    fullText.length > 150 ? fullText.substring(0, 150) + '...' : fullText;
  const showButton = fullText.length > 150;

  return (
    <Col>
      <Card className="border-0 bg-rosa text-dark fw-bold">
        <Card.Title className="my-3 fw-bold text-decoration-underline">
          {movieData.title}
        </Card.Title>

        <Card.Text className="d-none d-xl-block custom-letterSpacing">
          {fullText}
        </Card.Text>

        <Card.Text className="d-block d-xl-none custom-letterSpacing ">
          {openCollapse ? fullText : shortText}{' '}
        </Card.Text>
        <div
          style={{ width: '100%' }}
          className="d-flex justify-content-end d-xl-none"
        >
          {showButton && (
            <PrimaryBtn
              title={openCollapse ? 'Visa Mindre' : 'Visa Mer'}
              onClick={(e) => {
                e?.preventDefault();
                setOpenCollapse(!openCollapse);
              }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
}
