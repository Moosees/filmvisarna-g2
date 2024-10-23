import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.scss';
import '../../assets/sass/fonts.scss';

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer text-center py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Sociala medier:</h5>
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
            <p>Bli medlem</p>
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
