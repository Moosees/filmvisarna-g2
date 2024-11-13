import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { getBookingDataQuery } from '../../api/booking';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Seat } from '../../api/booking';
import { useState } from 'react';
import SeatsUpdateComponent from '../../components/seatsupdate/SeatsUpdateComponent';

interface SeatUpdate {
  screeningId: number;
  updatedSeat: {
    seatId: number;
    free: boolean;
  };
}

function BookingConfirmation() {
  const { bookingNumber, screeningId } = useLoaderData() as {
    bookingNumber: string;
    screeningId: number;
  };

  const { data } = useSuspenseQuery(getBookingDataQuery(bookingNumber));

  const [seats, setSeats] = useState<Seat[]>(data.seats);

  const updateSeats = (seatUpdate: SeatUpdate) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.seatId === seatUpdate.updatedSeat.seatId
          ? { ...seat, free: seatUpdate.updatedSeat.free }
          : seat
      )
    );
  };

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
    { label: 'Bokning-nr', value: data.reservationNumber },
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
        <SeatsUpdateComponent
          screeningId={screeningId}
          onSeatUpdate={updateSeats}
        />
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
                <ListGroup.Item
                  key={index}
                  className="bg-rosa border border-0 text-dark d-flex aline-items-center justify-content-between"
                >
                  <strong>{details.label}</strong>
                  <span>{details.value}</span>
                </ListGroup.Item>
              ))}

              <Col className="d-flex aline-items-center justify-content-evenly my-2 ">
                <PrimaryBtn>
                  <Link to="/">Stäng</Link>
                </PrimaryBtn>
                <PrimaryBtn>
                  <Link to="/avbokning">Avboka</Link>
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
