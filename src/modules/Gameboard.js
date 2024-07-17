const Ship = require("./Ship");

class Gameboard {
  constructor() {
    this.boardSize = 10;
    this.reset();
  }

  reset() {
    this.board = [];
    this.missedAttacks = [];
    this.ships = [];
    for (let i = 0; i < this.boardSize; i++) {
      const row = new Array(this.boardSize).fill(null);
      this.board.push(row);
    }
  }

  placeShip(length, orientation, x, y) {
    const ship = new Ship(length);
    ship.orientation = orientation;
    ship.x = x;
    ship.y = y;

    if (this.canPlaceShip(ship, x, y)) {
      for (let i = 0; i < ship.length; i++) {
        if (ship.orientation === "horizontal") {
          this.board[x][y + i] = ship;
        } else {
          this.board[x + i][y] = ship;
        }
      }
      ship.placed = true;
      this.ships.push(ship);
    } else {
      throw new Error("Cannot place ship here.");
    }
  }

  canPlaceShip(ship, x, y) {
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "horizontal") {
        if (y + i >= this.boardSize || this.board[x][y + i] !== null) {
          return false;
        }
      } else if (x + i >= this.boardSize || this.board[x + i][y] !== null) {
        return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === null) {
      this.missedAttacks.push([x, y]);
      this.board[x][y] = "miss";
    } else if (this.board[x][y] instanceof Ship) {
      const ship = this.board[x][y];
      ship.hit();
      this.board[x][y] = "hit";
    } else if (this.board[x][y] === "hit" || this.board[x][y] === "miss") {
      throw new Error("Invalid attack coordinate or already attacked.");
    }
  }

  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].sunk) {
        return false;
      }
    }
    return true;
  }

  getShipPositions() {
    const positions = [];
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      for (let j = 0; j < ship.length; j++) {
        if (ship.orientation === "horizontal") {
          positions.push([ship.x, ship.y + j]);
        } else {
          positions.push([ship.x + j, ship.y]);
        }
      }
    }
    return positions;
  }
}

module.exports = Gameboard;
