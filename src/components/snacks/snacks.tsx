import { Col, Container, Row } from 'react-bootstrap';

const renderPriceList = (prices: string[], title: string) => (
  <ul className="list-unstyled p-3">
    <div>
      <strong>{title}:</strong>
    </div>
    {prices.map((price, index) => (
      <li key={index}>{price}</li>
    ))}
  </ul>
);

const food = [
  {
    name: 'Popcorn',
    img: 'https://www.bollnasbio.se/files/snacks_popcorn.jpg',
    memberPrice: ['Liten: 15 kr', 'Mellan: 30 kr', 'Stor: 50 kr'],
    price: ['Liten: 20 kr', 'Mellan: 40 kr', 'Stor: 60 kr'],
  },
  {
    name: 'Godis',
    img: 'https://www.bollnasbio.se/files/snacks_gott.jpg',
    memberPrice: ['40 kr'],
    price: ['50 kr'],
  },
  {
    name: 'Bacon snacks',
    img: 'https://media.spisservis.se/spisservis/images/5270-jpg-bup-2024-06-10-082640842/580/580/fill/c/bagare-baconsnacks-1-4lx400st.jpg',
    memberPrice: ['50 kr'],
    price: ['60 kr'],
  },
  {
    name: 'Läsk',
    img: 'https://www.bollnasbio.se/files/snacks_lask.jpg',
    memberPrice: ['15 kr'],
    price: ['20 kr'],
  },
];

function Snacks() {
  return (
    <Container className="d-flex p-5 bg-rosa rounded">
      <Row className="d-flex flex-column">
        <Col className="d-flex">
          <SnacksCard />
        </Col>
      </Row>
    </Container>
  );
}

function SnacksCard() {
  return (
    <Container>
      <Row>
        {food.map((value, index) => {
          return (
            <Col
              key={index}
              md={3}
              className="d-flex flex-column movie-card p-0 rounded custom-letterSpacing fs-md-custom "
              style={{ pointerEvents: 'none' }}
            >
              <img
                src={value.img}
                alt={value.name}
                className="img-fluid rounded-top mb-3"
              />
              <span className="d-flex justify-content-center">
                <h5>{value.name}</h5>
              </span>
              {renderPriceList(value.price, 'Pris')}
              {renderPriceList(value.memberPrice, 'Medlemspris')}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Snacks;
