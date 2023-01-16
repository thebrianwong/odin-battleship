const EventListenerController = (() => {
  const getDraggedImage = (event) => {
    event.dataTransfer.setData("image", event.target.src);
  };
  const dragOver = () => {
    event.preventDefault();
  };
  const insertDraggedImage = (event) => {
    event.preventDefault();
    const image = event.dataTransfer.getData("image");
    if (image === "") {
      return;
    }
    event.target.classList.add("ship-image-5");
    event.target.classList.add("ship-image-5-3");
    event.target.removeEventListener("drop", insertDraggedImage);
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
