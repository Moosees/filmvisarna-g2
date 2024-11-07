// import { Row } from 'react-bootstrap';

function CinemaTechnology() {
  const cinemaEqiment = [
    {
      Namn: 'Dolby Atmos: ',
      Beskrivning:
        'Ett avancerat ljudsystem som levererar 3D-surroundljud med högtalare placerade i hela salongen.',
      Märke: 'Dolby Laboratories',
    },
    {
      Namn: 'IMAX',
      Beskrivning:
        'Ett filmvisningssystem med en storbildsprojektor och högupplösta bilder för en extra uppslukande upplevelse.',
      Märke: 'IMAX Corporation',
    },
  ];

  return (
    <>
      <div>
        {cinemaEqiment.map((details, index) => (
          <div key={index}>
            <strong>{details.Namn}</strong>
            <span>{details.Beskrivning}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default CinemaTechnology;
