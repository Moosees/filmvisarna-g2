import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer text-white text-center py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Sociala medier</h5>
          </div>
          <div className="col-md-3">
            <h5>Vi öppnar</h5>
          </div>
          <div className="col-md-3">
            <h5>Adress</h5>
          </div>
          <div className="col-md-3">
            <h5>Övrigt</h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
