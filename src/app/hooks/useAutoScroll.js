import { useEffect, useRef } from "react";

export function useAutoScroll({ speed = 20, threshold = 50 }) {
  const containerRef = useRef(null);
  const scrollingRef = useRef({ left: false, right: false });
  const animationFrameRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleDragOver = (e) => {
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX;

      // Calculate distances from edges
      const distanceFromLeft = mouseX - containerRect.left;
      const distanceFromRight = containerRect.right - mouseX;

      // Update scrolling state
      scrollingRef.current = {
        left: distanceFromLeft < threshold && container.scrollLeft > 0,
        right:
          distanceFromRight < threshold &&
          container.scrollLeft < container.scrollWidth - container.clientWidth,
      };

      // Start scrolling if not already scrolling
      if (
        (scrollingRef.current.left || scrollingRef.current.right) &&
        !animationFrameRef.current
      ) {
        scroll();
      }
    };

    const handleDragEnd = () => {
      scrollingRef.current = { left: false, right: false };
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };

    const scroll = () => {
      if (!container) return;

      const { left, right } = scrollingRef.current;

      if (left && container.scrollLeft > 0) {
        container.scrollLeft -= speed;
      } else if (
        right &&
        container.scrollLeft < container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft += speed;
      }

      if (left || right) {
        animationFrameRef.current = requestAnimationFrame(scroll);
      } else {
        animationFrameRef.current = undefined;
      }
    };

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragleave", handleDragEnd);
    document.addEventListener("dragend", handleDragEnd);
    document.addEventListener("drop", handleDragEnd);

    return () => {
      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("dragleave", handleDragEnd);
      document.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("drop", handleDragEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, threshold]);

  return containerRef;
}
