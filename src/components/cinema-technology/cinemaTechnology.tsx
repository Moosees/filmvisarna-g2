import { Container, Row } from 'react-bootstrap';

function CinemaTechnology() {
  const cinemaEqiment = [
    {
      Namn: 'Dolby Atmos ',
      Beskrivning:
        ' är ett banbrytande ljudsystem som erbjuder en fullständigt uppslukande ljudupplevelse genom att placera högtalare inte bara runt omkring i salongen utan också i taket. Detta gör det möjligt att skapa en tredimensionell ljudbild där ljudet kan röra sig fritt i alla riktningar – vertikalt, horisontellt och i djupet. Förutom att förbättra upplevelsen av filmer och musik, ger Dolby Atmos en otroligt realistisk ljudåtergivning som gör att du känner att du är en del av själva handlingen. Det är ett system som används i premium-biografer världen över för att ge tittarna den mest detaljerade och dynamiska ljudupplevelsen som finns tillgänglig.',
      Märke: 'Dolby Laboratories',
    },
    {
      Namn: 'IMAX',
      Beskrivning:
        ' är en exklusiv filmvisningsteknik som levererar en filmupplevelse utöver det vanliga. Med hjälp av specialdesignade storbildsprojektorer och högupplösta bilder kan IMAX visa filmer i en imponerande detaljrikedom och med en fantastisk färgprecision. IMAX- bioer är också kända för sina enorma biodukar, som täcker hela synfältet och gör att du nästan känner att du är en del av filmen.Förutom den visuella upplevelsen har IMAX även optimerat ljudsystemet för att ge ett klart och kraftfullt ljud som matchar den storslagna bilden.Det gör att alla sinnen stimuleras på ett sätt som få andra format kan konkurrera med.IMAX är därför det självklara valet för de som söker en filmupplevelse som känns som en verklig, levande värld framför dem.',
      Märke: 'IMAX Corporation',
    },
  ];

  return (
    <Container className="mt-4">
      <Row className="bg-rosa rounded custom-letterSpacing fs-md-custom text-black d-flex justify-content-center">
        {cinemaEqiment.map((details, index) => (
          <div key={index} className="p-4 technology-text">
            <strong>{details.Namn}</strong>
            <span>{details.Beskrivning}</span>
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default CinemaTechnology;
