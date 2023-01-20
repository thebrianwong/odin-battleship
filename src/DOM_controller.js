import { GameLoop } from "./gameloop";

const DOMController = (() => {
  const createBoardCells = (gameboardDOM) => {
    const BOARDAXESLENGTH = 10;
    const columnLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const rowLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const humanPlayerObject = GameLoop.getPlayers()[0];
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
        } else if (
          Array.from(gameboardDOM.classList).includes("player-board")
        ) {
          const playerCellElement = document.createElement("div");
          playerCellElement.setAttribute("data-row", i);
          playerCellElement.setAttribute("data-column", j);
          playerCellElement.classList.add("gameboard-cell");
          playerCellElement.addEventListener("dragover", (event) => {
            dragOver(event);
          });
          playerCellElement.addEventListener("drop", (event) => {
            insertDraggedImage(event);
            if (
              humanPlayerObject.getGameboard().getPlacedShips().length === 5
            ) {
              toggleAbilityToAttack("enable");
            }
          });
          gameboardDOM.appendChild(playerCellElement);
        } else if (
          Array.from(gameboardDOM.classList).includes("computer-board")
        ) {
          const computerCellElement = document.createElement("button");
          computerCellElement.setAttribute("data-row", i);
          computerCellElement.setAttribute("data-column", j);
          computerCellElement.classList.add("gameboard-cell");
          computerCellElement.disabled = true;
          computerCellElement.addEventListener("click", () => {
            if (!GameLoop.isMidAttack()) {
              const cellRow = Number(computerCellElement.dataset.row);
              const cellColumn = Number(computerCellElement.dataset.column);
              humanPlayerObject.sendAttack([cellRow, cellColumn]);
            }
          });
          gameboardDOM.appendChild(computerCellElement);
        }
      }
    }
  };
  const toggleAbilityToAttack = (action) => {
    const computerGameboardElement = document.querySelector(".computer-board");
    const cellElements = Array.from(
      computerGameboardElement.querySelectorAll(".gameboard-cell")
    );
    if (action === "enable") {
      cellElements.forEach((cellElement) => {
        cellElement.disabled = false;
      });
    } else if (action === "disable") {
      cellElements.forEach((cellElement) => {
        cellElement.disabled = true;
      });
    }
  };
  const getDraggedImage = (event) => {
    const dataObject = {
      image: event.target.src,
      shipLength: event.target.dataset.shipLength,
      horizontal: false,
      vertical: false,
      elementID: event.target.getAttribute("id"),
    };
    if (Array.from(event.target.classList).includes("horizontal")) {
      dataObject.horizontal = true;
    } else if (Array.from(event.target.classList).includes("vertical")) {
      dataObject.vertical = true;
    }
    const dataString = JSON.stringify(dataObject);
    event.dataTransfer.setData("image", dataString);
  };
  const dragOver = (event) => {
    event.preventDefault();
  };
  const initializeBoardDOM = () => {
    const humanPlayerGameboardDOM = document.querySelector(".player-board");
    const computerGameboardDOM = document.querySelector(".computer-board");
    createBoardCells(humanPlayerGameboardDOM);
    createBoardCells(computerGameboardDOM);
  };
  const isValidGameboardCell = (targetCell, dataObject) => {
    const cellCoordinates = [
      Number(targetCell.dataset.row),
      Number(targetCell.dataset.column),
    ];
    const length = Number(dataObject.shipLength);
    if (dataObject.horizontal) {
      if (
        GameLoop.getPlayers()[0].checkIfValidEmptyCoordinates(
          cellCoordinates,
          length,
          "right"
        )
      ) {
        return true;
      }
      return false;
    }
    if (dataObject.vertical) {
      if (
        GameLoop.getPlayers()[0].checkIfValidEmptyCoordinates(
          cellCoordinates,
          length,
          "down"
        )
      ) {
        return true;
      }
      return false;
    }
  };
  const addShipToDOM = (targetCell, dataObject) => {
    const length = dataObject.shipLength;
    const targetCellRow = Number(targetCell.dataset.row);
    const targetCellColumn = Number(targetCell.dataset.column);
    const coordinatesArray = [[targetCellRow, targetCellColumn]];
    targetCell.classList.add("contains-ship-image");
    targetCell.classList.add("ship-image");
    targetCell.classList.add(`ship-image-${length}`);
    targetCell.classList.add(`ship-image-${length}-1`);
    if (dataObject.horizontal) {
      targetCell.classList.add("horizontal");
    } else if (dataObject.vertical) {
      targetCell.classList.add("vertical");
    }
    for (let i = 1; i < length; i++) {
      let remainingCell;
      if (dataObject.horizontal) {
        remainingCell = document.querySelector(
          `.player-board [data-row='${targetCellRow}'][data-column='${
            targetCellColumn + i
          }']`
        );
        remainingCell.classList.add("horizontal");
        coordinatesArray.push([targetCellRow, targetCellColumn + i]);
      } else if (dataObject.vertical) {
        remainingCell = document.querySelector(
          `.player-board [data-row='${
            targetCellRow + i
          }'][data-column='${targetCellColumn}']`
        );
        remainingCell.classList.add("vertical");
        coordinatesArray.push([targetCellRow + i, targetCellColumn]);
      }
      remainingCell.classList.add("contains-ship-image");
      remainingCell.classList.add("ship-image");
      remainingCell.classList.add(`ship-image-${length}`);
      remainingCell.classList.add(`ship-image-${length}-${i + 1}`);
    }
    return coordinatesArray;
  };
  const disableImageButtonInteractions = (dataObject) => {
    const ID = dataObject.elementID;
    const imageElement = document.querySelector(`#${ID}`);
    const buttonElement = imageElement.parentNode.querySelector("button");
    imageElement.setAttribute("draggable", false);
    imageElement.classList.add("disabled-image");
    buttonElement.disabled = true;
  };
  const insertDraggedImage = (event) => {
    event.preventDefault();
    const humanPlayerObject = GameLoop.getPlayers()[0];
    const targetCell = event.target;
    if (Array.from(targetCell.classList).includes("contains-ship-image")) {
      return;
    }
    const dataString = event.dataTransfer.getData("image");
    const dataObject = JSON.parse(dataString);
    if (!isValidGameboardCell(targetCell, dataObject)) {
      // probably make some DOM error message appear
      return;
    }
    const shipCoordinates = addShipToDOM(targetCell, dataObject);
    humanPlayerObject.addShipToGameboard(
      Number(dataObject.shipLength),
      shipCoordinates
    );
    disableImageButtonInteractions(dataObject);
    targetCell.removeEventListener("drop", insertDraggedImage);
  };
  const rotateShipImage = (image) => {
    const imageClasses = Array.from(image.classList);
    if (imageClasses.includes("horizontal")) {
      image.classList.remove("horizontal");
      image.classList.add("vertical");
    } else if (imageClasses.includes("vertical")) {
      image.classList.remove("vertical");
      image.classList.add("horizontal");
    }
  };
  const rotatePerLength = (tempDiv, clonedImageElement) => {
    const clonedImageElementClasses = Array.from(clonedImageElement.classList);
    if (clonedImageElementClasses.includes("horizontal")) {
      tempDiv.classList.add("temp-rotate-horizontal");
    } else if (clonedImageElementClasses.includes("vertical")) {
      tempDiv.classList.add("temp-rotate-vertical");
      if (clonedImageElement.dataset.shipLength === "5") {
        tempDiv.classList.add("temp-rotate-vertical-5");
      } else if (clonedImageElement.dataset.shipLength === "4") {
        tempDiv.classList.add("temp-rotate-vertical-4");
      } else if (clonedImageElement.dataset.shipLength === "3") {
        tempDiv.classList.add("temp-rotate-vertical-3");
      } else if (clonedImageElement.dataset.shipLength === "2") {
        tempDiv.classList.add("temp-rotate-vertical-2");
      }
    }
  };
  const rotateDraggedImage = (event) => {
    const imageElement = event.target;
    const clonedImageElement = imageElement.cloneNode();
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("temp-rotate");
    rotatePerLength(tempDiv, clonedImageElement);
    tempDiv.appendChild(clonedImageElement);
    document.body.appendChild(tempDiv);
    event.dataTransfer.setDragImage(tempDiv, 0, 0);
    setTimeout(() => {
      document.body.removeChild(tempDiv);
    }, 0);
  };
  const addAttackResultDOM = (playerType, attackResults, coordinates) => {
    const cellRow = coordinates[0];
    const cellColumn = coordinates[1];
    const gameboardDOM = document.querySelector(`.${playerType}-board`);
    const targetCell = gameboardDOM.querySelector(
      `[data-row='${cellRow}'][data-column='${cellColumn}']`
    );
    const attackResultsElement = document.createElement("img");
    attackResultsElement.classList.add("attack-results");
    targetCell.appendChild(attackResultsElement);
    if (attackResults === "hit") {
      attackResultsElement.setAttribute("src", "../dist/red_X.png");
    } else {
      attackResultsElement.setAttribute("src", "../dist/white_O.png");
    }
    targetCell.disabled = true;
  };
  return {
    initializeBoardDOM,
    insertDraggedImage,
    rotateShipImage,
    rotateDraggedImage,
    getDraggedImage,
    dragOver,
    addAttackResultDOM,
    toggleAbilityToAttack,
  };
})();

export { DOMController };
