import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

type Seat = { seatId: number; free: boolean };
type SeatWithIndex = { seatId: number; index: number };

interface HallProps {
  seats: Seat[][];
  numPersons: number;
}

const checkAdjacentSeats = (
  row: Seat[],
  currentIndex: number,
  direction: 'left' | 'right'
): number => {
  if (
    currentIndex < 0 ||
    currentIndex >= row.length ||
    !row[currentIndex].free
  ) {
    return 0;
  }

  const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
  return 1 + checkAdjacentSeats(row, nextIndex, direction);
};

const getAffectedSeats = (
  row: Seat[],
  index: number,
  numPersons: number
): SeatWithIndex[] => {
  if (!row[index].free) return []; // taken seats are not interactible
  if (numPersons < 1) return []; // can't reserve zero seats
  if (numPersons === 1) return [{ seatId: row[index].seatId, index }]; // no complex logic needed for single seat reservations

  const freeAround = {
    left: checkAdjacentSeats(row, index - 1, 'left'),
    right: checkAdjacentSeats(row, index + 1, 'right'),
  };

  if (1 + freeAround.left + freeAround.right < numPersons) return []; // can't fit that many people in the slot

  const currentSide = index < Math.ceil(row.length / 2) ? 'left' : 'right';
  const freeAroundRelative = {
    inside: freeAround[currentSide === 'left' ? 'right' : 'left'],
    outside: freeAround[currentSide],
  };
  const seatsWanted = {
    inside: Math.ceil((numPersons - 1) / 2),
    outside: Math.floor((numPersons - 1) / 2),
  };
  const seatsMissing = {
    inside:
      seatsWanted.inside <= freeAroundRelative.inside
        ? 0
        : seatsWanted.inside - freeAroundRelative.inside,
    outside:
      seatsWanted.outside <= freeAroundRelative.outside
        ? 0
        : seatsWanted.outside - freeAroundRelative.outside,
  };
  const seatsToPick = {
    [currentSide === 'left' ? 'right' : 'left']:
      seatsWanted.inside - seatsMissing.inside + seatsMissing.outside,
    [currentSide]:
      seatsWanted.outside - seatsMissing.outside + seatsMissing.inside,
  };

  return row.reduce((acc: SeatWithIndex[], seat, i) => {
    if (i >= index - seatsToPick.left && i <= index + seatsToPick.right) {
      acc.push({ seatId: seat.seatId, index: i });
    }

    return acc;
  }, []); // else return numPersons seats
};

function Hall({ seats, numPersons }: HallProps) {
  const [clicked, setClicked] = useState<number[]>([]);

  const handleClick = (seatIndex: number, row: Seat[]) => {
    console.log({ seatIndex, row, clicked: row[seatIndex] });

    setClicked(
      getAffectedSeats(row, seatIndex, numPersons).map((seat) => seat.seatId)
    );
  };

  return (
    <Container className="d-flex flex-column bg-rosa py-4 align-items-center rounded col-sm-12 col-lg-5 col-xl-4">
      {seats.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} className="mb-2 d-flex justify-content-center">
            {row.map(({ seatId, free }, i) => (
              <Col
                key={seatId}
                onClick={() => handleClick(i, row)}
                className={`border d-flex align-items-center justify-content-center p-2 rounded seat ${!free ? 'bg-dark' : clicked.includes(seatId) ? 'bg-rosa' : 'bg-light'}`}
              />
            ))}
          </Row>
        );
      })}
    </Container>
  );
}

export default Hall;
