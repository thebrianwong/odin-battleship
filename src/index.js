import { DOMController } from "./DOM_controller";
import { EventListenerController } from "./event_listener_controller";

DOMController.initializeBoardDOM();

DOMController.rotateShipImageListeners();

const testImage = document.querySelector("img");
testImage.addEventListener(
  "dragstart",
  EventListenerController.getDraggedImage.bind(event)
);
