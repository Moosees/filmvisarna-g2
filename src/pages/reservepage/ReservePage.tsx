import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import { getRootDataQuery } from '../../api/root';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import Hall from '../../components/hall/Hall';
import TicketSelector from '../../components/hall/TicketSelector';
import { toast } from 'react-toastify';

function ReservePage() {
  const [email, setEmail] = useState('');
  const [seatIds, setSeatIds] = useState<number[]>([]);
  const [ticketIds, setTicketIds] = useState<number[]>([]);
  const submit = useSubmit();

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));
  console.log(data);
  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const error = useActionData() as unknown as string | Response;
  useEffect(() => {
    if (typeof error === 'string') toast.warning(error);
  }, [error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // 1. Submit reservation details to create the booking
    submit({ seatIds, ticketIds, email }, { method: 'POST' });

    // 2. Trigger confirmation email with booking details
    await sendConfirmationEmail(email);
  };

  const sendConfirmationEmail = async (recipientEmail: string) => {
    const emailDetails = {
      to: recipientEmail,
      subject: 'Tack för din bokning hos Filmvisarna!',
      text: 'Tack för din bokning hos Filmvisarna! Vi ser fram emot att välkomna dig.',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #3e1e3d; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
            <h1 style="background-color: #ff94e0; color: #3e1e3d; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; margin: 0;">
              Filmvisarna
            </h1>
            <h2 style="color: #3e1e3d; margin-top: 20px;">Tack för din bokning hos Filmvisarna!</h2>
            <p style="color: #3e1e3d;">Hej!</p>
            <p style="color: #3e1e3d;">Vi är glada att bekräfta din bokning. Här är en sammanfattning:</p>
            <ul style="background-color: #ff94e0; padding: 15px; border-radius: 8px; color: #3e1e3d;">
              <li><strong>Boknings-nr:</strong> </li>
              <li><strong>Salong:</strong> </li>
              <li><strong>Plats:</strong> ${data.seats}</li>
              <li><strong>Film:</strong> ${data.title}</li>
              <li><strong>Datum:</strong> ${data.date}</li>
              <li><strong>Tid:</strong> ${data.time}</li>
              <li><strong>Antal personer:</strong> ${data.tickets}</li>
              <li><strong>Totalt pris:</strong></li>

            </ul>
            <p style="margin-top: 20px; color: #3e1e3d;">Vi ser fram emot att välkomna dig! Om du har några frågor, tveka inte att kontakta oss.</p>
            <p style="color: #3e1e3d;">Med vänliga hälsningar,<br />Filmvisarna</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">Filmvisarna AB | Adressvägen 123, 111 22 Stockholm</p>
          </div>
        </div>
      `,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailDetails),
      });

      if (response.ok) toast.success('Bekräftelse skickad!');
      else toast.error('Fel vid e-postskick.');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      toast.error('E-postfel');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row gy-2 align-items-center">
      <Col className="col-12 col-lg-6">
        <Container
          fluid
          className="bg-rosa rounded d-flex flex-column gap-4 text-dark p-3"
        >
          <h2 className="text-decoration-underline">{data.title}</h2>
          <h4 className="cap-first">
            {data.date} {data.time}
          </h4>
          <TicketSelector tickets={data.tickets} setTicketIds={setTicketIds} />
          {!isLoggedIn && (
            <Row>
              <Col className="field-container">
                <label htmlFor="email" className="form-label">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-field"
                  placeholder="Ange din e-postadress"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
          )}
        </Container>
      </Col>
      <Col className="d-flex flex-column gap-3 col-12 col-lg-6">
        <Hall
          seats={data.seats}
          poster={data.poster}
          numPersons={ticketIds.length}
          seatIds={seatIds}
          setSeatIds={setSeatIds}
        />
        <div className="button-group">
          <PrimaryBtn>
            <Link to="/">Ångra</Link>
          </PrimaryBtn>
          <PrimaryBtn
            type="submit"
            disabled={
              ticketIds.length === 0 || ticketIds.length !== seatIds.length
            }
          >
            Boka
          </PrimaryBtn>
        </div>
      </Col>
    </form>
  );
}

export default ReservePage;
