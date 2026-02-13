import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // optional if you want to use inside modal

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  herName: string;
  yourName: string;
  navigate: (path: string) => void; // ← Pass navigate function from parent
}

const getLetter = (herName: string, yourName: string): string[] => [
  `My dearest ${herName},`,
  "",
  "There are a thousand things I could say, but somehow none of them feel enough when it comes to you.",
  "",
  "I love the way your eyes light up when you talk about the things you're passionate about. I love how you don't even realize how adorable you are when you laugh at your own jokes. It's those little things — the ones you think nobody notices — that make you unforgettable to me.",
  "",
  "I know sometimes you doubt yourself. But if you could see yourself the way I see you… you would never question your worth again. You are more than enough. You are rare. You are someone who makes ordinary moments feel special just by being there.",
  "",
  "I still think about all those little moments we've shared together. They live in my head rent-free, because they reminded me how lucky I am to know you.",
  "",
  "You're not just someone I like.",
  "You're someone I respect.",
  "Someone I admire.",
  "Someone I feel calm around.",
  "",
  "And if you ever let me, I'd love to create a thousand more memories with you.",
  "",
  `Forever yours,`,
  `${yourName} ❤️`,
];

const LoveLetterModal = ({ isOpen, onClose, herName, yourName, navigate }: LoveLetterModalProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [modalOpacity, setModalOpacity] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lines = getLetter(herName, yourName);

  useEffect(() => {
    if (isOpen) {
      setVisibleLines(0);
      requestAnimationFrame(() => setModalOpacity(1));
      const timeout = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setVisibleLines((prev) => {
            if (prev >= lines.length) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              return prev;
            }
            return prev + 1;
          });
        }, 350);
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      setModalOpacity(0);
      setVisibleLines(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, lines.length]);

  // Auto-scroll as new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleLines]);

  const handleClose = () => {
    setModalOpacity(0);
    setTimeout(onClose, 400);
  };

  if (!isOpen && modalOpacity === 0) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 transition-all duration-500"
      style={{
        zIndex: 50,
        backdropFilter: modalOpacity > 0 ? "blur(10px)" : "blur(0px)",
        background: `hsl(345 50% 20% / ${modalOpacity * 0.35})`,
        opacity: modalOpacity,
      }}
      onClick={handleClose}
    >
      <div
        className="paper-texture max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-2xl p-8 md:p-10 relative transition-all duration-500"
        ref={scrollRef}
        style={{
          boxShadow: "0 20px 60px hsl(345 50% 20% / 0.2), 0 0 0 1px hsl(350 40% 88% / 0.5)",
          transform: modalOpacity > 0 ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corners */}
        <div className="absolute top-3 left-4 text-rose opacity-25 text-xl select-none">❦</div>
        <div className="absolute top-3 right-4 text-rose opacity-25 text-xl select-none">❦</div>
        <div className="absolute bottom-3 left-4 text-rose opacity-25 text-xl select-none">❦</div>
        <div className="absolute bottom-3 right-4 text-rose opacity-25 text-xl select-none">❦</div>

        <div className="space-y-1">
          {lines.slice(0, visibleLines).map((line, i) => {
            const isGreeting = i === 0;
            const isEmpty = line === "";
            const isEmphasis = line.startsWith("You're not") || line.startsWith("Someone");
            const isSignoff = line.startsWith("Forever");
            const isName = line.startsWith(yourName);

            return (
              <p
                key={i}
                className={`transition-all duration-500 ${isGreeting
                  ? "font-script text-2xl text-rose-deep mb-3"
                  : isEmpty
                    ? "h-3"
                    : isEmphasis
                      ? "font-serif italic text-rose-deep leading-relaxed text-sm md:text-base"
                      : isSignoff
                        ? "font-script text-xl text-rose-deep mt-6 pt-2"
                        : isName
                          ? "font-script text-xl text-rose-deep"
                          : "font-serif text-foreground leading-relaxed text-sm md:text-base"
                  }`}
                style={{
                  opacity: 1,
                  animation: `typewriter-line 0.6s ease-out`,
                }}
              >
                {/* Underline her name in the greeting */}
                {isGreeting ? (
                  <>
                    My dearest{" "}
                    <span className="relative inline-block">
                      {herName}
                      <span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-rose rounded-full"
                        style={{ animation: "typewriter-line 1s ease-out 0.3s forwards", opacity: 0.6 }}
                      />
                    </span>
                    ,
                  </>
                ) : (
                  line || "\u00A0"
                )}
              </p>
            );
          })}
        </div>

        {visibleLines >= lines.length && (
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="block font-script text-muted-foreground hover:text-rose-deep transition-colors duration-300 text-lg"
              style={{ animation: "typewriter-line 0.6s ease-out" }}
            >
              Close with love ✕
            </button>

            {/* New button to open friend's page */}
            <button
              onClick={() =>
                window.open("https://roaring-parfait-b005c9.netlify.app", "_blank")
              }
              className="block font-script text-white bg-gradient-to-r from-cyan-400 to-pink-500 px-6 py-3 rounded-full shadow-[0_0_20px_cyan,0_0_40px_pink] hover:scale-105 transition-all duration-300 text-lg"
            >
              Open My Surprise 💖
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetterModal;
