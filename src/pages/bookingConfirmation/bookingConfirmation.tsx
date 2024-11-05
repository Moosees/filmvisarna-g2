import { Col, Container, ListGroup, Row } from 'react-bootstrap';
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

  const confirmationDetails = [
    { label: 'Bokning-nr', value: `${data.reservationNumber}` },
    { label: 'Salong', value: data.auditoriumName },
    { label: 'Plats', value: formatSeats(data.seats) },
    { label: 'Film', value: data.title },
    { label: 'Datum', value: data.startDate },
    { label: 'Tid', value: data.timeRange },
    { label: 'Antal personer', value: data.ticketDetails },
    { label: 'Totalt pris', value: data.totalPrice },
  ];

  return (
    <>
      <Container className="bg-rosa rounded py-3" style={{ maxWidth: '900px' }}>
        <Row className="flex-column flex-md-row align-items-center">
          <Col md={6}>
            <img
              src={data.posterUrl}
              alt={data.title}
              className="img-fluid p-3"
            />
          </Col>
          <Col md={6}>
            <ListGroup>
              {confirmationDetails.map((details, index) => (
                <ListGroup.Item key={index}>
                  <strong>{details.label}</strong>
                  <span>{details.value}</span>
                </ListGroup.Item>
              ))}

              <Col className="mx-auto">
                <PrimaryBtn>
                  <Link to="/">Stäng</Link>
                </PrimaryBtn>
                <PrimaryBtn>
                  <Link to="avboka">Avboka</Link>
                </PrimaryBtn>
              </Col>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BookingConfirmation;
