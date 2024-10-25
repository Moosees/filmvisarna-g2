import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CardsWrapper from '../../components/movieCard/CardsWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X } from 'react-bootstrap-icons';

const movies = [
  {
    id: 2,
    screeningId: 43,
    src: 'https://posterhouse.org/wp-content/uploads/2021/05/godfather_0.jpg',
    age: 15,
    title: 'The Godfather',
    startTime: '2024-10-25',
  },
  {
    id: 3,
    screeningId: 12,
    src: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091',
    age: 15,
    title: 'Gladiator',
    startTime: '2024-10-25',
  },
  {
    id: 4,
    screeningId: 33,
    src: 'https://i.ebayimg.com/images/g/86UAAOSweIlb5A3Q/s-l1600.webp',
    age: 15,
    title: 'THE GRINCH',
    startTime: '2024-10-26',
  },
];

const FilterPage: React.FC = () => {
  const [filters, setFilters] = useState({
    selectedDate: null as Date | null,
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

  const handleClearDate = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedDate: null,
    }));
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearchTerm = movie.title
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());

    const matchesAge =
      filters.selectedAge === '' || movie.age <= Number(filters.selectedAge);

    const matchesDate =
      filters.selectedDate === null ||
      new Date(movie.startTime).toDateString() ===
        filters.selectedDate.toDateString();

    return matchesSearchTerm && matchesAge && matchesDate;
  });

  return (
    <div className="container my-4">
      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={filters.selectedDate}
                onChange={(date: Date | null) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedDate: date,
                  }))
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="Välj Datum"
                className="form-control react-datepicker-wrapper p-2 m-0"
              />

              <X
                onClick={handleClearDate}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10%',
                  cursor: 'pointer',
                  color: 'black',
                }}
                size={30}
              />
            </div>
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
            <p>No movies match the selected filters.</p>
          )}
        </CardsWrapper>
      </Row>
    </div>
  );
};

export default FilterPage;
