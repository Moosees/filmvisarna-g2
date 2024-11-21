import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ScaryMovieSection from '../../components/eventcomponents/ScaryMovieSection';
import AstridLindgrenSection from '../../components/eventcomponents/AstridLindgrenSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AstridLindgrenMovieQuery, getScaryMovieQuery } from '../../api/event';

const EventPage: React.FC = () => {
  const { data: astridMovies } = useSuspenseQuery(AstridLindgrenMovieQuery());
  const astridDescription =
    astridMovies?.[0]?.description || 'Astrid Lindgrens Matinéhelg';

  const { data: scaryMovies } = useSuspenseQuery(getScaryMovieQuery());
  const scaryDescription =
    scaryMovies?.[0]?.description ||
    'En ikonisk skräckfilmskväll hos Filmvisarna!';

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row className="w-100">
        <AstridLindgrenSection />
        <Col xs={12} className="rounded bg-rosa mt-3 p-3">
          <h4 className="text-black">{astridDescription}</h4>
          <p className="text-black">
            <span className="fw-bold">Filmer som visas:</span> <br />
            <br /> 1. Alla barnen i Bullerbyn
            <br /> 2. Mio min Mio <br />
            3. Ronja Rövardotter <br />
            <br />
            <br /> <span className="fw-bold">Förmåner: </span> <br />
            <br /> <span className="fw-bold">Halva priset på popcorn:</span> De
            som bokar biljetter till alla tre filmer får 50 % rabatt på popcorn
            vid varje visning. <br />
            <br /> <span className="fw-bold">Familjerabatt:</span>{' '}
            Specialerbjudande för familjer som bokar fler än fyra biljetter.{' '}
            <br />
            <br /> <span className="fw-bold">Bokningsinformation:</span>{' '}
            Biljetter kan bokas via hemsidan eller i biljettkassan. <br />
            Popcornrabatten gäller för de som bokar alla tre filmer. <br />
            <br /> En underbar matinéhelg med några av Astrid Lindgrens mest
            älskade berättelser!
          </p>
        </Col>

        <ScaryMovieSection />

        <Col xs={12} className="rounded bg-rosa mt-3 p-3">
          <h4 className="text-black">{scaryDescription}</h4>
          <p className="text-black">
            <span className="fw-bold">Filmer som visas:</span> <br />
            <br /> 1. Nightmare on Elm Street
            <br /> 2. The Shining
            <br /> 3. Friday the 13th
            <br /> 4. Poltergeist
            <br /> <br />
            <span className="fw-bold">Förmåner: </span> Kom utklädd och vi
            bjuder på en liten popcorn! <br />
            <br />
            <span className="fw-bold">Bokningsinformation:</span> Biljetter kan
            bokas via hemsidan eller i biljettkassan.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default EventPage;
