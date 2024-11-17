import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { getScreeningDataQuery, reserveLoader } from '../../api/reserve';
import { getRootDataQuery } from '../../api/root';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import Hall from '../../components/hall/Hall';
import TicketSelector from '../../components/hall/TicketSelector';
import useSeatUpdate from '../../hooks/useSeatUpdate';
import InputWrapper from '../../components/form/InputWrapper';

function ReservePage() {
  const [ticketIds, setTicketIds] = useState<number[]>([]);
  const [seatIds, setSeatIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [splitSeats, setSplitSeats] = useState(false);
  const submit = useSubmit();
  useSeatUpdate();

  const {
    data: { isLoggedIn },
  } = useSuspenseQuery(getRootDataQuery());

  const { screeningId } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof reserveLoader>>
  >;
  const { data } = useSuspenseQuery(getScreeningDataQuery(screeningId));

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<{ email: string }>({ mode: 'onChange' });

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

  const onSubmit = () => {
    if (formErrors.email) return;
    setIsSubmitting(true);

    const email = getValues('email');
    submit({ seatIds, ticketIds, email }, { method: 'POST' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row gy-2 align-items-center"
      noValidate
    >
      <Col className="col-12 col-lg-6">
        <Container
          fluid
          className="bg-rosa rounded d-flex flex-column gap-3 text-dark p-3"
        >
          <h2 className="text-decoration-underline fs-4">{data.title}</h2>
          <h3 className="cap-first fs-5">
            {data.date} {data.time}
          </h3>
          <TicketSelector tickets={data.tickets} setTicketIds={setTicketIds} />
          <Row
            style={{ cursor: 'pointer' }}
            className="field-container"
            onClick={() => setSplitSeats((checked) => !checked)}
          >
            <Form.Check
              className="custom-switch"
              type="switch"
              label={`Skilda platser ${splitSeats ? '(på)' : '(av)'}`}
              checked={splitSeats}
            />
          </Row>
          {!isLoggedIn && (
            <Row>
              <InputWrapper
                controlId="email"
                label="E-post"
                errorMsg={formErrors.email?.message}
              >
                <Form.Control
                  type="email"
                  className="form-control-field"
                  placeholder="Ange din e-post"
                  defaultValue=""
                  {...register('email', {
                    required: 'E-post krävs',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: 'Var god fyll i en giltig e-postadress',
                    },
                  })}
                  isInvalid={!!formErrors.email}
                />
              </InputWrapper>
            </Row>
          )}
        </Container>
      </Col>
      <Col className="d-flex flex-column gap-3 col-12 col-lg-6">
        <Hall
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
              ticketIds.length === 0 ||
              ticketIds.length !== seatIds.length ||
              !!formErrors.email
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
