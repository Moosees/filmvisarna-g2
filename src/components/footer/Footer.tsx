import React from 'react';
import './footer.scss';
import '../../assets/sass/fonts.scss';
import { Instagram } from 'react-bootstrap-icons';
import { TwitterX } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer text-center mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Sociala medier:</h5>
            <Instagram size={35} />
            <TwitterX size={35} />
            <Facebook size={35} />
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
          </div>
          <div className="col-md-3">
            <h5>Övrigt:</h5>
            <p>Biogodis</p>
            <p>Teknik</p>
            <p>Om oss</p>
            <p>Avboka</p>
            <p>Kontaka oss</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
