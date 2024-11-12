import { Col, Container, Row } from 'react-bootstrap';

const food = [
  {
    name: 'Popcorn',
    img: 'https://www.bollnasbio.se/files/snacks_popcorn.jpg',
    price: ['Liten: 20 kr', 'Mellan: 40 kr', 'Stor: 60 kr'],
  },
  {
    name: 'Godis',
    img: 'https://www.bollnasbio.se/files/snacks_gott.jpg',
    price: ['50 kr'],
  },
  {
    name: 'Bacon snacks',
    img: 'https://media.spisservis.se/spisservis/images/5270-jpg-bup-2024-06-10-082640842/580/580/fill/c/bagare-baconsnacks-1-4lx400st.jpg',
    price: ['100 kr'],
  },
  {
    name: 'Läsk',
    img: 'https://www.bollnasbio.se/files/snacks_lask.jpg',
    price: ['20 kr'],
  },
];

function Snacks() {
  return (
    <Container className="d-flex justify-content-center p-5 bg-rosa">
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
              className="d-flex flex-column align-items-center movie-card p-0 rounded"
            >
              <img
                src={value.img}
                alt={value.name}
                className="img-fluid rounded-top"
              />
              <span className="p-2">
                <strong>{value.name}</strong>
              </span>
              <ul className="list-unstyled p-2">
                {value.price.map((price, priceIndex) => (
                  <li key={priceIndex}>{price}</li>
                ))}
              </ul>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Snacks;
