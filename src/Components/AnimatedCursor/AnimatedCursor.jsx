import React, { useEffect, useRef } from 'react';

const AnimatedCursor = () => {
  const coreRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const updatePosition = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
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
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-14 h-14 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2
        bg-gradient-to-br from-blue-500 via-white to-blue-400
        opacity-20 blur-2xl animate-pulse transition-transform duration-300 ease-out"
      />

      {/* Core Cursor */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full pointer-events-none z-[9999] 
        bg-white border border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]
        -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
      />
    </>
  );
};

export default AnimatedCursor;
