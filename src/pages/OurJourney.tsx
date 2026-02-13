// FriendPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "./ourjourney.css";


const FriendPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [showYesPage, setShowYesPage] = useState(false);
  const [timer, setTimer] = useState("");
  const [currentView, setCurrentView] = useState(null); // 'musicS', 'galleryS', 'secretSection'
  const bgMusic = useRef(null);
  const message = "Nandhini, from the day Yaanji became our melody, my life found its rhythm. Since June 15, 2022, every beat of my heart has been yours. Will you marry me?";
  const startDate = new Date("2022-06-15T19:15:00");

  // Typewriter effect
  useEffect(() => {
    if (!showIntro && typedText.length < message.length) {
      const timeout = setTimeout(() => {
        setTypedText(message.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText, showIntro]);

  // Timer for yesPage
  useEffect(() => {
    let interval;
    if (showYesPage) {
      interval = setInterval(() => {
        const diff = new Date() - startDate;
        const y = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const d = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimer(`${y}y ${d}d ${h}h ${m}m ${s}s`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showYesPage]);

  const enterApp = () => {
    setShowIntro(false);
    bgMusic.current.volume = 0.2;
    bgMusic.current.play();
  };

  const celebrate = () => {
    setShowYesPage(true);
  };

  const showSection = (section) => setCurrentView(section);
  const closeSection = () => setCurrentView(null);

  return (
    <div className="friend-page">
      <audio ref={bgMusic} loop src="our-song.mp3/Yaanji-MassTamilan.com.mp3" />

      {/* INTRO */}
      {showIntro && (
        <div className="intro-overlay" onClick={enterApp}>
          <div className="diamond-ring">💍</div>
          <div className="intro-text">Nandhini...</div>
          <p className="intro-subtext">Tap to Open Our Heart</p>
        </div>
      )}

      {/* MAIN PAGE */}
      {!showIntro && !showYesPage && (
        <div className="main-container">
          <div className="luxury-card">
            <h1>Nandhini & Dayanithi</h1>
            <div className="love-letter">{typedText}</div>
            <button className="btn-yes" onClick={celebrate}>
              YES, FOREVER! 💍
            </button>
            <button
              className="btn-no"
              onMouseOver={(e) => {
                e.target.innerText = "YES! ❤️";
                e.target.style.background = "#00f0ff";
                e.target.style.color = "#000";
                e.target.style.width = "100%";
              }}
              onClick={celebrate}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* YES PAGE */}
      {showYesPage && (
        <div className="yes-page">
          <div className="timer-display">{timer}</div>
          <h2>Choose Your Gift</h2>
          <div className="gift-wrapper">
            <div className="gift-box" onClick={() => showSection("musicS")}>
              🎵 <p>Playlist</p>
            </div>
            <div className="gift-box" onClick={() => showSection("galleryS")}>
              💝 <p>Memories</p>
            </div>
          </div>
          <p className="secret-trigger" onClick={() => showSection("secretSection")}>
            Unlock Secret Letter 🔒
          </p>
        </div>
      )}

      {/* Sections */}
      {currentView === "musicS" && (
        <div className="view-section">
          <h2>Our Melodies</h2>
          <div className="song-list">
            <div className="song-item">
              Yaanji - Vikram Vedha
              <audio controls src="our-song.mp3/Yaanji-MassTamilan.com.mp3"></audio>
            </div>
            {/* Add other songs similarly */}
          </div>
          <p className="back-btn" onClick={closeSection}>
            Go Back
          </p>
        </div>
      )}

      {currentView === "galleryS" && (
        <div className="view-section">
          <h2>Our 4 Years</h2>
          <div className="gallery-grid">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="polaroid">
                <img src={`assets/photo${i + 1}.jpg`} alt={`photo${i + 1}`} />
              </div>
            ))}
          </div>
          <p className="back-btn" onClick={closeSection}>
            Go Back
          </p>
        </div>
      )}

      {currentView === "secretSection" && (
        <div className="view-section">
          <h2>My Deepest Vow</h2>
          <div className="secret-letter">
            <p>
              "Nandhini, you are my home. I promise to hold your hand through every storm. I
              love you more than words can ever say. Forever Dayanithi."
            </p>
          </div>
          <p className="back-btn" onClick={closeSection}>
            Close Secret
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendPage;
