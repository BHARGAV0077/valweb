import { useEffect, useMemo, useState } from "react";

interface CelebrationModeProps {
  herName: string;
}

const CelebrationMode = ({ herName }: CelebrationModeProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 3000);
    const t2 = setTimeout(() => setPhase(2), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const petals = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 7,
      delay: Math.random() * 6,
      size: 14 + Math.random() * 16,
      emoji: ["🌹", "🌸", "🪻", "💐", "🩷"][Math.floor(Math.random() * 5)],
    })), []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 40,
        background: "linear-gradient(180deg, hsl(40 80% 60% / 0.12) 0%, hsl(345 70% 65% / 0.08) 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute animate-petal-fall pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            fontSize: `${p.size}px`,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}

      <div className="text-center px-6 max-w-xl">
        <h2
          className="font-display text-4xl md:text-6xl text-rose-deep transition-all duration-1000"
          style={{
            opacity: 1,
            animation: "typewriter-line 1.4s ease-out forwards, heartbeat 1.5s ease-in-out infinite 1.4s",
          }}
        >
          You just made my heart the happiest it has ever been 💖
        </h2>

        <p
          className="font-script text-2xl md:text-3xl text-foreground mt-8 transition-all duration-1000"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          I promise to make you smile every day, {herName} 🌸
        </p>

        <p
          className="font-serif text-lg md:text-xl text-muted-foreground mt-6 italic transition-all duration-1000"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          This is the beginning of our beautiful story.
        </p>
      </div>
    </div>
  );
};

export default CelebrationMode;
