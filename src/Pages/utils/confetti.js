// src/utils/confetti.js
import confetti from "canvas-confetti";

export const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6a00', '#ff0000', '#ffcc00'], // fiery colors
  });
};
