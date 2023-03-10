import { Ship } from "../src/ship";

test("1) Create a 4 length Ship with default 0 hits and not sunken properties", () => {
  const ship = Ship(4);
  expect(typeof ship).toBe("object");
  expect(ship.getShipLength()).toBe(4);
  expect(ship.getShipHits()).toBe(0);
  expect(ship.isSunk()).toBeFalsy();
});

test("2) Hit a 3 length Ship twice and increase its hits to 2, but it should not be sunken", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.getShipHits()).toBe(2);
  expect(ship.isSunk()).toBeFalsy();
});

test("3) Hit a 2 length Ship twice and increase its hits to 2 and sink it", () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.getShipHits()).toBe(2);
  expect(ship.isSunk()).toBeTruthy();
});

test("4) Attempt to hit an already sunken Ship", () => {
  const ship = Ship(1);
  ship.hit();
  expect(ship.getShipHits()).toBe(1);
  expect(ship.isSunk()).toBeTruthy();
  expect(ship.hit()).toBe("That ship has already been sunk!");
  expect(ship.getShipHits()).toBe(1);
});
