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
  return {
    getDraggedImage,
    dragOver,
    insertDraggedImage,
  };
})();

export { EventListenerController };
