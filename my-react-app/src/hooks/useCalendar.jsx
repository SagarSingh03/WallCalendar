import { useState, useCallback, useEffect } from 'react';
import { makeDate, isSameDay, toKey } from '../utils/calendarUtils';

const STORAGE_KEY = 'wall_calendar_notes';

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveNotes(notes) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
}

export function useCalendar() {
  const today = new Date();

  const [currentYear,  setCurrentYear]  = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [rangeStart,   setRangeStart]   = useState(null);
  const [rangeEnd,     setRangeEnd]     = useState(null);
  const [hoverDate,    setHoverDate]    = useState(null);
  const [selecting,    setSelecting]    = useState(false); // true = awaiting end date
  const [notes,        setNotes]        = useState(loadNotes);
  const [animDir,      setAnimDir]      = useState('next'); // 'next' | 'prev'
  const [isFlipping,   setIsFlipping]   = useState(false);

  // Persist notes
  useEffect(() => { saveNotes(notes); }, [notes]);

  // Navigate months with flip animation
  const navigate = useCallback((dir) => {
    if (isFlipping) return;
    setAnimDir(dir);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => {
        if (dir === 'next') {
          if (prev === 11) { setCurrentYear(y => y + 1); return 0; }
          return prev + 1;
        } else {
          if (prev === 0)  { setCurrentYear(y => y - 1); return 11; }
          return prev - 1;
        }
      });
      setIsFlipping(false);
    }, 320);
  }, [isFlipping]);

  const goToToday = useCallback(() => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, [today]);

  // Date selection logic: click once = start, click again = end
  const handleDayClick = useCallback((day) => {
    const clicked = makeDate(currentYear, currentMonth, day);
    if (!selecting || !rangeStart) {
      // Start new selection
      setRangeStart(clicked);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      // Finish selection
      if (isSameDay(clicked, rangeStart)) {
        // Deselect
        setRangeStart(null);
        setRangeEnd(null);
        setSelecting(false);
      } else {
        setRangeEnd(clicked);
        setSelecting(false);
      }
    }
  }, [selecting, rangeStart, currentYear, currentMonth]);

  const clearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
    setHoverDate(null);
  }, []);

  // Notes keyed by "YYYY-MM-DD|YYYY-MM-DD" for range notes,
  // or "month-YYYY-MM" for monthly notes
  const monthKey = `month-${currentYear}-${String(currentMonth+1).padStart(2,'0')}`;

  const rangeKey = rangeStart && rangeEnd
    ? `${toKey(rangeStart < rangeEnd ? rangeStart : rangeEnd)}|${toKey(rangeStart < rangeEnd ? rangeEnd : rangeStart)}`
    : rangeStart
      ? toKey(rangeStart)
      : null;

  const setMonthNote = useCallback((text) => {
    setNotes(n => ({ ...n, [monthKey]: text }));
  }, [monthKey]);

  const setRangeNote = useCallback((text) => {
    if (!rangeKey) return;
    setNotes(n => ({ ...n, [rangeKey]: text }));
  }, [rangeKey]);

  const monthNote = notes[monthKey] || '';
  const rangeNote = rangeKey ? (notes[rangeKey] || '') : '';

  // Collect all day-level notes for current month view
  const getDayNote = useCallback((day) => {
    const key = toKey(makeDate(currentYear, currentMonth, day));
    return notes[key] || '';
  }, [notes, currentYear, currentMonth]);

  const setDayNote = useCallback((day, text) => {
    const key = toKey(makeDate(currentYear, currentMonth, day));
    setNotes(n => ({ ...n, [key]: text }));
  }, [currentYear, currentMonth]);

  return {
    today,
    currentYear, currentMonth,
    rangeStart, rangeEnd,
    hoverDate, setHoverDate,
    selecting,
    animDir, isFlipping,
    navigate, goToToday,
    handleDayClick, clearSelection,
    monthNote, setMonthNote,
    rangeNote, setRangeNote,
    getDayNote, setDayNote,
    rangeKey,
  };
}