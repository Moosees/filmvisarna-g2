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
  const [ticketIds, setTicketIds] = useState<number[]>([]);
  const [seatIds, setSeatIds] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = useSubmit();

  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));

  const error = useActionData() as unknown as string | Response;
  useEffect(() => {
    if (typeof error === 'string') toast.warning(error);
    setIsSubmitting(false);
  }, [error]);

  useEffect(() => {
    const reservedByOther = data.seats
      .flat()
      .filter((seat) => seatIds.includes(seat.seatId) && !seat.free)
      .map((seat) => seat.seatId);

    if (reservedByOther.length) {
      setSeatIds((prev) =>
        prev.filter((seatId) => !reservedByOther.includes(seatId))
      );

      // NOTE: hax to prevent toast from your own reservation
      if (!isSubmitting)
        toast.warning(
          'Någon hann boka en eller flera av dina valda platser före dig'
        );
    }
  }, [data, seatIds, isSubmitting]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    submit({ seatIds, ticketIds, email }, { method: 'POST' });
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
                {/* <PrimaryBtn className="align-self-center"> /}
                {/   <Link to="/medlem/bli-medlem">Bli medlem</Link> /}
                {/ </PrimaryBtn> */}
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
