import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { DOMController } from "./DOM_controller";

const GameLoop = (() => {
  const players = [];
  let inProgress = true;
  let winner;
  let midAttack = false;
  const getPlayers = () => players;
  const isInProgress = () => inProgress;
  const getWinner = () => winner;
  const isMidAttack = () => midAttack;
  const toggleMidAttack = (state) => {
    state ? (midAttack = true) : (midAttack = false);
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
    const winnerPlayer = loserPlayer.getOpposingPlayer();
    inProgress = false;
    winner = winnerPlayer;
    DOMController.toggleAbilityToAttack("disable");
    DOMController.displayWinner(winner);
  };
  const resetGameLoopState = () => {
    players.length = 0;
    inProgress = true;
    winner = undefined;
  };
  const resetGame = () => {
    resetGameLoopState();
    DOMController.resetDOM();
    createGame();
    DOMController.initializeBoardDOM();
  };
  return {
    getPlayers,
    isInProgress,
    getWinner,
    isMidAttack,
    toggleMidAttack,
    createGame,
    endGame,
    resetGame,
    resetGameLoopState,
  };
})();

export { GameLoop };
