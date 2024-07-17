const Player = require("./Player");

class GameLogic {
  constructor() {
    this.player1 = new Player("Player 1");
    this.player2 = new Player("Player 2", true); // Assuming player 2 is the computer
  }

  playerAttack(player, opponentGameboard, x, y) {
    player.attack(opponentGameboard, x, y);
  }

  checkWinner() {
    if (this.player2.gameboard.allShipsSunk()) {
      return this.player1;
    }
    if (this.player1.gameboard.allShipsSunk()) {
      return this.player2;
    }
    return null;
  }

  placeShipsRandomly(gameboard) {
    const shipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < shipLengths.length; i++) {
      const length = shipLengths[i];
      let placed = false;
      while (!placed) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        try {
          gameboard.placeShip(length, orientation, x, y);
          placed = true;
        } catch (error) {
          // Try again if the ship cannot be placed
        }
      }
    }
  }

  resetGame() {
    this.player1.gameboard.reset();
    this.player2.gameboard.reset();
    this.placeShipsRandomly(this.player1.gameboard);
    this.placeShipsRandomly(this.player2.gameboard);
  }
}

module.exports = GameLogic;
