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
  const sendAttack = (opposingPlayer, coordinates) => {
    const opposingPlayerGameboard = opposingPlayer.getGameboard();
    const attackResults = opposingPlayerGameboard.receiveAttack(coordinates);
    if (attackResults === "hit") {
      playerGameboard.addSentHitShot(coordinates);
    } else if (attackResults === "miss") {
      playerGameboard.addSentMissedShot(coordinates);
    }
  };
  return {
    isComputer,
    getGameboard,
    addShipToGameboard,
    sendAttack,
  };
};

module.exports = Player;
