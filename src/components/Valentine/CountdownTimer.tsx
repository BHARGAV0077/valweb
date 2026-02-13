import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-02-14T00:00:00");

    const update = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="text-center mt-8">
      <p className="font-script text-xl text-rose-deep mb-4">
        Counting down to our little love story 💕
      </p>
      <div className="flex justify-center gap-3 md:gap-5">
        {units.map((u) => (
          <div key={u.label} className="glass-card rounded-lg px-3 py-2 md:px-5 md:py-3 min-w-[60px]">
            <div className="font-serif text-2xl md:text-3xl font-bold text-rose-deep">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="font-serif text-xs text-muted-foreground uppercase tracking-wider">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
