import { Ship } from "../src/ship";
import { Gameboard } from "../src/gameboard";
import { Player } from "../src/player";
import { GameLoop } from "../src/gameloop";

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

test("3) Human Players can place Ships on their Gameboards", () => {
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

test("4) Computer Players have their Ships randomly placed on their Gameboards", () => {
  GameLoop.createGame();
  const computerPlayer = GameLoop.getPlayers()[0];
  expect(computerPlayer.getGameboard().getPlacedShips().length).toBe(5);
});

test("5) The Game Loop keeps track of the current Player", () => {
  GameLoop.createGame();
  expect(GameLoop.getCurrentPlayer()).toBeDefined();
});

test("6) Expect the game to start with the Human Player as the current Player", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  expect(GameLoop.getCurrentPlayer()).toStrictEqual(humanPlayer);
});

test("7) The current Player switches to the Computer Player after the Human Player attacks", () => {
  GameLoop.createGame();
  const humanPlayer = GameLoop.getPlayers()[0];
  const computerPlayer = GameLoop.getPlayers()[1];
  GameLoop.currentPlayerAttacks([0, 0]);
  // add spyOn sendAttack, receivedAttack, shots array
});
