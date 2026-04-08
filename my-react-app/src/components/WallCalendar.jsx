import React, { useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { MONTHS, MONTH_THEMES } from '../utils/calendarUtils';
import CalendarHero from './CalendarHero';
import CalendarGrid from './CalendarGrid';
import CalendarNotes from './CalendarNotes';
import CalendarBinding from './CalendarBinding';
import './WallCalendar.css';

export default function WallCalendar() {
  const cal = useCalendar();
  const theme = MONTH_THEMES[cal.currentMonth];
  const [activeNote, setActiveNote] = useState('month'); // 'month' | 'range'

  return (
    <div
      className="wall-calendar"
      style={{
        '--accent':       theme.accent,
        '--accent-light': theme.accentLight,
      }}
    >
      {/* Top binding bar */}
      <CalendarBinding />

      <div className="calendar-body">
        {/* LEFT PANEL — Hero image */}
        <div className="panel-left">
          <CalendarHero
            month={cal.currentMonth}
            year={cal.currentYear}
            isFlipping={cal.isFlipping}
            animDir={cal.animDir}
            onPrev={() => cal.navigate('prev')}
            onNext={() => cal.navigate('next')}
            onToday={cal.goToToday}
            theme={theme}
          />
        </div>

        {/* RIGHT PANEL — Grid + Notes */}
        <div className="panel-right">
          {/* Month title on mobile */}
          <div className="mobile-month-header">
            <button className="nav-btn" onClick={() => cal.navigate('prev')} aria-label="Previous month">‹</button>
            <span className="mobile-month-title">
              {MONTHS[cal.currentMonth]} {cal.currentYear}
            </span>
            <button className="nav-btn" onClick={() => cal.navigate('next')} aria-label="Next month">›</button>
          </div>

          <CalendarGrid cal={cal} theme={theme} />

          {/* Selection summary */}
          {cal.rangeStart && (
            <div className="selection-summary animate-fade-up">
              <span className="sel-label">
                {cal.rangeEnd
                  ? `${formatDate(cal.rangeStart)} → ${formatDate(cal.rangeEnd)}`
                  : `From ${formatDate(cal.rangeStart)} — pick end date`}
              </span>
              <button className="clear-btn" onClick={cal.clearSelection} title="Clear selection">✕</button>
            </div>
          )}

          {/* Notes tabs */}
          <div className="notes-wrapper">
            <div className="notes-tabs">
              <button
                className={`note-tab ${activeNote === 'month' ? 'active' : ''}`}
                onClick={() => setActiveNote('month')}
              >
                Monthly Memo
              </button>
              <button
                className={`note-tab ${activeNote === 'range' ? 'active' : ''}`}
                onClick={() => setActiveNote('range')}
                disabled={!cal.rangeStart}
                title={!cal.rangeStart ? 'Select a date range first' : ''}
              >
                Range Note
                {cal.rangeNote && <span className="dot" />}
              </button>
            </div>

            <CalendarNotes
              activeNote={activeNote}
              monthNote={cal.monthNote}
              setMonthNote={cal.setMonthNote}
              rangeNote={cal.rangeNote}
              setRangeNote={cal.setRangeNote}
              hasRange={!!cal.rangeStart}
              rangeLabel={
                cal.rangeStart
                  ? cal.rangeEnd
                    ? `${formatDate(cal.rangeStart)} → ${formatDate(cal.rangeEnd)}`
                    : formatDate(cal.rangeStart)
                  : ''
              }
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="calendar-footer">
        <span className="footer-theme">{theme.label}</span>
        <span className="footer-year">{cal.currentYear}</span>
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}