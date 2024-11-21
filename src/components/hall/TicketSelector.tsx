import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ScreeningData } from '../../api/reserve';

interface TicketSelectorProps {
  setTicketIds: React.Dispatch<React.SetStateAction<number[]>>;
  tickets: ScreeningData['tickets'];
}

const TicketSelector: React.FC<TicketSelectorProps> = ({
  tickets,
  setTicketIds,
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

    const ticketIds = tickets.reduce((acc: number[], ticket) => {
      const newIds = [...Array(newCounts[ticket.name])].map(
        () => ticket.ticketId
      );
      return [...acc, ...newIds];
    }, []);

    // Check if adding a new ticket would exceed the limit
    if (increment && ticketIds.length > 8) {
      toast.warning(
        'Vid bokning av fler än 8 platser kontakta oss via e-post filmvisarnabio@gmail.com'
      );
      return;
    }

    setTicketIds(ticketIds);
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
    <section className="d-flex flex-column gap-1">
      <h4 className="text-center fs-5">Välj dina biljetter</h4>

      {tickets.map((ticket) => (
        <Row
          key={ticket.ticketId}
          className="field-container align-items-center py-1"
        >
          <Col>
            {ticket.name} ({ticket.price} SEK)
          </Col>
          <Col className="d-flex align-items-center col-auto">
            <Button
              className="btn-custom"
              onClick={() => handleTicketChange(ticket.name, false)}
            >
              -
            </Button>
            <div className="text-center" style={{ minWidth: '2ch' }}>
              {ticketCounts[ticket.name]}
            </div>
            <Button
              className="btn-custom"
              onClick={() => handleTicketChange(ticket.name, true)}
            >
              +
            </Button>
          </Col>
        </Row>
      ))}

      <Row className="mt-1 field-container align-items-center">
        <Col>Totalpris:</Col>
        <Col className="text-end">{totalPrice} SEK</Col>
      </Row>
    </section>
  );
};

export default TicketSelector;
