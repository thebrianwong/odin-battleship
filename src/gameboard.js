const Gameboard = () => {
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push(undefined);
      }
    }
    return board;
  };
  const board = createBoard();
  const placedShips = [];
  const receivedMissedShots = [];
  const receivedHitShots = [];
  const sentMissedShots = [];
  const sentHitShots = [];
  let allShipsSunk = false;
  const getCoordinates = (coordinates) => board[coordinates[0]][coordinates[1]];
  const getPlacedShips = () => placedShips;
  const getReceivedMissedShots = () => receivedMissedShots;
  const getReceivedHitShots = () => receivedHitShots;
  const getSentMissedShots = () => sentMissedShots;
  const getSentHitShots = () => sentHitShots;
  const isAllShipsSunk = () => allShipsSunk;
  const placeShip = (ship, coordinatesList) => {
    for (const coordinates of coordinatesList) {
      board[coordinates[0]][coordinates[1]] = ship;
    }
    placedShips.push(ship);
  };
  const checkAllShipsSunk = () => {
    if (placedShips.every((ship) => ship.isSunk())) {
      allShipsSunk = true;
    }
  };
  const receiveAttack = (coordinates) => {
    const entityAtCoordinates = getCoordinates(coordinates);
    if (entityAtCoordinates !== undefined) {
      entityAtCoordinates.hit();
      checkAllShipsSunk();
      receivedHitShots.push(coordinates);
      return "hit";
    }
    receivedMissedShots.push(coordinates);
    return "miss";
  };
  const addSentMissedShot = (coordinates) => {
    sentMissedShots.push(coordinates);
  };
  const addSentHitShot = (coordinates) => {
    sentHitShots.push(coordinates);
  };
  return {
    getCoordinates,
    getPlacedShips,
    getReceivedMissedShots,
    getReceivedHitShots,
    getSentMissedShots,
    getSentHitShots,
    isAllShipsSunk,
    placeShip,
    receiveAttack,
    addSentMissedShot,
    addSentHitShot,
  };
};

export { Gameboard };
