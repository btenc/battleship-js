const GameLogic = require("./GameLogic");

class DomController {
  constructor() {
    this.gameLogic = new GameLogic();
    this.player1BoardElement = document.getElementById("player-board");
    this.player2BoardElement = document.getElementById("player2-board");
    this.messageElement = document.getElementById("message");
    this.resetButton = document.getElementById("reset-game");

    this.resetButton.addEventListener("click", () => this.resetGame());

    if (!this.player1BoardElement || !this.player2BoardElement) {
      throw new Error("Board elements not found in the DOM.");
    }

    this.initBoard(this.player1BoardElement);
    this.initBoard(this.player2BoardElement);
    this.setupEventListeners();
    this.resetGame();
  }

  initBoard(boardElement) {
    boardElement.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;
        boardElement.appendChild(cell);
      }
    }
  }

  setupEventListeners() {
    this.player2BoardElement.addEventListener(
      "click",
      this.handlePlayerAttack.bind(this),
    );
  }

  handlePlayerAttack(event) {
    const { target } = event;
    if (!target.classList.contains("cell")) return;

    const x = parseInt(target.dataset.x, 10);
    const y = parseInt(target.dataset.y, 10);

    try {
      this.gameLogic.playerAttack(
        this.gameLogic.player1,
        this.gameLogic.player2.gameboard,
        x,
        y,
      );
      this.updateBoard(
        this.player2BoardElement,
        this.gameLogic.player2.gameboard,
      );
      this.updateSunkShips(
        this.player2BoardElement,
        this.gameLogic.player2.gameboard,
      );
      const winner = this.gameLogic.checkWinner();
      if (winner) {
        this.endGame(winner);
        return;
      }
      this.player2Attack();
    } catch (error) {
      console.error(error.message);
    }
  }

  player2Attack() {
    try {
      this.gameLogic.playerAttack(
        this.gameLogic.player2,
        this.gameLogic.player1.gameboard,
      );
      this.updateBoard(
        this.player1BoardElement,
        this.gameLogic.player1.gameboard,
      );
      this.updateSunkShips(
        this.player1BoardElement,
        this.gameLogic.player1.gameboard,
      );
      const winner = this.gameLogic.checkWinner();
      if (winner) {
        this.endGame(winner);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  endGame(winner) {
    this.messageElement.textContent = `${winner.name} wins!`;
    this.player2BoardElement.classList.add("disabled");
    this.player1BoardElement.classList.add("disabled");
  }

  updateBoard(boardElement, gameboard) {
    const cells = boardElement.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const x = parseInt(cell.dataset.x, 10);
      const y = parseInt(cell.dataset.y, 10);
      if (gameboard.board[x][y] === "hit") {
        cell.classList.add("hit");
      } else if (gameboard.board[x][y] === "miss") {
        cell.classList.add("miss");
      }
    }
  }

  updateSunkShips(boardElement, gameboard) {
    gameboard.ships.forEach((ship) => {
      if (ship.sunk) {
        for (let i = 0; i < ship.length; i++) {
          let x;
          let y;
          if (ship.orientation === "horizontal") {
            x = ship.x;
            y = ship.y + i;
          } else {
            x = ship.x + i;
            y = ship.y;
          }
          const cell = boardElement.querySelector(
            `[data-x="${x}"][data-y="${y}"]`,
          );
          if (cell) {
            cell.classList.add("sunk-ship");
          }
        }
      }
    });
  }

  displayShips(boardElement, gameboard, isPlayerBoard) {
    const shipPositions = gameboard.getShipPositions();
    for (let i = 0; i < shipPositions.length; i++) {
      const pos = shipPositions[i];
      const x = pos[0];
      const y = pos[1];
      const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (cell) {
        if (isPlayerBoard) {
          cell.classList.add("ship");
        } else {
          cell.classList.add("hidden-ship");
        }
      }
    }
  }

  resetGame() {
    this.player1BoardElement.innerHTML = "";
    this.player2BoardElement.innerHTML = "";
    this.initBoard(this.player1BoardElement);
    this.initBoard(this.player2BoardElement);
    this.messageElement.textContent = "";

    this.gameLogic.resetGame();

    this.displayShips(
      this.player1BoardElement,
      this.gameLogic.player1.gameboard,
      true,
    );
    this.displayShips(
      this.player2BoardElement,
      this.gameLogic.player2.gameboard,
      false,
    );

    this.player2BoardElement.classList.remove("disabled");
    this.player1BoardElement.classList.remove("disabled");
    this.setupEventListeners();
  }
}

module.exports = DomController;
