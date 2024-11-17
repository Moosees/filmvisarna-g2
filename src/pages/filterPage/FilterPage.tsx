import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import { filterLoader, getFilterQuery } from '../../api/filter';
import { format } from 'date-fns';
import DatePickerSweden from '../../components/datePicker/DatePickerSwededn';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';

export default function FilterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const { filters } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof filterLoader>>
  >;
  const { data, isLoading } = useSuspenseQuery(getFilterQuery(filters));

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchParams((params) => {
        params.set('titel', searchInput);
        return params;
      });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput, setSearchParams]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setSearchParams((params) => {
      params.set('startDatum', start ? format(start, 'yyyy-MM-dd') : '');
      params.set('slutDatum', end ? format(end, 'yyyy-MM-dd') : '');
      return params;
    });
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container my-4 ">
      <Form>
        <Row className=" mx-md-auto py-1 bg-rosa col-md-8 rounded">
          <Col lg={4}>
            <input
              type="text"
              name="titel"
              placeholder="Sök"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="form-control bg-light text-dark placeholder-gray my-1 my-lg-2 "
            />
          </Col>

          <Col lg={4} className="col-6 px-1 px-md-2">
            <DatePickerSweden
              handleDateChange={handleDateChange}
              searchParams={searchParams}
            />
          </Col>

          <Col lg={4} className="col-6 px-1 px-md-2">
            <Form.Select
              className="bg-light text-dark my-1 my-lg-2 placeholder-gray"
              name="alder"
              onChange={(e) =>
                setSearchParams((params) => {
                  params.set(e.target.name, e.target.value);
                  return params;
                })
              }
              value={searchParams.get('alder') || ''}
            >
              <option value="">Ålder</option>
              <option value="7">7+</option>
              <option value="11">11+</option>
              <option value="15">15+</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <Row>
        <CardsWrapper>
          {data && data.length > 0 ? (
            data.map((movie) => (
              <MovieCard
                key={movie.screeningId}
                movieId={movie.movieId}
                paramUrl={movie.paramUrl}
                screeningId={movie.screeningId}
                age={movie.age}
                posterUrl={movie.posterUrl}
                title={movie.title}
                startTime={movie.timeRange}
                day={movie.dateFormat.dayName}
                screeningDate={movie.dateFormat.screeningDate}
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
