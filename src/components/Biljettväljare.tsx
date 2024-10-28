import { useState, useEffect } from 'react';
import axios from 'axios';

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
        console.error('Failed to fetch ticket prices:', error);
        alert('Could not load ticket prices. Please try again later.');
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
    <div className="ticket-page-container">
      <div className="ticket-card">
        <h2>Välj dina biljetter</h2>

        {ticketPrices ? (
          <>
            <div className="ticket-selector">
              <div className="ticket-row field-container">
                <span>Vuxna ({ticketPrices.vuxna} SEK)</span>
                <div className="button-group">
                  <button
                    className="btn-custom"
                    onClick={() => handleTicketChange('vuxna', false)}
                  >
                    -
                  </button>
                  <span>{ticketCounts.vuxna}</span>
                  <button
                    className="btn-custom"
                    onClick={() => handleTicketChange('vuxna', true)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="ticket-row field-container">
                <span>Barn ({ticketPrices.barn} SEK)</span>
                <div className="button-group">
                  <button
                    className="btn-custom"
                    onClick={() => handleTicketChange('barn', false)}
                  >
                    -
                  </button>
                  <span>{ticketCounts.barn}</span>
                  <button
                    className="btn-custom"
                    onClick={() => handleTicketChange('barn', true)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="ticket-row field-container">
                <span>Pensionär ({ticketPrices.pensionär} SEK)</span>
                <div className="button-group">
                  <button
                    className="btn-custom"
                    onClick={() => handleTicketChange('pensionär', false)}
                  >
                    -
                  </button>
                  <span>{ticketCounts.pensionär}</span>
                  <button
                    className="btn-custom"
                    onClick={() => handleTicketChange('pensionär', true)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="total-price field-container">
              <h3>Totalpris: {totalPrice} SEK</h3>
            </div>
          </>
        ) : (
          <p>Laddar biljettpriser...</p>
        )}
      </div>
    </div>
  );
};

export default Biljettväljarkomponent;
