import { useEffect, useState, useMemo } from "react";

const HEART_CHARS = ["♥", "❤", "💕", "💗", "🤍", "🌸"];

interface Heart {
  id: number;
  char: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const FloatingHearts = ({ intensity = 1 }: { intensity?: number }) => {
  const hearts = useMemo(() => {
    const count = Math.floor(12 * intensity);
    return Array.from({ length: count }, (_, i): Heart => ({
      id: i,
      char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
      left: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 12 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-up"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            "--duration": `${h.duration}s`,
            "--delay": `${h.delay}s`,
            animationDelay: `${h.delay}s`,
          } as React.CSSProperties}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
