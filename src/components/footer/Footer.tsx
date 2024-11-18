import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Facebook, Instagram, PinMap, TwitterX } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const links = [
  { label: 'Biogodis', to: '/godis' },
  { label: ' Teknik', to: '/godis#teknik' },
  { label: 'Om oss', to: '/om-oss' },
  { label: 'Avboka', to: '/avbokning' },
  { label: ' Kontakt', to: '/om-oss#kontakt' },
];

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer text-center ">
      <section className="col d-flex justify-content-around fs-md-custom  py-3 ">
        <article className="d-none d-md-block">
          <h5 className="mb-3">Sociala medier:</h5>
          <Instagram size={35} className="icon-scale mx-2" />
          <TwitterX size={35} className="icon-scale mx-2" />
          <Facebook size={35} className="icon-scale mx-2" />
        </article>
        <div className="d-flex flex-column w-50  flex-md-row justify-content-around">
          <article className="fs-md-custom mb-3">
            <h5>Vi öppnar:</h5>
            <p className="m-1 my-md-3">Mån - fre 17:00</p>
            <p className="m-1 my-md-3">Lör - sön 13:00</p>
          </article>

          <article className="fs-md-custom">
            <h5>Adress:</h5>
            <p className="my-1 my-md-3">Stockholmsvägen 11</p>
            <p className="m-1 my-md-3 d-flex justify-content-center align-items-end">
              <span>
                <PinMap size={25} className="me-2 " />
              </span>
              193XX Norrtälje
            </p>
          </article>
        </div>
        <article>
          <h5>Övrigt:</h5>
          <ListGroup variant="flush">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-2 mb-md-3 "
              >
                {link.label}
              </Link>
            ))}
          </ListGroup>
        </article>
      </section>
      <article className=" d-md-none p-0 pb-4">
        <h5 className="mb-3">Sociala medier:</h5>
        <Instagram size={35} className="icon-scale me-2" />
        <TwitterX size={35} className="icon-scale me-2" />
        <Facebook size={35} className="icon-scale me-2" />
      </article>
    </footer>
  );
};

export default Footer;
