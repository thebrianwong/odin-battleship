import { GameLoop } from "./gameloop";
import { DOMController } from "./DOM_controller";
import { EventListenerController } from "./event_listener_controller";

GameLoop.createGame();

DOMController.initializeBoardDOM();

EventListenerController.rotateShipImageListeners();

EventListenerController.addShipPlacementDrag();
