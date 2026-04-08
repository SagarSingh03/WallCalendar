import React, { useRef } from 'react';
import {
  DAYS_SHORT, MONTHS,
  daysInMonth, firstDayOfMonth,
  makeDate, isSameDay, isBetween, isToday, getHoliday
} from '../utils/calendarUtils';
import './CalendarGrid.css';

export default function CalendarGrid({ cal, theme }) {
  const { currentYear, currentMonth, rangeStart, rangeEnd, hoverDate,
          setHoverDate, selecting, handleDayClick, isFlipping, animDir } = cal;

  const totalDays = daysInMonth(currentYear, currentMonth);
  const startOffset = firstDayOfMonth(currentYear, currentMonth);

  // Compute effective end for hover preview
  const effectiveEnd = selecting && rangeStart && hoverDate ? hoverDate : rangeEnd;

  const gridRef = useRef(null);

  return (
    <div className={`calendar-grid-wrap ${isFlipping ? `flip-${animDir}` : 'flip-in'}`}>
      {/* Month label (desktop only — mobile shows in header) */}
      <div className="grid-month-label">
        <span className="gml-month">{MONTHS[currentMonth]}</span>
        <span className="gml-year">{currentYear}</span>
      </div>

      {/* Day headers */}
      <div className="day-headers">
        {DAYS_SHORT.map((d, i) => (
          <div key={d} className={`day-header ${i === 0 || i === 6 ? 'weekend' : ''}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        ref={gridRef}
        className="day-grid"
        onMouseLeave={() => setHoverDate(null)}
      >
        {/* Empty cells before month starts */}
        {[...Array(startOffset)].map((_, i) => (
          <div key={`e-${i}`} className="day-cell empty" />
        ))}

        {/* Day cells */}
        {[...Array(totalDays)].map((_, idx) => {
          const day = idx + 1;
          const date = makeDate(currentYear, currentMonth, day);
          const dayOfWeek = (startOffset + idx) % 7;
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          const todayFlag    = isToday(date);
          const isStart      = rangeStart && isSameDay(date, rangeStart);
          const isEnd        = effectiveEnd && isSameDay(date, effectiveEnd);
          const inRange      = isBetween(date, rangeStart, effectiveEnd);
          const holiday      = getHoliday(currentMonth, day);
          const isHover      = hoverDate && isSameDay(date, hoverDate);

          const classes = [
            'day-cell',
            isWeekend ? 'weekend' : '',
            todayFlag  ? 'today'   : '',
            isStart    ? 'range-start' : '',
            isEnd      ? 'range-end'   : '',
            inRange    ? 'in-range'    : '',
            holiday    ? 'holiday'     : '',
            isHover    ? 'hovered'     : '',
            selecting  ? 'selecting'   : '',
          ].filter(Boolean).join(' ');

          return (
            <div
              key={day}
              className={classes}
              style={{ '--day-idx': idx }}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => selecting && setHoverDate(date)}
              title={holiday || (todayFlag ? 'Today' : '')}
              role="button"
              tabIndex={0}
              aria-label={`${day} ${MONTHS[currentMonth]}${holiday ? `, ${holiday}` : ''}`}
              onKeyDown={e => e.key === 'Enter' && handleDayClick(day)}
            >
              <span className="day-number">{day}</span>
              {todayFlag && <span className="today-dot" />}
              {holiday   && <span className="holiday-dot" title={holiday} />}
              {(isStart || isEnd) && <span className="range-marker" />}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid-legend">
        <span className="legend-item">
          <span className="legend-dot today-legend" />Today
        </span>
        <span className="legend-item">
          <span className="legend-dot holiday-legend" />Holiday
        </span>
        <span className="legend-item">
          <span className="legend-dot range-legend" style={{ background: 'var(--accent)' }} />Selected
        </span>
      </div>
    </div>
  );
}