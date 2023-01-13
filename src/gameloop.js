import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

const GameLoop = (() => {
  const players = [];
  let inProgress = true;
  const createGame = () => {
    const humanPlayer = Player("human");
    players.push(humanPlayer);
    const computerPlayer = Player("computer");
    players.push(computerPlayer);
    humanPlayer.setOpposingPlayer(computerPlayer);
    computerPlayer.setOpposingPlayer(humanPlayer);
  };
  const getPlayers = () => players;
  const resetGame = () => {
    players.length = 0;
    inProgress = true;
  };
  return {
    createGame,
    getPlayers,
    resetGame,
  };
})();

export { GameLoop };
