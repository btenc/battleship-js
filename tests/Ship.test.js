const Ship = require("../src/modules/Ship");

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("initializes with the correct properties", () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
    expect(ship.orientation).toBe("horizontal");
    expect(ship.placed).toBe(false);
  });

  test("hit() increases the number of hits", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("hit() calls isSunk() when hits equal length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

  test("isSunk() sets sunk to true when hits equal length", () => {
    ship.hits = 2;
    ship.isSunk();
    expect(ship.sunk).toBe(false);
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

  test("switchOrientation() changes orientation from horizontal to vertical", () => {
    ship.switchOrientation();
    expect(ship.orientation).toBe("vertical");
  });

  test("switchOrientation() changes orientation from vertical to horizontal", () => {
    ship.switchOrientation();
    ship.switchOrientation();
    expect(ship.orientation).toBe("horizontal");
  });
});
