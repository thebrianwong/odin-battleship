import { Ship } from "../src/ship";
import { Gameboard } from "../src/gameboard";
import { Player } from "../src/player";
import { GameLoop } from "../src/gameloop";

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
  humanPlayer.sendAttack([0, 0]);
  expect(spyHumanSendAttack).toHaveBeenCalledTimes(1);
  expect(spyHumanReceiveAttack).toHaveBeenCalledTimes(1);
  expect(spyComputerSendComputerAttack).toHaveBeenCalledTimes(1);
  expect(spyComputerReceiveAttack).toHaveBeenCalledTimes(1);
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
  humanPlayer.sendAttack([6, 6]);
  humanPlayer.sendAttack([6, 7]);
  expect(humanPlayer.getGameboard().isAllShipsSunk()).toBeTruthy();
  // game loop need to know somehow and set inProgress to false
});
