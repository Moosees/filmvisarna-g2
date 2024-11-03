import { Button, ButtonGroup, Col } from 'react-bootstrap';

interface ScreeningDetail {
  dayName: string;
  timeRange: string;
  screeningId: number;
  screeningDate: string;
}

interface ScreeningSelectProps {
  selectedScreening: number;
  setSelectedScreening: (v: number) => void;
  movieData: {
    screeningDetails: ScreeningDetail[];
    title: string;
  };
}

export default function ScreeningSelect({
  movieData,
  setSelectedScreening,
  selectedScreening,
}: ScreeningSelectProps) {
  return (
    <Col className="d-flex justify-content-center flex-wrap gap-3">
      <div>
        {/* <h5>Screening Id: {selectedScreening || 'None'}</h5> */}
        <ButtonGroup className="bg-rosa p-2 d-flex align-items-center justify-content-center flex-wrap gap-1 ">
          {movieData.screeningDetails.map((screening) => (
            <Button
              key={screening.screeningId}
              style={{ fontSize: '.7em' }}
              className={`py-1 px-3 rounded  btn-custom:hover border-btn ${
                selectedScreening === screening.screeningId
                  ? 'body-bg-dark text-light'
                  : 'bg-light text-dark'
              }`}
              onClick={() => setSelectedScreening(screening.screeningId)}
            >
              {screening.dayName}
              <br />
              {screening.screeningDate} <br />
              <span>{screening.timeRange}</span>
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Col>
  );
}
