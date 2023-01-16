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
          cellElement.setAttribute("dataRow", i);
          cellElement.setAttribute("dataColumn", j);
          cellElement.classList.add("gameboard-cell");
          cellElement.addEventListener(
            "dragover",
            EventListenerController.dragOver.bind(event)
          );
          cellElement.addEventListener(
            "drop",
            EventListenerController.insertDraggedImage.bind(event)
          );
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
    shipPlacementElements.forEach((pair) => {
      const img = pair.children[0];
      const btn = pair.children[2];
      btn.addEventListener(
        "click",
        EventListenerController.rotateShipImage.bind(event, img)
      );
    });
  };
  const addShipPlacementDrag = () => {
    const testImage = document.querySelector("img");
    testImage.addEventListener("dragstart", (event) => {
      EventListenerController.getDraggedImage(event);
      EventListenerController.rotateDraggedImage(event);
    });
  };
  return {
    initializeBoardDOM,
    rotateShipImageListeners,
    addShipPlacementDrag,
  };
})();

export { DOMController };
