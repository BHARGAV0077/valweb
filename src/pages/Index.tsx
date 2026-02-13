import { useState, useEffect, useRef, useCallback } from "react";
import FloatingHearts from "@/components/Valentine/FloatingHearts";
import LoveLetterModal from "@/components/Valentine/LoveLetterModal";
import CelebrationMode from "@/components/Valentine/CelebrationMode";
import CountdownTimer from "@/components/Valentine/CountdownTimer";

/* ═══════════════════════════════════════════
   ✏️  PERSONALIZE HERE — Change these values!
   ═══════════════════════════════════════════ */
const HER_NAME = "My Love";    // ← Put her name here
const YOUR_NAME = "Yours";     // ← Put your name here
/* ═══════════════════════════════════════════ */

const NO_TEXTS = [
  "No 🌸",
  "Wait… that was an accident right? 🥺",
  "I'll give you chocolate 🍫",
  "Fine… but the Yes button looks prettier 👀",
  "Are you really stronger than this romance? 💘",
  "Last chance before I dramatically fall in love anyway…",
  "ok fine whatever 😔",
];

const Index = () => {
  const [headlinePhase, setHeadlinePhase] = useState(0);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [celebrating, setCelebrating] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [rejection404, setRejection404] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicGlow, setMusicGlow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [heartIntensity, setHeartIntensity] = useState(1);

  // Smooth phase-based transitions — content fades rather than pops
  const [mainVisible, setMainVisible] = useState(true);
  const [rejectionVisible, setRejectionVisible] = useState(false);
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  // Headline sequence
  useEffect(() => {
    const t1 = setTimeout(() => setHeadlinePhase(1), 1200);
    const t2 = setTimeout(() => setHeadlinePhase(2), 3200);
    const t3 = setTimeout(() => setHeadlinePhase(3), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Music
  //useEffect(() => {
  // audioRef.current = new Audio(
  //   "https://cdn.pixabay.com/audio/2024/11/28/audio_3e363e6498.mp3"
  // );
  // audioRef.current.loop = true;
  // audioRef.current.volume = 0.3;
  // audioRef.current.play().then(() => {
  //   setMusicPlaying(true);
  //   setMusicGlow(true);
  // }).catch(() => { });
  //return () => { audioRef.current?.pause(); audioRef.current = null; };
  //}, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
        setMusicGlow(false);
      } else {
        audioRef.current.volume = 0.4; // make sure volume is set
        await audioRef.current.play(); // wait for play to succeed
        setMusicPlaying(true);
        setMusicGlow(true);
      }
    } catch (error) {
      console.error("Audio play failed:", error);
    }
  };


  const handleNoHover = useCallback(() => {
    if (celebrating) return;
    const newCount = Math.min(noHoverCount + 1, NO_TEXTS.length - 1);
    setNoHoverCount(newCount);
    setHeartIntensity(1 + newCount * 0.3);
    setNoPosition({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
  }, [noHoverCount, celebrating]);

  const startCelebration = useCallback(() => {
    setMainVisible(false);
    setRejectionVisible(false);
    setTimeout(() => {
      setCelebrating(true);
      setCelebrationVisible(true);
      setHeartIntensity(3);
    }, 600);
  }, []);

  const handleYes = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
      setMusicPlaying(true);
      setMusicGlow(true);
    }
    startCelebration();
  };

  const handleNo = () => {
    setShaking(true);
    setMainVisible(false);
    setTimeout(() => setShaking(false), 500);
    setTimeout(() => {
      setRejection404(true);
      setRejectionVisible(true);
    }, 600);
    setTimeout(() => {
      setRejectionVisible(false);
      setTimeout(() => {
        setRejection404(false);
        startCelebration();
      }, 600);
    }, 2800);
  };

  const handleScreenClick = () => {
    if (secretRevealed) return;
    const c = clickCount + 1;
    setClickCount(c);
    if (c >= 5) setSecretRevealed(true);
  };

  const yesScale = 1 + noHoverCount * 0.12;
  const noScale = Math.max(0.5, 1 - noHoverCount * 0.1);
  const isNoTiny = noHoverCount >= NO_TEXTS.length - 1;

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${shaking ? "animate-screen-shake" : ""}`}
      onClick={handleScreenClick}
    >
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />

      {/* Spline 3D Background */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <iframe
          src="https://my.spline.design/beepboopbemyvalentine-4IxOwg0wpBbKVlCGkPyjcmwv/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Valentine 3D Scene"
        />
      </div>

      {/* Warm overlay */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{
          zIndex: 1,
          background: celebrating
            ? "linear-gradient(180deg, hsl(40 80% 60% / 0.18) 0%, hsl(345 70% 85% / 0.15) 100%)"
            : "linear-gradient(180deg, hsl(350 80% 92% / 0.35) 0%, hsl(20 80% 85% / 0.25) 50%, hsl(350 70% 85% / 0.3) 100%)",
          backdropFilter: "blur(1.5px)",
        }}
      />

      {/* Bottom romantic blend layer */}
      <div
        className="fixed bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "140px",
          zIndex: 2,
          background: celebrating
            ? "linear-gradient(to top, hsl(40 80% 90%), transparent)"
            : "linear-gradient(to top, hsl(350 80% 94%), transparent)",
        }}
      />

      <FloatingHearts intensity={heartIntensity} />

      {/* Music */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
        className={`fixed top-4 right-4 glass-card rounded-full px-4 py-2 font-script text-sm text-rose-deep 
          hover:scale-105 transition-all duration-300 cursor-pointer ${musicPlaying ? "opacity-50" : "opacity-90"}`}
        style={{ zIndex: 30 }}
      >
        {musicPlaying ? "🎵 Playing..." : "Turn On Music 🎵"}
      </button>

      {/* ── Main Content ── */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 transition-all duration-700"
        style={{
          zIndex: 10,
          opacity: mainVisible && !celebrating && !rejection404 ? 1 : 0,
          transform: mainVisible && !celebrating && !rejection404 ? "scale(1)" : "scale(0.97)",
          pointerEvents: mainVisible && !celebrating && !rejection404 ? "auto" : "none",
          filter: musicGlow ? "brightness(1.03)" : "none",
        }}
      >
        <div className="text-center mb-10 max-w-xl">
          <h2
            className="font-script text-3xl md:text-5xl text-rose-deep mb-4 transition-all duration-1000"
            style={{
              opacity: headlinePhase >= 1 ? 1 : 0,
              transform: headlinePhase >= 1 ? "translateY(0)" : "translateY(16px)",
            }}
          >
            Hey {HER_NAME}…
          </h2>
          <p
            className="font-serif text-xl md:text-2xl text-foreground mb-4 transition-all duration-1000"
            style={{
              opacity: headlinePhase >= 2 ? 1 : 0,
              transform: headlinePhase >= 2 ? "translateY(0)" : "translateY(16px)",
            }}
          >
            I made something just for you ❤️
          </p>
          <h1
            className="font-display text-5xl md:text-7xl text-rose-deep text-shadow-glow transition-all duration-1200"
            style={{
              opacity: headlinePhase >= 3 ? 1 : 0,
              transform: headlinePhase >= 3 ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
              transitionDuration: "1.2s",
            }}
          >
            Will you be my Valentine?
          </h1>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-6 mt-4 transition-all duration-800"
          style={{
            opacity: headlinePhase >= 3 ? 1 : 0,
            transform: headlinePhase >= 3 ? "translateY(0)" : "translateY(20px)",
            transitionDuration: "0.8s",
            transitionDelay: "0.4s",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); handleYes(); }}
            className={`font-script text-xl md:text-2xl px-10 py-4 rounded-full text-primary-foreground transition-all duration-500 cursor-pointer ${isNoTiny ? "animate-spotlight" : "animate-gentle-pulse"
              }`}
            style={{
              background: "linear-gradient(135deg, hsl(345 70% 65%), hsl(345 70% 55%))",
              transform: `scale(${yesScale})`,
              boxShadow: "0 8px 30px hsl(345 70% 55% / 0.35)",
            }}
          >
            Yes 💕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNo(); }}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            className="font-script text-lg px-8 py-3 rounded-full border border-border text-muted-foreground transition-all duration-500 cursor-pointer hover:border-rose"
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
              background: "hsl(30 50% 97% / 0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            {NO_TEXTS[noHoverCount]}
          </button>
        </div>

        {/* Love Letter + Countdown */}
        <div
          className="flex flex-col items-center transition-all duration-700"
          style={{
            opacity: headlinePhase >= 3 ? 1 : 0,
            transform: headlinePhase >= 3 ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.8s",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLetterOpen(true); }}
            className="mt-10 font-script text-lg text-rose-deep underline decoration-rose/30 underline-offset-4 hover:decoration-rose transition-all duration-300 cursor-pointer"
          >
            Read My Heart 💌
          </button>
          <div className="mt-6">
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* ── Rejection 404 ── */}
      {rejection404 && (
        <div
          className="fixed inset-0 flex items-center justify-center transition-all duration-600"
          style={{
            zIndex: 15,
            opacity: rejectionVisible ? 1 : 0,
            transform: rejectionVisible ? "scale(1)" : "scale(0.95)",
            transitionDuration: "0.6s",
          }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-rose-deep animate-heartbeat text-center px-6">
            Error 404: Rejection Not Found 💖
          </h2>
        </div>
      )}

      {/* ── Celebration ── */}
      {celebrating && (
        <div
          className="transition-all duration-800"
          style={{
            opacity: celebrationVisible ? 1 : 0,
            transform: celebrationVisible ? "scale(1)" : "scale(0.96)",
            transitionDuration: "0.8s",
          }}
        >
          <CelebrationMode herName={HER_NAME} />
        </div>
      )}

      <LoveLetterModal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
        herName={HER_NAME}
        yourName={YOUR_NAME}
      />

      {/* Secret */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-lg px-6 py-4 max-w-sm text-center transition-all duration-700"
        style={{
          zIndex: 60,
          opacity: secretRevealed ? 1 : 0,
          transform: secretRevealed ? "translateY(0)" : "translateY(20px)",
          pointerEvents: secretRevealed ? "auto" : "none",
        }}
      >
        <p className="font-serif text-sm text-foreground italic">
          You found the secret… which means you pay attention to little things. I love that about you ❤️
        </p>
      </div>
    </div>
  );
};

export default Index;
