import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScreeningData } from '../../api/reserve';

interface TicketSelectorProps {
  setNumPersons: React.Dispatch<React.SetStateAction<number>>;
  tickets: ScreeningData['tickets'];
}

const TicketSelector: React.FC<TicketSelectorProps> = ({
  tickets,
  setNumPersons,
}) => {
  const [ticketCounts, setTicketCounts] = useState(
    tickets.reduce((acc: Record<string, number>, ticket) => {
      acc[ticket.name] = 0;
      return acc;
    }, {})
  );
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle increment/decrement of ticket counts
  const handleTicketChange = (type: string, increment: boolean) => {
    const newCounts = { ...ticketCounts };
    newCounts[type] = increment
      ? newCounts[type] + 1
      : Math.max(newCounts[type] - 1, 0);

    const totalTickets = Object.values(newCounts).reduce(
      (acc, num) => acc + num
    );

    // Check if adding a new ticket would exceed the limit
    if (increment && totalTickets >= 8) {
      toast.warn(
        'Vid bokning av fler än 8 platser kontakta oss via e-post filmvisarnabio@gmail.com'
      );
      return;
    }

    setNumPersons(totalTickets);
    setTicketCounts(newCounts);
    setTotalPrice(
      tickets.reduce(
        (acc, ticket) => acc + ticket.price * newCounts[ticket.name],
        0
      )
    );
  };

  // evil useEffect to set ticket count to 1 when mounting the page
  useEffect(() => {
    if ('Vuxen' in ticketCounts && totalPrice === 0)
      handleTicketChange('Vuxen', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h2 className="text-center">Välj dina biljetter</h2>

      <Container className="ticket-selector">
        {tickets.map((ticket) => (
          <Row key={ticket.ticketId} className="ticket-row field-container">
            <Col>
              <span>
                {ticket.name} ({ticket.price} SEK)
              </span>
            </Col>
            <Col className="text-end">
              <Button
                className="btn-custom"
                onClick={() => handleTicketChange(ticket.name, false)}
              >
                -
              </Button>
              <span className="mx-2">{ticketCounts[ticket.name]}</span>
              <Button
                className="btn-custom"
                onClick={() => handleTicketChange(ticket.name, true)}
              >
                +
              </Button>
            </Col>
          </Row>
        ))}
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
    </section>
  );
};

export default TicketSelector;
