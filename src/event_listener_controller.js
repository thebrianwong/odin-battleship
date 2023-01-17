const EventListenerController = (() => {
  const getDraggedImage = (event) => {
    const dataObject = {
      image: event.target.src,
      shipLength: event.target.dataset.shipLength,
      horizontal: false,
      vertical: false,
    };
    if (Array.from(event.target.classList).includes("horizontal")) {
      dataObject.horizontal = true;
    } else if (Array.from(event.target.classList).includes("vertical")) {
      dataObject.vertical = true;
    }
    console.log(dataObject);
    const dataString = JSON.stringify(dataObject);
    event.dataTransfer.setData("image", dataString);
  };
  const dragOver = () => {
    event.preventDefault();
  };
  const isValidGameboardCell = (targetCell, dataObject) => {
    if (dataObject.horizontal) {
      if (
        Number(targetCell.dataset.column) + Number(dataObject.shipLength) >
        10
      ) {
        return false;
      }
    } else if (dataObject.vertical) {
      if (Number(targetCell.dataset.row) + Number(dataObject.shipLength) > 10) {
        return false;
      }
    }
    return true;
  };
  const insertDraggedImage = (event) => {
    event.preventDefault();
    const targetCell = event.target;
    if (Array.from(targetCell.classList).includes("contains-ship-image")) {
      return;
    }
    const dataString = event.dataTransfer.getData("image");
    const dataObject = JSON.parse(dataString);
    // const draggedImage = dataObject.image;
    // const length = dataObject.shipLength;
    // if (draggedImage === "") {
    //   return;
    // }
    isValidGameboardCell(targetCell, dataObject);
    targetCell.classList.add("contains-ship-image");
    targetCell.classList.add("ship-image-5");
    targetCell.classList.add("ship-image-5-3");
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
  return {
    getDraggedImage,
    dragOver,
    insertDraggedImage,
    rotateShipImage,
    rotateDraggedImage,
  };
})();

export { EventListenerController };
