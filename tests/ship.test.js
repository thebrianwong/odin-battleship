const Ship = require("../src/ship");

test("create a ship with 4 length, 0 hit counter, and not sunk", () => {
  const ship = Ship(4);
  expect(typeof ship).toBe("object");
  expect(ship.getShipLength()).toBe(4);
  expect(ship.getShipHits()).toBe(0);
  expect(ship.isSunk()).toBeFalsy();
});

test("create a ship with 3 length, hit it 2 times, increasing hits to 2, but not sunk", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.getShipHits()).toBe(2);
  expect(ship.isSunk()).toBeFalsy();
});

test("create a ship with 2 length, hit it 2 times, increasing hits to 2 and sinking it", () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.getShipHits()).toBe(2);
  expect(ship.isSunk()).toBeTruthy();
});

test("try to hit an already sunken ship", () => {
  const ship = Ship(1);
  ship.hit();
  expect(ship.getShipHits()).toBe(1);
  expect(ship.isSunk()).toBeTruthy();
  expect(ship.hit()).toBe("That ship has already been sunk!");
  expect(ship.getShipHits()).toBe(1);
});
