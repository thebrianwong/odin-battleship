const Ship = require("../src/ship");
const Gameboard = require("../src/gameboard");

test("create a gameboard object", () => {
  const gameboard = Gameboard();
  expect(typeof gameboard).toBe("object");
});

test("place a length 4 ship on the gameboard", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  expect(gameboard.getCoordinates([3, 4])).toBe(ship);
  expect(gameboard.getCoordinates([3, 5])).toBe(ship);
  expect(gameboard.getCoordinates([3, 6])).toBe(ship);
  expect(gameboard.getCoordinates([3, 7])).toBe(ship);
  expect(gameboard.getCoordinates([3, 8])).toBeUndefined();
});

test("hit a ship on the gameboard", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  const spyShipHit = jest.spyOn(ship, "hit");
  gameboard.receiveAttack([3, 4]);
  expect(spyShipHit).toHaveBeenCalled();
  expect(ship.getShipHits()).toBe(1);
  expect(gameboard.getHitShots()).toEqual([[3, 4]]);
});

test("hit was a miss", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.getCoordinates([0, 0])).toHaveBeenCalled();
  expect(ship.getShipHits()).toBe(0);
  expect(
    gameboard.addToMissedShots([0, 0])
  ).toHaveBeenCalled(); /* might be private */
});

test("get history of missed shots", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);
  expect(gameboard.getMissedShots()).toEqual(expect.arrayContaining([0, 0]));
  expect(gameboard.getMissedShots()).toEqual(expect.arrayContaining([0, 1]));
  expect(gameboard.getMissedShots()).toEqual(expect.arrayContaining([0, 2]));
});

test("place multiple ships on the gameboard", () => {
  const gameboard = Gameboard();
  const ship1 = Ship(4);
  const ship2 = Ship(2);
  gameboard.placeShip(ship1, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  gameboard.placeShip(ship2, [
    [0, 0],
    [0, 1],
  ]);
  expect(gameboard.getPlacedShips()[0]).toBe(ship1);
  expect(gameboard.getPlacedShips()[1]).toBe(ship2);
});

test("one of the gameboard's ships has been sunk", () => {
  const gameboard = Gameboard();
  const ship1 = Ship(4);
  const ship2 = Ship(2);
  gameboard.placeShip(ship1, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  gameboard.placeShip(ship2, [
    [0, 0],
    [0, 1],
  ]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  expect(gameboard.getPlacedShips()[1].isSunk()).toBeTruthy();
});

test("all place ships in the gameboard have been sunk", () => {
  const gameboard = Gameboard();
  const ship1 = Ship(4);
  const ship2 = Ship(2);
  gameboard.placeShip(ship1, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  gameboard.placeShip(ship2, [
    [0, 0],
    [0, 1],
  ]);
  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([3, 5]);
  gameboard.receiveAttack([3, 6]);
  gameboard.receiveAttack([3, 7]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  expect(gameboard.isAllShipsSunk()).toBeTruthy();
});
