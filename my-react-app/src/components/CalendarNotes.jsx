import React, { useRef, useEffect } from 'react';
import './CalendarNotes.css';

export default function CalendarNotes({
  activeNote, monthNote, setMonthNote,
  rangeNote, setRangeNote,
  hasRange, rangeLabel, theme
}) {
  const monthRef = useRef(null);
  const rangeRef = useRef(null);

  
  function autoResize(ref) {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }

  useEffect(() => { autoResize(monthRef); }, [monthNote]);
  useEffect(() => { autoResize(rangeRef);  }, [rangeNote]);

  const charCount = activeNote === 'month' ? monthNote.length : rangeNote.length;

  return (
    <div
      className="notes-panel"
      style={{ borderColor: 'var(--cream-dark)' }}
    >
      
      <div className="notes-lines" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="note-line" />
        ))}
      </div>

      
      <div className="margin-line" style={{ borderColor: theme.accent + '55' }} />

      
      <div className="notes-content">
        {activeNote === 'month' ? (
          <div key="month" className="note-area animate-fade-in">
            <label className="note-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Monthly Memo
            </label>
            <textarea
              ref={monthRef}
              className="note-textarea"
              placeholder="Jot down monthly goals, reminders, or anything on your mind…"
              value={monthNote}
              onChange={e => { setMonthNote(e.target.value); autoResize(monthRef); }}
              rows={4}
            />
          </div>
        ) : (
          <div key="range" className="note-area animate-fade-in">
            {hasRange ? (
              <>
                <label className="note-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {rangeLabel}
                </label>
                <textarea
                  ref={rangeRef}
                  className="note-textarea"
                  placeholder="What's happening on these dates? Add context, plans, reminders…"
                  value={rangeNote}
                  onChange={e => { setRangeNote(e.target.value); autoResize(rangeRef); }}
                  rows={4}
                />
              </>
            ) : (
              <div className="no-range-msg">
                <span className="no-range-icon">📅</span>
                <p>Select a date on the calendar first to attach a note to that range.</p>
              </div>
            )}
          </div>
        )}
      </div>

      
      <div className="notes-footer">
        <span className="char-count">{charCount} chars</span>
        {charCount > 0 && (
          <span className="saved-badge">
            <span className="saved-dot" />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}