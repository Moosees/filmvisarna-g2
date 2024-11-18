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
    <footer className="row custom-footer  text-center">
      <section className="col">
        <article>
          <h5>Sociala medier:</h5>
          <i className="bi bi-alarm me-3">
            <Instagram size={35} />
          </i>
          <i className="bi bi-alarm me-3">
            <TwitterX size={35} />
          </i>
          <i className="bi bi-alarm me-3">
            <Facebook size={35} />
          </i>
        </article>

        <article>
          <h5>Vi öppnar:</h5>
          <p>Mån - fre 17:00</p>
          <p>Lör - sön 13:00</p>
        </article>
      </section>

      <section className="col">
        <article>
          <h5>Adress:</h5>
          <p>Stockholmsvägen 11</p>
          <p>193XX Norrtälje</p>
          <PinMap size={40} />
        </article>

        <article>
          <h5>Övrigt:</h5>
          <ListGroup variant="flush">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-2"
              >
                {link.label}
              </Link>
            ))}
          </ListGroup>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
