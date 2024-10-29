import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define ticket prices interface
interface TicketPrices {
  vuxna: number;
  barn: number;
  pensionär: number;
}

interface TicketSelectorProps {
  setNumPersons: React.Dispatch<React.SetStateAction<number>>;
}

// Ticket selection component
const TicketSelector: React.FC<TicketSelectorProps> = ({ setNumPersons }) => {
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
      setNumPersons(
        ticketCounts.barn + ticketCounts.vuxna + ticketCounts.pensionär
      );
    }
  }, [setNumPersons, ticketCounts, ticketPrices]);

  // Handle increment/decrement of ticket counts
  const handleTicketChange = (
    type: 'vuxna' | 'barn' | 'pensionär',
    increment: boolean
  ) => {
    const newCount = increment
      ? ticketCounts[type] + 1
      : Math.max(ticketCounts[type] - 1, 0);

    const totalTickets =
      ticketCounts.vuxna + ticketCounts.barn + ticketCounts.pensionär;

    // Check if adding a new ticket would exceed the limit
    if (increment && totalTickets >= 8) {
      // Show toast notification
      toast.warn(
        'Vid bokning av fler än 8 platser kontakta oss via e-post filmvisarnabio@gmail.com'
      );
      return;
    }

    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: newCount,
    }));
  };

  return (
    <Container className="ticket-page-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="ticket-card">
          <h2 className="text-center">Välj dina biljetter</h2>

          {ticketPrices ? (
            <>
              <Container className="ticket-selector">
                <Row className="ticket-row field-container">
                  <Col>
                    <span>Vuxna ({ticketPrices.vuxna} SEK)</span>
                  </Col>
                  <Col className="text-end">
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('vuxna', false)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{ticketCounts.vuxna}</span>
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('vuxna', true)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>

                <Row className="ticket-row field-container">
                  <Col>
                    <span>Barn ({ticketPrices.barn} SEK)</span>
                  </Col>
                  <Col className="text-end">
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('barn', false)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{ticketCounts.barn}</span>
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('barn', true)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>

                <Row className="ticket-row field-container">
                  <Col>
                    <span>Pensionär ({ticketPrices.pensionär} SEK)</span>
                  </Col>
                  <Col className="text-end">
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('pensionär', false)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{ticketCounts.pensionär}</span>
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('pensionär', true)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </Container>

              <Container className="ticket-selector">
                <Row className="ticket-row field-container">
                  <Col>
                    <h3>Totalpris:</h3>
                  </Col>
                  <Col className="text-end">
                    <h3>{totalPrice} SEK</h3>
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <p className="text-center">Laddar biljettpriser...</p>
          )}

          {/* React Toastify Container */}
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default TicketSelector;

