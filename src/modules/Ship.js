class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.orientation = "horizontal";
    this.placed = false;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
      this.isSunk();
    }
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }

  switchOrientation() {
    if (this.orientation === "horizontal") {
      this.orientation = "vertical";
    } else {
      this.orientation = "horizontal";
    }
  }
}

module.exports = Ship;
