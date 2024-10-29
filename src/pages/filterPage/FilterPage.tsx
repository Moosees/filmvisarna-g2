import { Form, Row, Col, Spinner } from 'react-bootstrap';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import 'react-datepicker/dist/react-datepicker.css';
// import DatePickerComponent from '../../components/datePicker/DatePicker';
// import { formatInTimeZone } from 'date-fns-tz';
import { Form as RouterForm, useLoaderData, useSubmit } from 'react-router-dom';
import { filterLoader, getFilterQuery } from '../../api/filter';
import { useSuspenseQuery } from '@tanstack/react-query';

// const timeZone = 'Europe/Stockholm';

export default function FilterPage() {
  const submit = useSubmit();

  const { filters } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof filterLoader>>
  >;

  const { data, isLoading, isError } = useSuspenseQuery(
    getFilterQuery(filters)
  );

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <p>Something went wrong while fetching movies.</p>;
  }

  // const filteredMovies = movies.filter((movie) => {
  //   const matchesSearchTerm = movie.title
  //     .toLowerCase()
  //     .includes(filters.searchTerm.toLowerCase());

  //   const matchesAge = filters.age === '' || movie.age <= Number(filters.age);

  //   const movieDate = new Date(movie.startTime);
  //   const movieDateInTimeZone = formatInTimeZone(
  //     movieDate,
  //     timeZone,
  //     'yyyy-MM-dd'
  //   );

  //   const selectedStartDateInTimeZone = filters.startDate
  //     ? formatInTimeZone(filters.startDate, timeZone, 'yyyy-MM-dd')
  //     : null;

  //   const selectedEndDateInTimeZone = filters.endDate
  //     ? formatInTimeZone(filters.endDate, timeZone, 'yyyy-MM-dd')
  //     : null;

  //   const matchesDate =
  //     (!selectedStartDateInTimeZone && !selectedEndDateInTimeZone) ||
  //     (selectedStartDateInTimeZone &&
  //       movieDateInTimeZone >= selectedStartDateInTimeZone &&
  //       (!selectedEndDateInTimeZone ||
  //         movieDateInTimeZone <= selectedEndDateInTimeZone));

  //   return matchesSearchTerm && matchesAge && matchesDate;
  // });

  return (
    <div className="container my-4">
      <RouterForm
        onChange={(e) => {
          submit(e.currentTarget);
        }}
      >
        <Row className="mb-3">
          <Col md={3}>
            {/* <DatePickerComponent filters={filters} setFilters={setFilters} /> */}
          </Col>

          <Col md={6}>
            <input
              type="text"
              name="titel"
              placeholder="Sök"
              // value={filters.title}
              className="form-control m-0"
            />
          </Col>

          <Col md={3}>
            <Form.Select
              className="bg-light text-dark p-2 m-0"
              name="alder"
              // value={filters.age}
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
        ;
      </Row>
    </div>
  );
}
