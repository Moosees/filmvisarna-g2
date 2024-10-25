import React from 'react';
import './footer.scss';
import '../../assets/sass/fonts.scss';
import { Instagram } from 'react-bootstrap-icons';
import { TwitterX } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { PinMap } from 'react-bootstrap-icons';

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer text-center mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
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
          </div>
          <div className="col-md-3">
            <h5>Vi öppnar:</h5>
            <p>Mån - fre 17:00</p>
            <p>Lör - sön 13:00</p>
          </div>
          <div className="col-md-3">
            <h5>Adress:</h5>
            <p>Stockholmsvägen 11</p>
            <p>193XX Norrtälje</p>
            <PinMap size={40} />
          </div>
          <div className="col-md-3">
            <h5>Övrigt:</h5>
            <p>
              <a
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="#"
              >
                Biogodis
              </a>
            </p>
            <p>
              <a
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="#"
              >
                Teknik
              </a>
            </p>
            <p>
              <a
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="#"
              >
                Om oss
              </a>
            </p>
            <p>
              <a
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="#"
              >
                Avboka
              </a>
            </p>
            <p>
              <a
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="#"
              >
                Kontakt
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
