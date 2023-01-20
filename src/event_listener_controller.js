import { DOMController } from "./DOM_controller";

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
  return {
    rotateShipImageListeners,
    addShipPlacementDrag,
  };
})();

export { EventListenerController };
