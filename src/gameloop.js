import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

const GameLoop = (() => {
  const players = [];
  let inProgress = true;
  let winner;
  const createGame = () => {
    const humanPlayer = Player("human");
    players.push(humanPlayer);
    const computerPlayer = Player("computer");
    players.push(computerPlayer);
    humanPlayer.setOpposingPlayer(computerPlayer);
    computerPlayer.setOpposingPlayer(humanPlayer);
    computerPlayer.initializeComputerGameboard();
  };
  const getPlayers = () => players;
  const resetGame = () => {
    players.length = 0;
    inProgress = true;
    winner = undefined;
  };
  const endGame = (loserPlayer) => {
    inProgress = false;
    setWinner(loserPlayer);
  };
  const isInProgress = () => inProgress;
  const setWinner = (loserPlayer) => {
    const winnerPlayer = loserPlayer.getOpposingPlayer();
    winner = winnerPlayer;
  };
  const getWinner = () => winner;
  return {
    createGame,
    getPlayers,
    resetGame,
    endGame,
    isInProgress,
    getWinner,
  };
})();

export { GameLoop };
