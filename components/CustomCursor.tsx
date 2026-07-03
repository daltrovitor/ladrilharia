"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth animation loop using LERP
    let animationFrameId: number;
    const render = () => {
      // Ring trails with LERP (linear interpolation)
      ringX = ringX + (mouseX - ringX) * 0.15;
      ringY = ringY + (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Listeners for hover elements
    const handleMouseEnter = (e: MouseEvent) => {
      setIsHovered(true);
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute("data-cursor-text") || "";
      setCursorText(text);

      ring.classList.add("hovered");
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setCursorText("");
      ring.classList.remove("hovered");
    };

    // Magnetic effect for elements with class '.magnetic'
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const bound = target.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;

      // Pull elements slightly
      target.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = "translate3d(0, 0, 0)";
    };

    const setupListeners = () => {
      const hoverItems = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], [data-cursor-text]'
      );
      hoverItems.forEach((item) => {
        item.addEventListener("mouseenter", handleMouseEnter as EventListener);
        item.addEventListener("mouseleave", handleMouseLeave as EventListener);
      });

      const magneticItems = document.querySelectorAll(".magnetic");
      magneticItems.forEach((item) => {
        item.addEventListener("mousemove", handleMagneticMove as EventListener);
        item.addEventListener("mouseleave", handleMagneticLeave as EventListener);
      });
    };

    setupListeners();
    const interval = setInterval(setupListeners, 1500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);

      const hoverItems = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], [data-cursor-text]'
      );
      hoverItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        item.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      });

      const magneticItems = document.querySelectorAll(".magnetic");
      magneticItems.forEach((item) => {
        item.removeEventListener("mousemove", handleMagneticMove as EventListener);
        item.removeEventListener("mouseleave", handleMagneticLeave as EventListener);
      });
    };
  }, []);

  return (
    <div ref={ringRef} className="custom-cursor-ring hidden md:flex items-center justify-center">
      <span className="custom-cursor-text">{cursorText}</span>
    </div>
  );
}
