import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import { getRootDataQuery } from '../../api/root';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import Hall from '../../components/hall/Hall';
import TicketSelector from '../../components/hall/TicketSelector';

function ReservePage() {
  const [ticketIds, setTicketIds] = useState<number[]>([]);
  const [seatIds, setSeatIds] = useState<number[]>([]);
  const [email, setEmail] = useState('');

  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));
  console.log({ data });

  return (
    <form className="row">
      <Col className="bg-rosa rounded">
        <Container fluid className="d-flex flex-column gap-3 text-dark">
          <p>{data.startTime}</p>
          <TicketSelector tickets={data.tickets} setTicketIds={setTicketIds} />
          {!isLoggedIn && (
            <section className="field-container">
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
              {/* <PrimaryBtn className="align-self-center"> */}
              {/*   <Link to="/medlem/bli-medlem">Bli medlem</Link> */}
              {/* </PrimaryBtn> */}
            </section>
          )}
        </Container>
      </Col>
      <Col className="d-flex flex-column gap-3">
        <Hall
          seats={data.seats}
          poster={data.poster}
          numPersons={ticketIds.length}
          seatIds={seatIds}
          setSeatIds={setSeatIds}
        />
        <section className="button-group">
          <PrimaryBtn>
            <Link to="/">Ångra</Link>
          </PrimaryBtn>
          <PrimaryBtn type="submit">Boka</PrimaryBtn>
        </section>
      </Col>
    </form>
  );
}

export default ReservePage;
