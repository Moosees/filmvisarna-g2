import { Form, Row, Col, Spinner } from 'react-bootstrap';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import 'react-datepicker/dist/react-datepicker.css';
// import DatePickerComponent from '../../components/datePicker/DatePicker';
// import { formatInTimeZone } from 'date-fns-tz';
import { Form as RouterForm, useLoaderData, useSubmit } from 'react-router-dom';
import { filterLoader, getFilterQuery } from '../../api/filter';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { addDays, subDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';

// const timeZone = 'Europe/Stockholm';

export default function FilterPage() {
  const submit = useSubmit();

  const { filters } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof filterLoader>>
  >;

  const { data, isLoading, isError } = useSuspenseQuery(
    getFilterQuery(filters)
  );

  const [startDate, setStartDate] = useState(
    filters.startDate ? new Date(filters.startDate) : undefined
  );
  const [endDate, setEndDate] = useState(
    filters.endDate ? new Date(filters.endDate) : undefined
  );

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <p>Something went wrong while fetching movies.</p>;
  }

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || undefined);
    setEndDate(end || undefined);

    submit(
      {
        startDate: start ? format(start, 'yyyy-MM-dd') : '',
        endDate: end ? format(end, 'yyyy-MM-dd') : '',
      },
      { replace: true }
    );
  };
  return (
    <div className="container my-4 ">
      <RouterForm
        onChange={(e) => {
          submit(e.currentTarget);
        }}
      >
        <Row className=" mx-md-auto py-1 bg-rosa col-md-8 rounded">
          <Col lg={4} className="d-md-none">
            <input
              type="text"
              name="titel"
              placeholder="Sök"
              className="form-control bg-light text-dark placeholder-gray my-1 my-lg-2"
            />
          </Col>

          <Col lg={4} className="col-6 px-1 px-md-2">
            {/* <DatePickerComponent filters={filters} setFilters={setFilters} /> */}
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              includeDateIntervals={[
                { start: subDays(new Date(), 1), end: addDays(new Date(), 14) },
              ]}
              dateFormat="yyyy-MM-dd"
              placeholderText="Välj Datum"
              isClearable={true}
              className="form-control bg-light text-dark placeholder-gray fs-s-custom p-2 my-1 my-lg-2 "
            />
          </Col>

          <Col lg={4} className="d-none d-md-block ">
            <input
              type="text"
              name="titel"
              placeholder="Sök"
              className="form-control bg-light text-dark placeholder-gray my-1 my-lg-2"
            />
          </Col>

          <Col lg={4} className="col-6 px-1 px-md-2">
            <Form.Select
              className="bg-light text-dark my-1 my-lg-2 placeholder-gray"
              name="alder"
            >
              <option value="">Ålder</option>
              <option value="7">7+</option>
              <option value="11">11+</option>
              <option value="15">15+</option>
            </Form.Select>
          </Col>
        </Row>
      </RouterForm>

      <Row>
        <CardsWrapper>
          {data && data.length > 0 ? (
            data.map((movie) => (
              <MovieCard
                key={movie.screeningId}
                movieId={movie.movieId}
                screeningId={movie.screeningId}
                age={movie.age}
                posterUrl={movie.posterUrl}
                title={movie.title}
                startTime={movie.timeRange}
              />
            ))
          ) : (
            <p>Inga filmer matchar de valda filtren.</p>
          )}
        </CardsWrapper>
      </Row>
    </div>
  );
}
