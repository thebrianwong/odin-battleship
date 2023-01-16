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
    if (imageClasses.includes("face-left")) {
      image.classList.remove("face-left");
      image.classList.add("face-up");
    } else if (imageClasses.includes("face-up")) {
      image.classList.remove("face-up");
      image.classList.add("face-right");
    } else if (imageClasses.includes("face-right")) {
      image.classList.remove("face-right");
      image.classList.add("face-down");
    } else if (imageClasses.includes("face-down")) {
      image.classList.remove("face-down");
      image.classList.add("face-left");
    }
  };
  return {
    getDraggedImage,
    dragOver,
    insertDraggedImage,
    rotateShipImage,
  };
})();

export { EventListenerController };
