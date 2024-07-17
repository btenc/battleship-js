const Gameboard = require("./Gameboard");

class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  attack(opponentGameboard, x, y) {
    if (this.isComputer) {
      this.randomAttack(opponentGameboard);
    } else {
      opponentGameboard.receiveAttack(x, y);
    }
  }

  randomAttack(opponentGameboard) {
    let validAttack = false;
    while (!validAttack) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      try {
        opponentGameboard.receiveAttack(x, y);
        validAttack = true;
      } catch (error) {
        // Invalid attack (already attacked coordinates), try again
      }
    }
  }
}

module.exports = Player;
