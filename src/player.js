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
  const checkIfValidEmptyCoordinates = (
    startingCoordinates,
    shipLength,
    direction
  ) => {
    switch (direction) {
      case "up":
        if (startingCoordinates[1] - (shipLength - 1) < 0) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates(
              [startingCoordinates[0]],
              [startingCoordinates[1] - i]
            ) !== undefined
          ) {
            return false;
          }
        }
        return true;

      case "right":
        if (startingCoordinates[0] + (shipLength - 1) > 9) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates(
              [startingCoordinates[0] + i],
              [startingCoordinates[1]]
            ) !== undefined
          ) {
            return false;
          }
        }
        return true;

      case "down":
        if (startingCoordinates[1] + (shipLength - 1) > 9) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates(
              [startingCoordinates[0]],
              [startingCoordinates[1] + i]
            ) !== undefined
          ) {
            return false;
          }
        }
        return true;

      case "left":
        if (startingCoordinates[0] - (shipLength - 1) < 0) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates(
              [startingCoordinates[0] - i],
              [startingCoordinates[1]]
            ) !== undefined
          ) {
            return false;
          }
        }
        return true;

      default:
        break;
    }
  };

  const staysOnBoard = (startingCoordinates, shipLength, direction) => {
    switch (direction) {
      case "up":
        if (startingCoordinates[1] - (shipLength - 1) > 0) {
          return true;
        }
        return false;

      case "right":
        if (startingCoordinates[0] + (shipLength - 1) < 9) {
          return true;
        }
        return false;

      case "down":
        if (startingCoordinates[1] + (shipLength - 1) < 9) {
          return true;
        }
        return false;

      case "left":
        if (startingCoordinates[0] - (shipLength - 1) > 0) {
          return true;
        }
        return false;

      default:
        break;
    }
  };
  const generateStartingCoordinates = () => {
    const BOARDAXESLENGTH = 10;
    const rowCoordinate = Math.floor(Math.random() * BOARDAXESLENGTH);
    const columnCoordinate = Math.floor(Math.random() * BOARDAXESLENGTH);
    return [rowCoordinate, columnCoordinate];
  };
  const generateNonStartingCoordinates = (startingCoordinates, shipLength) => {
    const possibleCoordinates = [];
    if (checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "up")) {
      const upCoordinates = [];
      for (let i = 1; i < shipLength - 1; i++) {
        upCoordinates.push([
          startingCoordinates[0],
          startingCoordinates[1] - i,
        ]);
      }
      possibleCoordinates.push(upCoordinates);
    }
    if (
      checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "right")
    ) {
      const rightCoordinates = [];
      for (let i = 1; i < shipLength - 1; i++) {
        rightCoordinates.push([
          startingCoordinates[0] + i,
          startingCoordinates[1],
        ]);
      }
      possibleCoordinates.push(rightCoordinates);
    }
    if (checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "down")) {
      const downCoordinates = [];
      for (let i = 1; i < shipLength - 1; i++) {
        downCoordinates.push([
          startingCoordinates[0],
          startingCoordinates[1] + i,
        ]);
      }
      possibleCoordinates.push(downCoordinates);
    }
    if (checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "left")) {
      const leftCoordinates = [];
      for (let i = 1; i < shipLength - 1; i++) {
        leftCoordinates.push([
          startingCoordinates[0] - i,
          startingCoordinates[1],
        ]);
      }
      possibleCoordinates.push(leftCoordinates);
    }
    if (possibleCoordinates.length === 0) {
      return possibleCoordinates;
    }
    const randomIndex = Math.floor(Math.random() * possibleCoordinates.length);
    return possibleCoordinates[randomIndex];
  };
  const generateShipCoordinates = (shipLength) => {
    const listOfCoordinates = [];
    let startingCoordinates;
    let nonStartingCoordinates;
    do {
      startingCoordinates = generateStartingCoordinates();
      nonStartingCoordinates = generateNonStartingCoordinates(
        startingCoordinates,
        shipLength
      );
      listOfCoordinates.push(startingCoordinates);
      listOfCoordinates.concat(nonStartingCoordinates);
    } while (listOfCoordinates.length < shipLength);
    return listOfCoordinates;
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
