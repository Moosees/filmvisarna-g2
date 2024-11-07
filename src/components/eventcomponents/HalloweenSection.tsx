import { Col } from 'react-bootstrap';
import BloodImage from '../../assets/images/blood.svg';

const HalloweenSection: React.FC = () => {
  return (
    <Col className="rounded blood-image-wrapper mt-3 position-relative">
      <img
        src={BloodImage}
        alt="Blood decoration"
        className="blood-svg position-absolute"
      />
      <h2 className="text-center mt-3 digital text-danger">
        Fira Halloween med Oss!
      </h2>
    </Col>
  );
};

export default HalloweenSection;
