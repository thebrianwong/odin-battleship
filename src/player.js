import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

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
  let opposingPlayer;
  const isComputer = () => computerPlayer;
  const getGameboard = () => playerGameboard;
  const getOpposingPlayer = () => opposingPlayer;
  const setOpposingPlayer = (player) => {
    opposingPlayer = player;
  };
  const addShipToGameboard = (shipLength, coordinates) => {
    const ship = Ship(shipLength);
    playerGameboard.placeShip(ship, coordinates);
  };
  const sendAttack = (coordinates) => {
    const opposingPlayerGameboard = opposingPlayer.getGameboard();
    const attackResults = opposingPlayer.receiveAttack(coordinates);
    if (attackResults === "hit") {
      playerGameboard.addSentHitShot(coordinates);
    } else if (attackResults === "miss") {
      playerGameboard.addSentMissedShot(coordinates);
    }
    if (opposingPlayer.isComputer()) {
      opposingPlayer.sendComputerAttack();
    }
  };
  const checkIfValidEmptyCoordinates = (
    startingCoordinates,
    shipLength,
    direction
  ) => {
    switch (direction) {
      case "up":
        if (startingCoordinates[0] - (shipLength - 1) < 0) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates([
              startingCoordinates[0] - i,
              startingCoordinates[1],
            ]) !== undefined
          ) {
            return false;
          }
        }
        return true;

      case "right":
        if (startingCoordinates[1] + (shipLength - 1) > 9) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates([
              startingCoordinates[0],
              startingCoordinates[1] + i,
            ]) !== undefined
          ) {
            return false;
          }
        }
        return true;

      case "down":
        if (startingCoordinates[0] + (shipLength - 1) > 9) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates([
              startingCoordinates[0] + i,
              startingCoordinates[1],
            ]) !== undefined
          ) {
            return false;
          }
        }
        return true;

      case "left":
        if (startingCoordinates[1] - (shipLength - 1) < 0) {
          return false;
        }
        for (let i = 1; i < shipLength; i++) {
          if (
            playerGameboard.getCoordinates([
              startingCoordinates[0],
              startingCoordinates[1] - i,
            ]) !== undefined
          ) {
            return false;
          }
        }
        return true;

      default:
        break;
    }
  };

  /*   const staysOnBoard = (startingCoordinates, shipLength, direction) => {
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
  }; */
  const generateRandomCoordinate = () => {
    const BOARDAXESLENGTH = 10;
    return Math.floor(Math.random() * BOARDAXESLENGTH);
  };
  const generateStartingCoordinates = () => {
    const startingCoordinates = [undefined, undefined];
    do {
      startingCoordinates[0] = generateRandomCoordinate();
      startingCoordinates[1] = generateRandomCoordinate();
    } while (playerGameboard.getCoordinates(startingCoordinates) !== undefined);
    return startingCoordinates;
  };
  const generateNonStartingCoordinates = (startingCoordinates, shipLength) => {
    const possibleCoordinates = [];
    if (checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "up")) {
      const upCoordinates = [];
      for (let i = 1; i < shipLength; i++) {
        upCoordinates.push([
          startingCoordinates[0] - i,
          startingCoordinates[1],
        ]);
      }
      possibleCoordinates.push(upCoordinates);
    }
    if (
      checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "right")
    ) {
      const rightCoordinates = [];
      for (let i = 1; i < shipLength; i++) {
        rightCoordinates.push([
          startingCoordinates[0],
          startingCoordinates[1] + i,
        ]);
      }
      possibleCoordinates.push(rightCoordinates);
    }
    if (checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "down")) {
      const downCoordinates = [];
      for (let i = 1; i < shipLength; i++) {
        downCoordinates.push([
          startingCoordinates[0] + i,
          startingCoordinates[1],
        ]);
      }
      possibleCoordinates.push(downCoordinates);
    }
    if (checkIfValidEmptyCoordinates(startingCoordinates, shipLength, "left")) {
      const leftCoordinates = [];
      for (let i = 1; i < shipLength; i++) {
        leftCoordinates.push([
          startingCoordinates[0],
          startingCoordinates[1] - i,
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
    let listOfCoordinates = [];
    do {
      listOfCoordinates = [];
      const startingCoordinates = generateStartingCoordinates();
      const nonStartingCoordinates = generateNonStartingCoordinates(
        startingCoordinates,
        shipLength
      );
      listOfCoordinates.push(startingCoordinates);
      listOfCoordinates = listOfCoordinates.concat(nonStartingCoordinates);
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
  const checkIfPreviouslyAttacked = (
    opposingPlayerReceivedShots,
    attackCoordinates
  ) =>
    opposingPlayerReceivedShots.some(
      (receivedShot) =>
        receivedShot[0] === attackCoordinates[0] &&
        receivedShot[1] === attackCoordinates[1]
    );
  const generateAttackCoordinates = () => {
    const receivedMissedShots = opposingPlayer
      .getGameboard()
      .getReceivedMissedShots();
    const receivedHitShots = opposingPlayer
      .getGameboard()
      .getReceivedHitShots();
    const attackCoordinates = [undefined, undefined];
    do {
      attackCoordinates[0] = generateRandomCoordinate();
      attackCoordinates[1] = generateRandomCoordinate();
    } while (
      checkIfPreviouslyAttacked(receivedMissedShots, attackCoordinates) ||
      checkIfPreviouslyAttacked(receivedHitShots, attackCoordinates)
    );
    return attackCoordinates;
  };
  const sendComputerAttack = () => {
    if (!computerPlayer) {
      return;
    }
    const attackCoordinates = generateAttackCoordinates();
    sendAttack(attackCoordinates);
  };
  const receiveAttack = (coordinates) => {
    const attackResults = playerGameboard.receiveAttack(coordinates);
    return attackResults;
  };
  return {
    isComputer,
    getGameboard,
    getOpposingPlayer,
    setOpposingPlayer,
    addShipToGameboard,
    sendAttack,
    initializeComputerGameboard,
    sendComputerAttack,
    receiveAttack,
  };
};

export { Player };
