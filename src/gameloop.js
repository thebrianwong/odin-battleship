import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { DOMController } from "./DOM_controller";

const GameLoop = (() => {
  const players = [];
  let inProgress = true;
  let winner;
  const getPlayers = () => players;
  const isInProgress = () => inProgress;
  const getWinner = () => winner;
  const setWinner = (loserPlayer) => {
    const winnerPlayer = loserPlayer.getOpposingPlayer();
    winner = winnerPlayer;
  };
  const createGame = () => {
    const humanPlayer = Player("human");
    players.push(humanPlayer);
    const computerPlayer = Player("computer");
    players.push(computerPlayer);
    humanPlayer.setOpposingPlayer(computerPlayer);
    computerPlayer.setOpposingPlayer(humanPlayer);
    computerPlayer.initializeComputerGameboard();
  };
  const endGame = (loserPlayer) => {
    inProgress = false;
    setWinner(loserPlayer);
    DOMController.toggleAbilityToAttack("disable");
  };
  const resetGame = () => {
    players.length = 0;
    inProgress = true;
    winner = undefined;
  };
  return {
    getPlayers,
    isInProgress,
    getWinner,
    createGame,
    endGame,
    resetGame,
  };
})();

export { GameLoop };
