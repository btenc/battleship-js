const Player = require("../src/modules/Player");
const Gameboard = require("../src/modules/Gameboard");

describe("Player class", () => {
  let player1;
  let player2;

  beforeEach(() => {
    player1 = new Player("Player 1");
    player2 = new Player("Computer", true);
  });

  test("should create a real player with a gameboard", () => {
    expect(player1.name).toBe("Player 1");
    expect(player1.isComputer).toBe(false);
    expect(player1.gameboard).toBeInstanceOf(Gameboard);
  });

  test("should create a computer player with a gameboard", () => {
    expect(player2.name).toBe("Computer");
    expect(player2.isComputer).toBe(true);
    expect(player2.gameboard).toBeInstanceOf(Gameboard);
  });

  test("real player should attack opponent gameboard", () => {
    const opponentGameboard = new Gameboard();
    player1.attack(opponentGameboard, 0, 0);
    expect(opponentGameboard.board[0][0]).toBe("miss");
  });

  test("computer player should attack opponent gameboard randomly", () => {
    const opponentGameboard = new Gameboard();
    player2.attack(opponentGameboard);
    const attackOccurred = opponentGameboard.board.some((row) =>
      row.some((cell) => cell === "miss" || cell === "hit"),
    );
    expect(attackOccurred).toBe(true);
  });
});
