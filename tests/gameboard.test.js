const Ship = require("../src/ship");
const Gameboard = require("../src/gameboard");

test("Create a Gameboard", () => {
  const gameboard = Gameboard();
  expect(typeof gameboard).toBe("object");
});

test("Place a 4 length Ship on a Gameboard", () => {
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

test("Hit a Ship placed on a Gameboard", () => {
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
  expect(gameboard.getReceivedHitShots()).toEqual([[3, 4]]);
});

test("Attempt to hit a Ship but miss", () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ]);
  const spyShipHit = jest.spyOn(ship, "hit");
  gameboard.receiveAttack([0, 0]);
  expect(spyShipHit).not.toHaveBeenCalled();
  expect(ship.getShipHits()).toBe(0);
  expect(gameboard.getReceivedMissedShots()).toStrictEqual([[0, 0]]);
  expect(gameboard.getReceivedHitShots()).toStrictEqual([]);
});

test("Get a history of missed shots", () => {
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
  expect(gameboard.getReceivedMissedShots()).toContainEqual([0, 1]);
  expect(gameboard.getReceivedMissedShots()).toContainEqual([0, 2]);
  expect(gameboard.getReceivedMissedShots()).toContainEqual([0, 3]);
});

test("Place multiple Ships on the Gameboard", () => {
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

test("Hit a 2 length Ship placed on the Gameboard twice, sinking it", () => {
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

test("Hit all Ships placed on the Gameboard enough times to sink all of the Gameboard's Ships", () => {
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
