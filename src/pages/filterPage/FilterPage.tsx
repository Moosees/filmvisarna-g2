import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerComponent from '../../components/datePicker/DatePicker';
import { formatInTimeZone } from 'date-fns-tz';

const movies = [
  {
    id: 2,
    screeningId: 43,
    src: 'https://posterhouse.org/wp-content/uploads/2021/05/godfather_0.jpg',
    age: 15,
    title: 'The Godfather',
    startTime: '2024-11-02',
  },
  {
    id: 3,
    screeningId: 12,
    src: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
    age: 15,
    title: 'Gladiator',
    startTime: '2024-10-30',
  },
  {
    id: 4,
    screeningId: 33,
    src: 'https://i.ebayimg.com/images/g/86UAAOSweIlb5A3Q/s-l1600.webp',
    age: 15,
    title: 'THE GRINCH',
    startTime: '2024-11-26',
  },
];

const timeZone = 'Europe/Stockholm';

export default function FilterPage() {
  const [filters, setFilters] = useState({
    selectedStartDate: undefined as Date | undefined,
    selectedEndDate: undefined as Date | undefined,
    searchTerm: '',
    selectedAge: '',
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearchTerm = movie.title
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());

    const matchesAge =
      filters.selectedAge === '' || movie.age <= Number(filters.selectedAge);

    const movieDate = new Date(movie.startTime);
    const movieDateInTimeZone = formatInTimeZone(
      movieDate,
      timeZone,
      'yyyy-MM-dd'
    );

    const selectedStartDateInTimeZone = filters.selectedStartDate
      ? formatInTimeZone(filters.selectedStartDate, timeZone, 'yyyy-MM-dd')
      : null;

    const selectedEndDateInTimeZone = filters.selectedEndDate
      ? formatInTimeZone(filters.selectedEndDate, timeZone, 'yyyy-MM-dd')
      : null;

    const matchesDate =
      (!selectedStartDateInTimeZone && !selectedEndDateInTimeZone) ||
      (selectedStartDateInTimeZone &&
        movieDateInTimeZone >= selectedStartDateInTimeZone &&
        (!selectedEndDateInTimeZone ||
          movieDateInTimeZone <= selectedEndDateInTimeZone));

    return matchesSearchTerm && matchesAge && matchesDate;
  });

  return (
    <div className="container my-4">
      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <DatePickerComponent filters={filters} setFilters={setFilters} />
          </Col>

          <Col md={6}>
            <input
              type="text"
              name="searchTerm"
              placeholder="Sök"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="form-control m-0"
            />
          </Col>

          <Col md={3}>
            <Form.Select
              className="bg-light text-dark p-2 m-0"
              name="selectedAge"
              value={filters.selectedAge}
              onChange={handleFilterChange}
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
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                movieId={movie.id}
                screeningId={movie.screeningId}
                age={movie.age}
                src={movie.src}
                title={movie.title}
                startTime={movie.startTime}
                key={movie.id}
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
