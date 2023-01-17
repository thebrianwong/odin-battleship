import { DOMController } from "./DOM_controller";

const EventListenerController = (() => {
  const rotateShipImageListeners = () => {
    const shipPlacementElements = document.querySelectorAll(".ship-placement");
    shipPlacementElements.forEach((group) => {
      const img = group.children[0];
      const btn = group.children[2];
      btn.addEventListener("click", () => {
        DOMController.rotateShipImage(img);
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
