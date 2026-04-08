import React, { useState, useEffect } from 'react';
import { MONTHS, MONTH_IMAGES } from '../utils/calendarUtils';
import './CalendarHero.css';

export default function CalendarHero({
  month, year, isFlipping, animDir,
  onPrev, onNext, onToday, theme
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [prevMonth, setPrevMonth] = useState(month);
  const [displayMonth, setDisplayMonth] = useState(month);

  useEffect(() => {
    if (month !== displayMonth) {
      setPrevMonth(displayMonth);
      setDisplayMonth(month);
      setImgLoaded(false);
    }
  }, [month]); // eslint-disable-line

  const seasonEmoji = getSeasonDecor(month);

  return (
    <div className="hero-panel">
      {/* Decorative corner tag */}
      <div className="corner-tag">
        <span className="corner-tag-text">{year}</span>
      </div>

      {/* Image with flip animation */}
      <div className={`hero-image-wrap ${isFlipping ? `flipping-${animDir}` : ''}`}>
        <img
          key={`${month}-${year}`}
          src={MONTH_IMAGES[month]}
          alt={MONTHS[month]}
          className={`hero-img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={e => { e.target.style.display = 'none'; }}
        />
        {!imgLoaded && <div className="hero-placeholder" />}

        {/* Color overlay for theming */}
        <div
          className="hero-overlay"
          style={{ background: `linear-gradient(to bottom, transparent 40%, ${theme.accent}55 100%)` }}
        />
      </div>

      {/* Month label */}
      <div className="hero-info">
        <div className="hero-season">{seasonEmoji}</div>
        <h2 className="hero-month">{MONTHS[month]}</h2>
        <p className="hero-year">{year}</p>
        <div className="hero-divider" style={{ background: theme.accent }} />
      </div>

      {/* Navigation */}
      <div className="hero-nav">
        <button
          className="hero-nav-btn"
          onClick={onPrev}
          aria-label="Previous month"
          title="Previous month"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="hero-today-btn"
          onClick={onToday}
          title="Go to today"
        >
          Today
        </button>

        <button
          className="hero-nav-btn"
          onClick={onNext}
          aria-label="Next month"
          title="Next month"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Torn-paper edge */}
      <div className="torn-edge">
        <svg viewBox="0 0 340 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,8 Q20,0 40,10 Q60,20 80,8 Q100,0 120,12 Q140,20 160,6 Q180,0 200,14 Q220,20 240,8 Q260,0 280,10 Q300,20 320,8 Q330,4 340,10 L340,20 L0,20 Z"
            fill="var(--cream)"
          />
        </svg>
      </div>
    </div>
  );
}

function getSeasonDecor(month) {
  if (month === 11 || month <= 1) return '❄️';
  if (month >= 2 && month <= 4)  return '🌸';
  if (month >= 5 && month <= 7)  return '☀️';
  return '🍂';
}