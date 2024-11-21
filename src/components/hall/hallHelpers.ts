export type Seat = { seatId: number; free: boolean };
export type SeatWithIndex = { seatId: number; index: number };

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

export const getAffectedSeats = (
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
