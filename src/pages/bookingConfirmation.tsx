import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

interface ReservationData {
  reservationNum: string;
  seat: string;
  movie: string;
  date: string;
  time: string;
}

function BookingConfirmation() {
  const [reservationData, setReservationData] =
    useState<ReservationData | null>(null);
  const reservationNum = 'your-reservation-number'; // Replace with the actual reservation number

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axios.get(`/api/reservation/${reservationNum}`);
        setReservationData(response.data);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    fetchReservationData();
  }, [reservationNum]);

  return (
    <Container className="booking-confirmation">
      <Row className="booking-row justify-content-center align-items-center ">
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
              <li className="list-group-item">
                <strong>Bokings-nr:</strong>
                <span>{reservationData.reservationNum}</span>
              </li>
              <li className="list-group-item">
                <strong>Plats:</strong>
                <span>{reservationData.seat}</span>
              </li>
              <li className="list-group-item">
                <strong>Film:</strong>
                <span>{reservationData.movie}</span>
              </li>
              <li className="list-group-item">
                <strong>Datum:</strong>
                <span>{reservationData.date}</span>
              </li>
              <li className="list-group-item">
                <strong>Tid:</strong>
                <span>{reservationData.time}</span>
              </li>
              <li className="list-group-item">
                <strong>Antal personer:</strong>
                <span>data</span>
              </li>
              <li className="list-group-item">
                <strong>Totalt pris:</strong>
                <span>data</span>
              </li>
              <Row className="justify-content-center mt-4">
                <Col className="col-auto">
                  <button className="btn btn-primary mx-2">Stäng</button>
                  <button className="btn btn-primary mx-2">Avboka</button>
                </Col>
              </Row>
            </ul>
          ) : (
            <p>Laddar bokningsinformation...</p> // This will show while data is loading or if it's null
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookingConfirmation;
