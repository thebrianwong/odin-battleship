const Ship = (givenLength) => {
  const length = givenLength;
  let hits = 0;
  let sunk = false;
  const getShipLength = () => length;
  const getShipHits = () => hits;
  const isSunk = () => sunk;
  const checkIfSunk = () => {
    if (hits === length) {
      sunk = true;
    }
  };
  const hit = () => {
    if (!sunk) {
      hits += 1;
      checkIfSunk();
    } else {
      return "That ship has already been sunk!";
    }
  };
  return {
    getShipLength,
    getShipHits,
    isSunk,
    hit,
  };
};

export { Ship };
