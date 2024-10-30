import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import Hall from '../../components/hall/Hall';
import TicketSelector from '../../components/hall/TicketSelector';

function ReservePage() {
  const [ticketIds, setTicketIds] = useState<number[]>([]);
  const [seatIds, setSeatIds] = useState<number[]>([]);

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));
  console.log({ data });

  return (
    <Row>
      <Col className="bg-rosa rounded">
        <Container fluid className="d-flex flex-column gap-3 text-dark">
          <p>{data.startTime}</p>
          <TicketSelector tickets={data.tickets} setTicketIds={setTicketIds} />
          <section className="d-flex flex-column">
            <p>Namn och email</p>
            {/* <PrimaryBtn className="align-self-center"> */}
            {/*   <Link to="/medlem/bli-medlem">Bli medlem</Link> */}
            {/* </PrimaryBtn> */}
          </section>
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
          <PrimaryBtn>Boka</PrimaryBtn>
        </section>
      </Col>
    </Row>
  );
}

export default ReservePage;
