import { Col, Container, Row } from 'react-bootstrap';

const food = [
  {
    name: 'Popcorn',
    img: 'img här',
    price: '100kr',
  },
  {
    name: 'Chips',
    img: 'img här',
    price: '50kr',
  },
  {
    name: 'Bacon snacks',
    img: 'https://media.spisservis.se/spisservis/images/5270-jpg-bup-2024-06-10-082640842/580/580/fill/c/bagare-baconsnacks-1-4lx400st.jpg',
    price: '100kr',
  },
];

const drinks = [
  {
    name: 'Cola',
    img: 'img här',
    price: '30kr',
  },
  {
    name: 'Fanta',
    img: 'img här',
    price: '30kr',
  },
  {
    name: 'Sprite',
    img: 'img här',
    price: '30kr',
  },
  {
    name: 'Pepsi',
    img: 'img här',
    price: '30kr',
  },
];

function Snacks() {
  return (
    <Container>
      <Row className="d-flex flex-column flex-md-row">
        <Col className="d-flex me-3">
          <SnacksCard />
        </Col>
        <Col className="d-flex bg-rosa">{/* <SnacksCard /> */}</Col>
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
              className="d-flex flex-column align-items-center bg-rosa"
              style={{ width: '150px', height: '150px' }}
            >
              <img src={value.img} alt={value.name} className="img-fluid" />
              <span>{value.name}</span>
              <span>Pris: {value.price} </span>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Snacks;
