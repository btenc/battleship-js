const Gameboard = require("../src/modules/Gameboard");
const Ship = require("../src/modules/Ship");

describe("Gameboard class", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("should initialize an empty 10x10 board", () => {
    expect(gameboard.board.length).toBe(10);
    expect(
      gameboard.board.every(
        (row) => row.length === 10 && row.every((cell) => cell === null),
      ),
    ).toBe(true);
  });

  test("should place a ship horizontally", () => {
    gameboard.placeShip(3, "horizontal", 0, 0);
    expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][1]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][2]).toBeInstanceOf(Ship);
  });

  test("should place a ship vertically", () => {
    gameboard.placeShip(3, "vertical", 0, 0);
    expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[1][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[2][0]).toBeInstanceOf(Ship);
  });

  test("should not place a ship if it goes out of bounds horizontally", () => {
    expect(() => {
      gameboard.placeShip(4, "horizontal", 0, 8);
    }).toThrow("Cannot place ship here.");
  });

  test("should not place a ship if it goes out of bounds vertically", () => {
    expect(() => {
      gameboard.placeShip(4, "vertical", 8, 0);
    }).toThrow("Cannot place ship here.");
  });

  test("should not place a ship if it overlaps with another ship", () => {
    gameboard.placeShip(3, "horizontal", 0, 0);
    expect(() => {
      gameboard.placeShip(3, "horizontal", 0, 1);
    }).toThrow("Cannot place ship here.");
  });

  test("should register a hit on a ship", () => {
    gameboard.placeShip(3, "horizontal", 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe("hit");
  });

  test("should register a miss on an empty cell", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe("miss");
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test("should not register an attack on an already hit cell", () => {
    gameboard.placeShip(3, "horizontal", 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(() => {
      gameboard.receiveAttack(0, 0);
    }).toThrow("Invalid attack coordinate or already attacked.");
  });

  test("should report all ships sunk", () => {
    gameboard.placeShip(1, "horizontal", 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("should report not all ships sunk", () => {
    gameboard.placeShip(1, "horizontal", 0, 0);
    gameboard.placeShip(1, "horizontal", 1, 1);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
