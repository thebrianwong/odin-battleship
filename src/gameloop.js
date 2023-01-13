import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

const GameLoop = (() => {
  const players = [];
  const inProgress = true;
  const createGame = () => {
    const humanPlayer = Player("human");
    players.push(humanPlayer);
    const computerPlayer = Player("computer");
    players.push(computerPlayer);
  };
  const getPlayers = () => players;
  return {
    createGame,
    getPlayers,
  };
})();

export { GameLoop };
