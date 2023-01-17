import { EventListenerController } from "./event_listener_controller";

const DOMController = (() => {
  const createBoardCells = (gameboardDOM) => {
    const BOARDAXESLENGTH = 10;
    const columnLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const rowLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    for (let i = -1; i < BOARDAXESLENGTH; i++) {
      for (let j = -1; j < BOARDAXESLENGTH; j++) {
        if (i === -1) {
          if (j === -1) {
            const invisiblePlaceholderElement = document.createElement("div");
            invisiblePlaceholderElement.classList.add("gameboard-label");
            invisiblePlaceholderElement.style.visibility = "hidden";
            gameboardDOM.appendChild(invisiblePlaceholderElement);
          } else {
            const columnLabelElement = document.createElement("div");
            columnLabelElement.classList.add("column-label");
            columnLabelElement.textContent = columnLabels[j];
            gameboardDOM.appendChild(columnLabelElement);
          }
        } else if (j === -1) {
          const rowLabelElement = document.createElement("div");
          rowLabelElement.classList.add("row-label");
          rowLabelElement.textContent = rowLabels[i];
          gameboardDOM.appendChild(rowLabelElement);
        } else {
          const cellElement = document.createElement("div");
          cellElement.setAttribute("data-row", i);
          cellElement.setAttribute("data-column", j);
          cellElement.classList.add("gameboard-cell");
          cellElement.addEventListener("dragover", (event) => {
            EventListenerController.dragOver(event);
          });
          cellElement.addEventListener("drop", (event) => {
            EventListenerController.insertDraggedImage(event);
          });
          // some click event listener where attack is made OR prior to that, placing ship on that cell
          gameboardDOM.appendChild(cellElement);
        }
      }
    }
  };
  const initializeBoardDOM = () => {
    const humanPlayerGameboardDOM = document.querySelector(".player-board");
    const opponentGameboardDOM = document.querySelector(".opponent-board");
    createBoardCells(humanPlayerGameboardDOM);
    createBoardCells(opponentGameboardDOM);
  };
  const rotateShipImageListeners = () => {
    const shipPlacementElements = document.querySelectorAll(".ship-placement");
    shipPlacementElements.forEach((group) => {
      const img = group.children[0];
      const btn = group.children[2];
      btn.addEventListener("click", () => {
        EventListenerController.rotateShipImage(img);
      });
    });
  };
  const addShipPlacementDrag = () => {
    const shipImages = Array.from(document.querySelectorAll(".ship-piece"));
    shipImages.forEach((ship) => {
      ship.addEventListener("dragstart", (event) => {
        EventListenerController.getDraggedImage(event);
        EventListenerController.rotateDraggedImage(event);
      });
    });
  };
  return {
    initializeBoardDOM,
    rotateShipImageListeners,
    addShipPlacementDrag,
  };
})();

export { DOMController };
