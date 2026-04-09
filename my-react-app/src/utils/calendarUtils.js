

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const HOLIDAYS = {
  '1-1':  'New Year\'s Day',
  '1-26': 'Republic Day',
  '3-8':  'International Women\'s Day',
  '4-14': 'Dr. Ambedkar Jayanti',
  '5-1':  'Labour Day',
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  '10-31':'Halloween',
  '12-25':'Christmas Day',
  '12-31':'New Year\'s Eve',
};


export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}


export function toKey(date) {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}


export function makeDate(year, month, day) {
  return new Date(year, month, day);
}


export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}


export function isBetween(date, start, end) {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t >= s && t <= e;
}


export function isToday(date) {
  return isSameDay(date, new Date());
}


export function getHoliday(month, day) {
  const key = `${month + 1}-${day}`;
  return HOLIDAYS[key] || null;
}


export const MONTH_IMAGES = [
  // Jan
  'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&q=80',
  // Feb
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
  // Mar
  'https://images.unsplash.com/photo-1490750967868-88df5691b6be?w=800&q=80',
  // Apr
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
  // May
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  // Jun
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  // Jul
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
  // Aug
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  // Sep
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  // Oct
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
  // Nov
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
  // Dec
  'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&q=80',
];


export const MONTH_THEMES = [
  { accent: '#4a7fb5', accentLight: '#d0e4f5', label: 'Winter Blue' },      // Jan
  { accent: '#c0432a', accentLight: '#f5d5d0', label: 'Valentine Red' },    // Feb
  { accent: '#6b8a72', accentLight: '#d5eadc', label: 'Spring Green' },     // Mar
  { accent: '#c9963a', accentLight: '#f5e4c0', label: 'Golden April' },     // Apr
  { accent: '#7a9e56', accentLight: '#ddefca', label: 'May Green' },        // May
  { accent: '#5b9ea0', accentLight: '#c8e8ea', label: 'Ocean June' },       // Jun
  { accent: '#d4823a', accentLight: '#f8dec8', label: 'Summer Amber' },     // Jul
  { accent: '#b07a3c', accentLight: '#f0dfc0', label: 'Harvest Gold' },     // Aug
  { accent: '#c0432a', accentLight: '#f2d5c8', label: 'Autumn Rust' },      // Sep
  { accent: '#8b4513', accentLight: '#e8d0bc', label: 'October Brown' },    // Oct
  { accent: '#6a5acd', accentLight: '#ddd8f5', label: 'November Dusk' },    // Nov
  { accent: '#2e6da4', accentLight: '#c8ddf0', label: 'Winter Snow' },      // Dec
];