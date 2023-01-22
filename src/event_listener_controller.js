import { DOMController } from "./DOM_controller";
import { GameLoop } from "./gameloop";

const EventListenerController = (() => {
  const rotateShipImageListeners = () => {
    const shipPlacementElements = document.querySelectorAll(".ship-placement");
    shipPlacementElements.forEach((groupOfElements) => {
      const imageElement = groupOfElements.querySelector("img");
      const buttonElement = groupOfElements.querySelector("button");
      buttonElement.addEventListener("click", () => {
        DOMController.rotateShipImage(imageElement);
      });
    });
  };
  const addShipPlacementDrag = () => {
    const shipImages = Array.from(document.querySelectorAll(".ship-piece"));
    shipImages.forEach((ship) => {
      ship.addEventListener("dragstart", (event) => {
        DOMController.getDraggedImage(event);
        DOMController.rotateDraggedImage(event);
      });
    });
  };
  const addPlayAgainListener = () => {
    const playAgainButton = document.querySelector(".play-again");
    playAgainButton.addEventListener("click", () => {
      GameLoop.resetGame();
    });
  };
  return {
    rotateShipImageListeners,
    addShipPlacementDrag,
    addPlayAgainListener,
  };
})();

export { EventListenerController };
