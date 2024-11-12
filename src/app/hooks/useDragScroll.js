import { useRef, useEffect } from "react";

export function useDragScroll() {
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e, container) => {
    isMouseDown.current = true;
    container.style.cursor = "grabbing";
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseUp = (container) => {
    isMouseDown.current = false;
    container.style.cursor = "grab";
  };

  const handleMouseMove = (e, container) => {
    if (!isMouseDown.current) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 2;
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseLeave = (container) => {
    isMouseDown.current = false;
    container.style.cursor = "grab";
  };

  const attachListeners = (container) => {
    const mouseDown = (e) => handleMouseDown(e, container);
    const mouseUp = () => handleMouseUp(container);
    const mouseMove = (e) => handleMouseMove(e, container);
    const mouseLeave = () => handleMouseLeave(container);

    container.addEventListener("mousedown", mouseDown);
    container.addEventListener("mousemove", mouseMove);
    container.addEventListener("mouseup", mouseUp);
    container.addEventListener("mouseleave", mouseLeave);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      container.removeEventListener("mousemove", mouseMove);
      container.removeEventListener("mouseup", mouseUp);
      container.removeEventListener("mouseleave", mouseLeave);
    };
  };

  return { attachListeners };
}
