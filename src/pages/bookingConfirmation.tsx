import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import '../assets/sass/bookingConfirmation.scss';
import { useParams } from 'react-router-dom';

interface Seat {
  row: number;
  number: number;
  seatId: number;
}
interface ReservationData {
  reservationNumber: string;
  title: string;
  startDate: string;
  timeRange: string;
  auditoriumName: string;
  ticketDetails: string;
  totalPrice: string;
  seats: Seat[];
}

function BookingConfirmation() {
  const [reservationData, setReservationData] =
    useState<ReservationData | null>(null);

  // Get reservationNum from the URL parameters
  const { reservationNum } = useParams<{ reservationNum: string }>();

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axios.get(`/api/reservation/${reservationNum}`);
        setReservationData(response.data);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    // Only fetch if reservationNum exists
    if (reservationNum) {
      fetchReservationData();
    }
  }, [reservationNum]);

  return (
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
          {reservationData ? (
            <ul className="list-group">
              <li className="list-group-item ">
                <strong>Bokings-nr:</strong>
                <span>{reservationData.reservationNumber}</span>
              </li>
              <li className="list-group-item">
                <strong>Salong:</strong>
                <span>{reservationData.auditoriumName}</span>
              </li>
              <li className="list-group-item">
                <strong>Plats:</strong>
                <span>
                  {reservationData.seats.map((seat, index) => (
                    <span key={index}>
                      Rad: {seat.row}, Stol: {seat.number}
                    </span>
                  ))}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Film:</strong>
                <span>{reservationData.title}</span>
              </li>
              <li className="list-group-item">
                <strong>Datum:</strong>
                <span>{reservationData.startDate}</span>
              </li>
              <li className="list-group-item">
                <strong>Tid:</strong>
                <span>{reservationData.timeRange}</span>
              </li>
              <li className="list-group-item">
                <strong>Antal personer:</strong>
                <span>{reservationData.ticketDetails}</span>
              </li>
              <li className="list-group-item">
                <strong>Totalt pris:</strong>
                <span>{reservationData.totalPrice}</span>
              </li>
              <Row className="booking-row mt-4">
                <Col className="col-auto">
                  <button className="btn btn-primary mx-2">Stäng</button>
                  <button className="btn btn-primary mx-2">Avboka</button>
                </Col>
              </Row>
            </ul>
          ) : (
            <p>Laddar bokningsinformation...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookingConfirmation;
