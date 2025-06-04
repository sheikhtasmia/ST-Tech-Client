import React, { useEffect, useRef } from 'react';

const AnimatedCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    updatePosition();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed max-sm:hidden top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]
      flex items-center justify-center bg-black/75 -translate-x-1/2 -translate-y-1/2 shadow-md"
    >
      <div className="w-1.5 h-1.5 bg-white rounded-full" />
    </div>
  );
};

export default AnimatedCursor;
