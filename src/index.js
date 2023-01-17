import { GameLoop } from "./gameloop";
import { DOMController } from "./DOM_controller";

GameLoop.createGame();

DOMController.initializeBoardDOM();

DOMController.rotateShipImageListeners();

DOMController.addShipPlacementDrag();
