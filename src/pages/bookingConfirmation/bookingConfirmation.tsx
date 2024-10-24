import { Col, Container, Row } from 'react-bootstrap';
import '../../assets/sass/bookingConfirmation.scss';
import { Link, useLoaderData } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { bookingLoader, getBookingDataQuery } from '../../api/reserve';
import { useSuspenseQuery } from '@tanstack/react-query';

// TODO change the hardcoded img

function BookingConfirmation() {
  const { bookingNumber } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof bookingLoader>>
  >;

  const { data } = useSuspenseQuery(getBookingDataQuery(bookingNumber));
  console.log(data);

  return (
    <>
      <Container className="booking-confirmation">
        <Row className="booking-row">
          <Col>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/0/04/Gladiator_II_%282024%29_poster.jpg"
              alt="Gladiator-movie"
              className="img-fluid"
            />
          </Col>
          <Col>
            {data ? (
              <ul className="list-group">
                <li className="list-group-item ">
                  <strong>Bokings-nr:</strong>
                  <span>{data.reservationNumber}</span>
                </li>
                <li className="list-group-item">
                  <strong>Salong:</strong>
                  <span>{data.auditoriumName}</span>
                </li>
                <li className="list-group-item">
                  <strong>Plats:</strong>
                  <span>
                    {data.seats.map((seat, index) => (
                      <span key={index}>
                        Rad: {seat.row}, Stol: {seat.number}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Film:</strong>
                  <span>{data.title}</span>
                </li>
                <li className="list-group-item">
                  <strong>Datum:</strong>
                  <span>{data.startDate}</span>
                </li>
                <li className="list-group-item">
                  <strong>Tid:</strong>
                  <span>{data.timeRange}</span>
                </li>
                <li className="list-group-item">
                  <strong>Antal personer:</strong>
                  <span>{data.ticketDetails}</span>
                </li>
                <li className="list-group-item">
                  <strong>Totalt pris:</strong>
                  <span>{data.totalPrice}</span>
                </li>
                <Row className="booking-row mt-4">
                  <Col className="booking-buttons col-auto d-flex">
                    <Link to="/">
                      <PrimaryBtn title={'Stäng'} />
                    </Link>
                    <Link to="avboka">
                      <PrimaryBtn title={'Avboka'} />
                    </Link>
                  </Col>
                </Row>
              </ul>
            ) : (
              <p>Laddar bokningsinformation...</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BookingConfirmation;
