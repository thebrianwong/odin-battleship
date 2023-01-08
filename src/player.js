const Ship = require("./ship");
const Gameboard = require("./gameboard");

const Player = (playerType) => {
  const determinePlayerType = () => {
    if (playerType === "human") {
      return false;
    }
    if (playerType === "computer") {
      return true;
    }
  };
  const computerPlayer = determinePlayerType();
  const playerGameboard = Gameboard();
  const isComputer = () => computerPlayer;
  const getGameboard = () => playerGameboard;
  const addShipToGameboard = (shipLength, coordinates) => {
    const ship = Ship(shipLength);
    playerGameboard.placeShip(ship, coordinates);
  };
  return {
    isComputer,
    getGameboard,
    addShipToGameboard,
  };
};

module.exports = Player;
