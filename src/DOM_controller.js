const DOMController = (() => {
  const createBoardCells = (gameboardDOM) => {
    const BOARDAXESLENGTH = 10;
    for (let i = 0; i < BOARDAXESLENGTH; i++) {
      for (let j = 0; j < BOARDAXESLENGTH; j++) {
        const cell = document.createElement("button");
        cell.setAttribute("dataRow", i);
        cell.setAttribute("dataColumn", j);
        // some click event listener where attack is made OR prior to that, placing ship on that cell
        gameboardDOM.appendChild(cell);
      }
    }
  };
  const initializeBoardDOM = () => {
    const humanPlayerGameboardDOM = document.querySelector(".player-board");
    const opponentGameboardDOM = document.querySelector(".opponent-board");
    createBoardCells(humanPlayerGameboardDOM);
    createBoardCells(opponentGameboardDOM);
  };
  return {
    initializeBoardDOM,
  };
})();

export { DOMController };
