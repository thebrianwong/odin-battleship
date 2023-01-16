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
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", image);
    event.target.appendChild(imageElement);
    event.target.removeEventListener("drop", insertDraggedImage);
  };
  return {
    getDraggedImage,
    dragOver,
    insertDraggedImage,
  };
})();

export { EventListenerController };
