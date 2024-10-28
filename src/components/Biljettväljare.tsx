import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';


//TODO limit to 8 tickets so that toast pops up

// Define ticket prices interface
interface TicketPrices {
  vuxna: number;
  barn: number;
  pensionär: number;
}

// Ticket selection component
const Biljettväljarkomponent: React.FC = () => {
  const [ticketPrices, setTicketPrices] = useState<TicketPrices | null>(null);
  const [ticketCounts, setTicketCounts] = useState({
    vuxna: 0,
    barn: 0,
    pensionär: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch ticket prices from the backend
  useEffect(() => {
    const fetchTicketPrices = async () => {
      try {
        const response = await axios.get('/api/ticket');

        // Convert the data from backend to the expected format
        const prices: TicketPrices = {
          vuxna: 0,
          barn: 0,
          pensionär: 0,
        };

        response.data.forEach(
          (ticket: { ticket_name: string; price: number }) => {
            switch (ticket.ticket_name) {
              case 'Vuxen':
                prices.vuxna = ticket.price;
                break;
              case 'Barn':
                prices.barn = ticket.price;
                break;
              case 'Senior':
                prices.pensionär = ticket.price;
                break;
            }
          }
        );

        setTicketPrices(prices);
      } catch (error) {
        console.error('Kunde inte hämta biljettpriser, försök igen:', error);
        alert('Kunde inte hämta biljettpriser, försök igen senare.');
      }
    };
    fetchTicketPrices();
  }, []);

  // Update total price whenever ticket counts or prices change
  useEffect(() => {
    if (ticketPrices) {
      const total =
        ticketCounts.vuxna * ticketPrices.vuxna +
        ticketCounts.barn * ticketPrices.barn +
        ticketCounts.pensionär * ticketPrices.pensionär;
      setTotalPrice(total);
    }
  }, [ticketCounts, ticketPrices]);

  // Handle increment/decrement of ticket counts
  const handleTicketChange = (
    type: 'vuxna' | 'barn' | 'pensionär',
    increment: boolean
  ) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: increment
        ? prevCounts[type] + 1
        : Math.max(prevCounts[type] - 1, 0),
    }));
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Row className="col-md-8 col-lg-6 card rounded bg-light shadow-sm p-4">
        <Col>
          <header>
            <h2 className="mb-4 text-center">Välj dina biljetter</h2>
          </header>

          {ticketPrices ? (
            <Form>
              <Form.Group className="mb-3">
                <Row className="align-items-center">
                  <Col xs={6}>
                    <Form.Label>Vuxna ({ticketPrices.vuxna} SEK)</Form.Label>
                  </Col>
                  <Col xs={6} className="text-end">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleTicketChange('vuxna', false)}
                    >
                      -
                    </Button>
                    <span>{ticketCounts.vuxna}</span>
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => handleTicketChange('vuxna', true)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row className="align-items-center">
                  <Col xs={6}>
                    <Form.Label>Barn ({ticketPrices.barn} SEK)</Form.Label>
                  </Col>
                  <Col xs={6} className="text-end">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleTicketChange('barn', false)}
                    >
                      -
                    </Button>
                    <span>{ticketCounts.barn}</span>
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => handleTicketChange('barn', true)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row className="align-items-center">
                  <Col xs={6}>
                    <Form.Label>
                      Pensionär ({ticketPrices.pensionär} SEK)
                    </Form.Label>
                  </Col>
                  <Col xs={6} className="text-end">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleTicketChange('pensionär', false)}
                    >
                      -
                    </Button>
                    <span>{ticketCounts.pensionär}</span>
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => handleTicketChange('pensionär', true)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <Alert variant="info" className="text-center mt-3">
                <h3>Totalpris: {totalPrice} SEK</h3>
              </Alert>
            </Form>
          ) : (
            <Alert variant="secondary" className="text-center">
              <p>Laddar biljettpriser...</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Biljettväljarkomponent;