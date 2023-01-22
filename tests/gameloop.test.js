/**
 * @jest-environment jsdom
 */

import { Ship } from "../src/ship";
import { Gameboard } from "../src/gameboard";
import { Player } from "../src/player";
import { GameLoop } from "../src/gameloop";
import { DOMController } from "../src/DOM_controller";

afterEach(() => {
  GameLoop.resetGame();
});

test("1) Create a new game with a human Player and a computer Player", () => {
  GameLoop.createGame();
  const players = GameLoop.getPlayers();
  expect(players.length).toBe(2);
  const humanPlayer = players[0];
  const computerPlayer = players[1];
  expect(humanPlayer.isComputer()).toBeFalsy();
  expect(computerPlayer.isComputer()).toBeTruthy();
});

test("2) Expect Players to have Gameboards upon being initialized", () => {
  GameLoop.createGame();
  const players = GameLoop.getPlayers();
  const humanPlayer = players[0];
  const computerPlayer = players[1];
  expect(humanPlayer.getGameboard()).toBeDefined();
  expect(computerPlayer.getGameboard()).toBeDefined();
});

test("3) Expect Players to hold references to their opponents", () => {
  GameLoop.createGame();
  const players = GameLoop.getPlayers();
  const humanPlayer = players[0];
  const computerPlayer = players[1];
  expect(humanPlayer.getOpposingPlayer()).toStrictEqual(computerPlayer);
  expect(computerPlayer.getOpposingPlayer()).toStrictEqual(humanPlayer);
});

test("4) Human Players can place Ships on their Gameboards", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  humanPlayer.addShipToGameboard(5, [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
  humanPlayer.addShipToGameboard(4, [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  humanPlayer.addShipToGameboard(3, [
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  humanPlayer.addShipToGameboard(3, [
    [3, 0],
    [3, 1],
    [3, 2],
  ]);
  humanPlayer.addShipToGameboard(2, [
    [4, 0],
    [4, 1],
  ]);
  expect(humanPlayer.getGameboard().getPlacedShips().length).toBe(5);
});

test("5) Computer Players have their Ships randomly placed on their Gameboards", () => {
  GameLoop.createGame();
  const computerPlayer = GameLoop.getPlayers()[1];
  expect(computerPlayer.getGameboard().getPlacedShips().length).toBe(5);
});

test("6) The Computer Player attacks after the Human Player attacks", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  const spyHumanSendAttack = jest.spyOn(humanPlayer, "sendAttack");
  const spyHumanReceiveAttack = jest.spyOn(humanPlayer, "receiveAttack");
  const computerPlayer = GameLoop.getPlayers()[1];
  const spyComputerSendComputerAttack = jest.spyOn(
    computerPlayer,
    "sendComputerAttack"
  );
  const spyComputerReceiveAttack = jest.spyOn(computerPlayer, "receiveAttack");

  // Set up DOM elements for computer
  const computerGameboardDOM = document.createElement("div");
  computerGameboardDOM.classList.add("computer-board");
  document.body.appendChild(computerGameboardDOM);
  const targetCellComputer = document.createElement("div");
  targetCellComputer.dataset.row = "0";
  targetCellComputer.dataset.column = "0";
  computerGameboardDOM.appendChild(targetCellComputer);

  // Set up DOM elements for human
  const humanGameboardDOM = document.createElement("div");
  humanGameboardDOM.classList.add("player-board");
  document.body.appendChild(humanGameboardDOM);
  const targetCellHuman = document.createElement("div");
  targetCellHuman.dataset.row = "0";
  targetCellHuman.dataset.column = "0";
  humanGameboardDOM.appendChild(targetCellHuman);

  jest.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0);
  jest.useFakeTimers();
  humanPlayer.sendAttack([0, 0]);
  jest.advanceTimersByTime(1000);
  expect(spyHumanSendAttack).toHaveBeenCalledTimes(1);
  expect(spyHumanReceiveAttack).toHaveBeenCalledTimes(1);
  expect(spyComputerSendComputerAttack).toHaveBeenCalledTimes(1);
  expect(spyComputerReceiveAttack).toHaveBeenCalledTimes(1);
  document.body.innerHTML = "";
  jest.spyOn(global.Math, "random").mockRestore();
  jest.useRealTimers();
});

test("7) The game ends after a Player loses all their Ships", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.1);
  humanPlayer.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);

  // Set up DOM elements for computer
  const computerGameboardDOM = document.createElement("div");
  computerGameboardDOM.classList.add("computer-board");
  document.body.appendChild(computerGameboardDOM);
  const targetCellComputer1 = document.createElement("div");
  targetCellComputer1.dataset.row = "6";
  targetCellComputer1.dataset.column = "6";
  computerGameboardDOM.appendChild(targetCellComputer1);
  const targetCellComputer2 = document.createElement("div");
  targetCellComputer2.dataset.row = "6";
  targetCellComputer2.dataset.column = "7";
  computerGameboardDOM.appendChild(targetCellComputer2);

  // Set up DOM elements for human
  const humanGameboardDOM = document.createElement("div");
  humanGameboardDOM.classList.add("player-board");
  document.body.appendChild(humanGameboardDOM);
  const targetCellHuman1 = document.createElement("div");
  targetCellHuman1.dataset.row = "0";
  targetCellHuman1.dataset.column = "0";
  humanGameboardDOM.appendChild(targetCellHuman1);
  const targetCellHuman2 = document.createElement("div");
  targetCellHuman2.dataset.row = "0";
  targetCellHuman2.dataset.column = "1";
  humanGameboardDOM.appendChild(targetCellHuman2);

  // Set up DOM elements for game results
  const gameResultsElement = document.createElement("div");
  gameResultsElement.classList.add("game-results");
  gameResultsElement.classList.add("default-hidden");
  document.body.appendChild(gameResultsElement);
  const displayWinner = document.createElement("p");
  displayWinner.classList.add("display-winner");
  gameResultsElement.appendChild(displayWinner);

  jest.useFakeTimers();
  humanPlayer.sendAttack([6, 6]);
  jest.advanceTimersByTime(1000);
  humanPlayer.sendAttack([6, 7]);
  jest.advanceTimersByTime(1000);
  expect(humanPlayer.getGameboard().isAllShipsSunk()).toBeTruthy();
  expect(GameLoop.isInProgress()).toBeFalsy();
  document.body.innerHTML = "";
  jest.spyOn(global.Math, "random").mockRestore();
  jest.useRealTimers();
});

test("8) The game know which Player won after the game ends", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  const computerPlayer = GameLoop.getPlayers()[1];
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.1);
  humanPlayer.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);

  // Set up DOM elements for computer
  const computerGameboardDOM = document.createElement("div");
  computerGameboardDOM.classList.add("computer-board");
  document.body.appendChild(computerGameboardDOM);
  const targetCellComputer1 = document.createElement("div");
  targetCellComputer1.dataset.row = "6";
  targetCellComputer1.dataset.column = "6";
  computerGameboardDOM.appendChild(targetCellComputer1);
  const targetCellComputer2 = document.createElement("div");
  targetCellComputer2.dataset.row = "6";
  targetCellComputer2.dataset.column = "7";
  computerGameboardDOM.appendChild(targetCellComputer2);

  // Set up DOM elements for human
  const humanGameboardDOM = document.createElement("div");
  humanGameboardDOM.classList.add("player-board");
  document.body.appendChild(humanGameboardDOM);
  const targetCellHuman1 = document.createElement("div");
  targetCellHuman1.dataset.row = "0";
  targetCellHuman1.dataset.column = "0";
  humanGameboardDOM.appendChild(targetCellHuman1);
  const targetCellHuman2 = document.createElement("div");
  targetCellHuman2.dataset.row = "0";
  targetCellHuman2.dataset.column = "1";
  humanGameboardDOM.appendChild(targetCellHuman2);

  // Set up DOM elements for game results
  const gameResultsElement = document.createElement("div");
  gameResultsElement.classList.add("game-results");
  gameResultsElement.classList.add("default-hidden");
  document.body.appendChild(gameResultsElement);
  const displayWinner = document.createElement("p");
  displayWinner.classList.add("display-winner");
  gameResultsElement.appendChild(displayWinner);

  jest.useFakeTimers();
  humanPlayer.sendAttack([6, 6]);
  jest.advanceTimersByTime(1000);
  humanPlayer.sendAttack([6, 7]);
  jest.advanceTimersByTime(1000);
  expect(GameLoop.getWinner()).toStrictEqual(computerPlayer);
  document.body.innerHTML = "";
  jest.spyOn(global.Math, "random").mockRestore();
  jest.useRealTimers();
});

test("9) The game can reset itself after it ends and the player wants to play again", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.1);
  humanPlayer.addShipToGameboard(2, [
    [0, 0],
    [0, 1],
  ]);

  // Set up DOM elements for computer
  const computerGameboardDOM = document.createElement("div");
  computerGameboardDOM.classList.add("computer-board");
  document.body.appendChild(computerGameboardDOM);
  const targetCellComputer1 = document.createElement("div");
  targetCellComputer1.dataset.row = "6";
  targetCellComputer1.dataset.column = "6";
  computerGameboardDOM.appendChild(targetCellComputer1);
  const targetCellComputer2 = document.createElement("div");
  targetCellComputer2.dataset.row = "6";
  targetCellComputer2.dataset.column = "7";
  computerGameboardDOM.appendChild(targetCellComputer2);

  // Set up DOM elements for human
  const humanGameboardDOM = document.createElement("div");
  humanGameboardDOM.classList.add("player-board");
  document.body.appendChild(humanGameboardDOM);
  const targetCellHuman1 = document.createElement("div");
  targetCellHuman1.dataset.row = "0";
  targetCellHuman1.dataset.column = "0";
  humanGameboardDOM.appendChild(targetCellHuman1);
  const targetCellHuman2 = document.createElement("div");
  targetCellHuman2.dataset.row = "0";
  targetCellHuman2.dataset.column = "1";
  humanGameboardDOM.appendChild(targetCellHuman2);

  // Set up DOM elements for game results
  const gameResultsElement = document.createElement("div");
  gameResultsElement.classList.add("game-results");
  gameResultsElement.classList.add("default-hidden");
  document.body.appendChild(gameResultsElement);
  const displayWinner = document.createElement("p");
  displayWinner.classList.add("display-winner");
  gameResultsElement.appendChild(displayWinner);

  jest.useFakeTimers();
  humanPlayer.sendAttack([6, 6]);
  jest.advanceTimersByTime(1000);
  humanPlayer.sendAttack([6, 7]);
  jest.advanceTimersByTime(1000);
  expect(GameLoop.getPlayers().length).toBeGreaterThan(0);
  expect(GameLoop.isInProgress()).toBeFalsy();
  expect(GameLoop.getWinner()).toBeDefined();
  GameLoop.resetGame();
  expect(GameLoop.getPlayers().length).toBe(0);
  expect(GameLoop.isInProgress()).toBeTruthy();
  expect(GameLoop.getWinner()).toBeUndefined();
  document.body.innerHTML = "";
  jest.spyOn(global.Math, "random").mockRestore();
  jest.useRealTimers();
});
