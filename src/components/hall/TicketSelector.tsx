import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TicketPrices {
  vuxna: number;
  barn: number;
  senior: number;
}

interface TicketSelectorProps {
  setNumPersons: React.Dispatch<React.SetStateAction<number>>;
  ticketPrices: TicketPrices;
}

const TicketSelector: React.FC<TicketSelectorProps> = ({
  ticketPrices,
  setNumPersons,
}) => {
  const [ticketCounts, setTicketCounts] = useState({
    vuxna: 0,
    barn: 0,
    senior: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Update total price whenever ticket counts or prices change
  useEffect(() => {
    if (ticketPrices) {
      const total =
        ticketCounts.vuxna * ticketPrices.vuxna +
        ticketCounts.barn * ticketPrices.barn +
        ticketCounts.senior * ticketPrices.senior;
      setTotalPrice(total);
      setNumPersons(
        ticketCounts.barn + ticketCounts.vuxna + ticketCounts.senior
      );
    }
  }, [setNumPersons, ticketCounts, ticketPrices]);

  // Handle increment/decrement of ticket counts
  const handleTicketChange = (type: keyof TicketPrices, increment: boolean) => {
    const newCount = increment
      ? ticketCounts[type] + 1
      : Math.max(ticketCounts[type] - 1, 0);

    const totalTickets =
      ticketCounts.vuxna + ticketCounts.barn + ticketCounts.senior;

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
                    <span>Senior ({ticketPrices.senior} SEK)</span>
                  </Col>
                  <Col className="text-end">
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('senior', false)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{ticketCounts.senior}</span>
                    <Button
                      className="btn-custom"
                      onClick={() => handleTicketChange('senior', true)}
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
