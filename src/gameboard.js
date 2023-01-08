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
  const missedShots = [];
  const hitShots = [];
  let allShipsSunk = false;
  const placeShip = (ship, coordinatesList) => {
    for (const coordinates of coordinatesList) {
      board[coordinates[0]][coordinates[1]] = ship;
    }
    placedShips.push(ship);
  };
  const getCoordinates = (coordinates) => board[coordinates[0]][coordinates[1]];
  const checkAllShipsSunk = () => {
    for (const ship of placedShips) {
      if (!ship.isSunk()) {
        break;
      }
      allShipsSunk = true;
    }
  };
  const receiveAttack = (coordinates) => {
    const entityAtCoordinates = getCoordinates(coordinates);
    if (entityAtCoordinates !== undefined) {
      entityAtCoordinates.hit();
      checkAllShipsSunk();
      hitShots.push(coordinates);
    } else {
      missedShots.push(coordinates);
    }
  };
  const getMissedShots = () => missedShots;
  const getHitShots = () => hitShots;
  const getPlacedShips = () => placedShips;
  const isAllShipsSunk = () => allShipsSunk;
  return {
    placeShip,
    getCoordinates,
    receiveAttack,
    checkAllShipsSunk,
    getMissedShots,
    getHitShots,
    getPlacedShips,
    isAllShipsSunk,
  };
};

module.exports = Gameboard;
