import { Ship } from "../src/ship";
import { Gameboard } from "../src/gameboard";
import { Player } from "../src/player";

test("1) Create a Player", () => {
  const player = Player("human");
  expect(typeof player).toBe("object");
});

test("2) Create a human Player", () => {
  const humanPlayer = Player("human");
  expect(humanPlayer.isComputer()).toBeFalsy();
});

test("3) Create a computer Player", () => {
  const computerPlayer = Player("computer");
  expect(computerPlayer.isComputer()).toBeTruthy();
});

test("4) Player contains a Gameboard", () => {
  const player = Player("human");
  expect(player.getGameboard()).toBeDefined();
});

test("5) Player can place a Ship on their Gameboard", () => {
  const player = Player("human");
  const gameboard = player.getGameboard();
  const spyGameboardPlaceShip = jest.spyOn(gameboard, "placeShip");
  player.addShipToGameboard(3, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(spyGameboardPlaceShip).toHaveBeenCalled();
  expect(gameboard.getPlacedShips().length).toBe(1);
  expect(gameboard.getCoordinates([0, 0])).toBeDefined();
  expect(gameboard.getCoordinates([0, 1])).toBeDefined();
  expect(gameboard.getCoordinates([0, 2])).toBeDefined();
});

test("6) Player 1 can hit Player 2's Ship", () => {
  const player1 = Player("human");
  const player2 = Player("human");
  player1.setOpposingPlayer(player2);
  player1.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  player2.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  const player1Gameboard = player1.getGameboard();
  const player2Gameboard = player2.getGameboard();
  const player2Ship = player2Gameboard.getPlacedShips()[0];
  const spyPlayer2ReceiveAttack = jest.spyOn(player2Gameboard, "receiveAttack");
  const spyPlayer2ShipHit = jest.spyOn(player2Ship, "hit");
  player1.sendAttack([0, 0]);
  expect(spyPlayer2ReceiveAttack).toHaveBeenCalled();
  expect(spyPlayer2ShipHit).toHaveBeenCalled();
  expect(player1Gameboard.getSentHitShots()).toContainEqual([0, 0]);
  expect(player1Gameboard.getSentMissedShots()).not.toContainEqual([0, 0]);
  expect(player2Gameboard.getReceivedHitShots()).toContainEqual([0, 0]);
  expect(player2Gameboard.getReceivedMissedShots()).not.toContainEqual([0, 0]);
  expect(player2Ship.getShipHits()).toBe(1);
});

test("7) Player 1 misses Player 2's Ship", () => {
  const player1 = Player("human");
  const player2 = Player("human");
  player1.setOpposingPlayer(player2);
  player1.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  player2.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  const player1Gameboard = player1.getGameboard();
  const player2Gameboard = player2.getGameboard();
  const player2Ship = player2Gameboard.getPlacedShips()[0];
  const spyPlayer2ReceiveAttack = jest.spyOn(player2Gameboard, "receiveAttack");
  const spyPlayer2ShipHit = jest.spyOn(player2Ship, "hit");
  player1.sendAttack([0, 2]);
  expect(spyPlayer2ReceiveAttack).toHaveBeenCalled();
  expect(spyPlayer2ShipHit).not.toHaveBeenCalled();
  expect(player1Gameboard.getSentMissedShots()).toContainEqual([0, 2]);
  expect(player1Gameboard.getSentHitShots()).not.toContainEqual([0, 2]);
  expect(player2Gameboard.getReceivedMissedShots()).toContainEqual([0, 2]);
  expect(player2Gameboard.getReceivedHitShots()).not.toContainEqual([0, 2]);
  expect(player2Ship.getShipHits()).toBe(0);
});

test("8) Player 1 sinks one of Player 2's Ships", () => {
  const player1 = Player("human");
  const player2 = Player("human");
  player1.setOpposingPlayer(player2);
  player1.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  player2.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  player2.addShipToGameboard(2, [
    [0, 2],
    [0, 3],
  ]);
  const player2Ship1 = player2.getGameboard().getPlacedShips()[0];
  const player2Ship2 = player2.getGameboard().getPlacedShips()[1];
  player1.sendAttack([0, 0]);
  expect(player2Ship1.getShipHits()).toBe(1);
  expect(player2Ship1.isSunk()).toBeFalsy();
  player1.sendAttack([0, 1]);
  expect(player2Ship1.getShipHits()).toBe(2);
  expect(player2Ship1.isSunk()).toBeTruthy();
  expect(player2.getGameboard().isAllShipsSunk()).toBeFalsy();
  expect(player2Ship2.getShipHits()).toBe(0);
});

test("9) Player 1 sinks all of Player 2's Ships", () => {
  const player1 = Player("human");
  const player2 = Player("human");
  player1.setOpposingPlayer(player2);
  player1.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  player2.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  player2.addShipToGameboard(2, [
    [0, 2],
    [0, 3],
  ]);
  const player2Ship1 = player2.getGameboard().getPlacedShips()[0];
  const player2Ship2 = player2.getGameboard().getPlacedShips()[1];
  const spyShip1Hit = jest.spyOn(player2Ship1, "hit");
  const spyShip2Hit = jest.spyOn(player2Ship2, "hit");
  player1.sendAttack([0, 0]);
  player1.sendAttack([0, 1]);
  expect(spyShip1Hit).toHaveBeenCalledTimes(2);
  expect(player2Ship1.isSunk()).toBeTruthy();
  expect(player2.getGameboard().isAllShipsSunk()).toBeFalsy();
  player1.sendAttack([0, 2]);
  player1.sendAttack([0, 3]);
  expect(spyShip2Hit).toHaveBeenCalledTimes(2);
  expect(player2Ship2.isSunk()).toBeTruthy();
  expect(player2.getGameboard().isAllShipsSunk()).toBeTruthy();
});

test("10) Computer Player can place their 5 Ships of respective lengths on the Gameboard", () => {
  const computerPlayer = Player("computer");
  const computerGameboard = computerPlayer.getGameboard();
  const spyGameboardPlaceShip = jest.spyOn(computerGameboard, "placeShip");
  computerPlayer.initializeComputerGameboard();
  expect(computerGameboard.getPlacedShips().length).toBe(5);
  expect(spyGameboardPlaceShip).toHaveBeenCalledTimes(5);
});

test("11) Computer Player can send attacks that hit", () => {
  const computerPlayer = Player("computer");
  const humanPlayer = Player("human");
  computerPlayer.setOpposingPlayer(humanPlayer);
  computerPlayer.initializeComputerGameboard();
  humanPlayer.addShipToGameboard(2, [
    [1, 0],
    [1, 1],
  ]);
  const computerGameboard = computerPlayer.getGameboard();
  const humanGameboard = humanPlayer.getGameboard();
  const spyHumanReceiveAttack = jest.spyOn(humanGameboard, "receiveAttack");
  jest.spyOn(Math, "random").mockReturnValue(0.1);
  computerPlayer.sendComputerAttack();
  expect(spyHumanReceiveAttack).toHaveBeenCalled();
  expect(computerGameboard.getSentMissedShots().length).toBe(0);
  expect(computerGameboard.getSentHitShots().length).toBe(1);
  expect(humanGameboard.getReceivedMissedShots().length).toBe(0);
  expect(humanGameboard.getReceivedHitShots().length).toBe(1);
  expect(humanGameboard.getPlacedShips()[0].getShipHits()).toBe(1);
  jest.spyOn(global.Math, "random").mockRestore();
});

test("12) Computer Player can send attacks that miss", () => {
  const computerPlayer = Player("computer");
  const humanPlayer = Player("human");
  computerPlayer.setOpposingPlayer(humanPlayer);
  computerPlayer.initializeComputerGameboard();
  humanPlayer.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);
  const computerGameboard = computerPlayer.getGameboard();
  const humanGameboard = humanPlayer.getGameboard();
  const spyHumanReceiveAttack = jest.spyOn(humanGameboard, "receiveAttack");
  jest.spyOn(Math, "random").mockReturnValue(0.1);
  computerPlayer.sendComputerAttack();
  expect(spyHumanReceiveAttack).toHaveBeenCalled();
  expect(computerGameboard.getSentMissedShots().length).toBe(1);
  expect(computerGameboard.getSentHitShots().length).toBe(0);
  expect(humanGameboard.getReceivedMissedShots().length).toBe(1);
  expect(humanGameboard.getReceivedHitShots().length).toBe(0);
  expect(humanGameboard.getPlacedShips()[0].getShipHits()).toBe(0);
  jest.spyOn(global.Math, "random").mockRestore();
});

test("13) Computer Player is unable to send attacks to coordinates previously hit", () => {
  const computerPlayer = Player("computer");
  const humanPlayer = Player("human");
  computerPlayer.setOpposingPlayer(humanPlayer);
  computerPlayer.initializeComputerGameboard();
  humanPlayer.addShipToGameboard(2, [
    [5, 4],
    [5, 5],
  ]);
  const computerGameboard = computerPlayer.getGameboard();
  const humanGameboard = humanPlayer.getGameboard();
  const spyHumanReceiveAttack = jest.spyOn(humanGameboard, "receiveAttack");
  const spyHumanGetReceivedMissedShots = jest.spyOn(
    humanGameboard,
    "getReceivedMissedShots"
  );
  const spyHumanGetReceivedHitShots = jest.spyOn(
    humanGameboard,
    "getReceivedHitShots"
  );
  jest.spyOn(Math, "random").mockReturnValue(0.5);
  computerPlayer.sendComputerAttack();
  expect(spyHumanReceiveAttack).toHaveBeenCalled();
  expect(computerGameboard.getSentMissedShots().length).toBe(0);
  expect(computerGameboard.getSentHitShots().length).toBe(1);
  jest.spyOn(global.Math, "random").mockRestore();
  expect(computerGameboard.getSentMissedShots().length).toBe(0);
  expect(computerGameboard.getSentHitShots().length).toBe(1);
  jest
    .spyOn(Math, "random")
    .mockReturnValue(0)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.5);
  computerPlayer.sendComputerAttack();
  expect(spyHumanGetReceivedMissedShots).toHaveBeenCalledTimes(2);
  expect(spyHumanGetReceivedHitShots).toHaveBeenCalledTimes(2);
  expect(spyHumanReceiveAttack).toHaveBeenCalledTimes(2);
  expect(computerGameboard.getSentMissedShots().length).toBe(1);
  expect(computerGameboard.getSentHitShots().length).toBe(1);
  expect(humanGameboard.getPlacedShips()[0].getShipHits()).toBe(1);
  jest.spyOn(global.Math, "random").mockRestore();
});
