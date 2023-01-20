import { DOMController } from "./DOM_controller";

const EventListenerController = (() => {
  const rotateShipImageListeners = () => {
    const shipPlacementElements = document.querySelectorAll(".ship-placement");
    shipPlacementElements.forEach((groupOfElements) => {
      const image = groupOfElements.querySelector("img");
      const button = groupOfElements.querySelector("button");
      button.addEventListener("click", () => {
        DOMController.rotateShipImage(image);
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
