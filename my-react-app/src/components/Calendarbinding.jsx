import React from 'react';

export default function CalendarBinding() {
  return (
    <div className="calendar-binding">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="binding-ring" style={{ animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );
}
