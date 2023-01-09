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
  const orientHorizontally = () => {
    const coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip === 0) {
      return true;
    }
    return false;
  };
  const staysOnBoard = (startingCoordinates, shipLength, direction) => {
    switch (direction) {
      case "up":
        if (startingCoordinates[1] - (shipLength - 1) > 0) {
          return true
        } else {
          return false
        }
      case "right":
        if (startingCoordinates[0] + (shipLength - 1) < 9) {
          return true
        } else {
          return false
        }
      case "down":
        if (startingCoordinates[1] + (shipLength - 1) < 9) {
          return true
        } else {
          return false
        }
      case "left":
        if (startingCoordinates[0] - (shipLength - 1) > 0) {
          return true
        } else {
          return false
        }
      default:
        break;
    }
  }
  const canOrientUp = (startingCoordinates, shipLength) => {
    for (let i = 1; i < shipLength; i++) {
      if (startingCoordinates[1] - i < 0 || typeof playerGameboard.getCoordinates([startingCoordinates[0]],[startingCoordinates[1] - i]) !== "object")
    }
  }
  const generateStartingCoordinates = () => {
    const BOARDAXESLENGTH = 10;
    const rowCoordinate = Math.floor(Math.random() * BOARDAXESLENGTH);
    const columnCoordinate = Math.floor(Math.random() * BOARDAXESLENGTH);
    return [rowCoordinate, columnCoordinate];
  };
  const generateNonStartingCoordinates = (startingCoordinates, shipLength) => {
    const nonStartingCoordinates = []
    const possibleOrientations = []
    if (canOrientUp) {
      possibleOrientations.push("up")
    }
  }
  const generateShipCoordinates = (shipLength) => {
    const BOARDAXESLENGTH = 10;
    const listofCoordinates = [];
    let startingCoordinates;
    let nonStartingCoordinates
    do {
      // const rowCoordinate = Math.floor(Math.random() * BOARDAXESLENGTH);
      // const columnCoordinate = Math.floor(Math.random() * BOARDAXESLENGTH);
      // randomStartingCoordinates = [rowCoordinate, columnCoordinate];
      startingCoordinates = generateStartingCoordinates();
      nonStartingCoordinates = generateNonStartingCoordinates(startingCoordinates, shipLength)
    } while (listofCoordinates.length < shipLength);
    // listofCoordinates.push(startingCoordinates)
  };
  const initializeComputerGameboard = () => {
    if (!computerPlayer) {
      return;
    }
    const lengthsOfShips = [5, 4, 3, 3, 2];
    for (const shipLength of lengthsOfShips) {
      const shipCoordinates = generateShipCoordinates(shipLength);
      addShipToGameboard(shipLength, shipCoordinates);
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
