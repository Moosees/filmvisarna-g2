import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { getBookingDataQuery } from '../../api/booking';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Seat } from '../../api/booking';

function BookingConfirmation() {
  const { bookingNumber } = useLoaderData() as { bookingNumber: string };

  const { data } = useSuspenseQuery(getBookingDataQuery(bookingNumber));
  console.log(data);

  function formatSeats(seats: Seat[]): string {
    const [firstSeat, lastSeat] = [seats[0], seats[seats.length - 1]];
    // One seat
    if (seats.length === 1) {
      return `Rad: ${firstSeat.row}, Plats: ${firstSeat.number}`;
    }
    // More than one seat
    return `Rad: ${firstSeat.row}, Plats: ${lastSeat.number}-${firstSeat.number}`;
  }

  return (
    <>
      <Container className="booking-confirmation">
        <Row className="booking-row">
          <Col>
            <img
              src={data.posterUrl}
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
                  <span>{formatSeats(data.seats)}</span>
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
                    <PrimaryBtn>
                      <Link to="/">Stäng</Link>
                    </PrimaryBtn>
                    <PrimaryBtn>
                      <Link to="avboka">Avboka</Link>
                    </PrimaryBtn>
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
