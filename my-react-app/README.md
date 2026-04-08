# 🗓️ Wall Calendar — Interactive React Component

A beautifully crafted, animated **wall calendar web component** built using React.
Inspired by real-world paper calendars, this project combines **modern UI/UX, smooth animations, and practical features** like date range selection and persistent notes.

---

## ✨ Overview

This project recreates the feel of a **physical wall calendar** in a digital experience — complete with:

* A **wooden binding bar**
* **Parchment-style paper UI**
* Smooth **3D page-flip animations**
* Interactive **date range selection**
* Built-in **notes system with persistence**

---

## 🚀 Live Demo

> https://calendarwall.netlify.app/

---

## 🧩 Features

### 🎨 Visual & UI

* **Wall Calendar Aesthetic**

  * Wooden binding bar with 3D rings
  * Warm parchment paper texture
* **Hero Image Panel**

  * Monthly themed images (Unsplash)
  * Subtle Ken Burns zoom effect
* **Month Theming**

  * Unique accent color scheme for each month

---

### 🔄 Interactions & Animations

* **Page-Flip Animation**

  * Smooth 3D `rotateY` transition when switching months
* **Staggered Day Animation**

  * Calendar cells animate into view on load

---

### 📅 Date Selection

* **Day Range Selector**

  * Click to select start date
  * Hover to preview range
  * Click again to confirm end date
* Clear visual states:

  * Start day
  * End day
  * In-between days
  * Hover preview

---

### 📝 Notes System

* **Two Tabs**

  * 🗒️ Monthly Memo
  * 📌 Range Note (linked to selected dates)
* Styled like a **lined notebook**

  * Includes red margin line for realism
* **Auto-save using localStorage**

  * Notes persist after refresh

---

### 🎉 Extra Features

* **Holiday Markers**

  * Highlighted with subtle red dot indicators
* **Today Highlight**

  * Current date is always visually emphasized
* **Fully Responsive**

  * Desktop: side-by-side layout
  * Mobile: stacked, compact design

---

## 🛠️ Tech Stack

* **Frontend**: React (Functional Components + Hooks)
* **Styling**: CSS3 (Custom animations, keyframes, 3D transforms)
* **State Management**: Custom React Hook (`useCalendar`)
* **Persistence**: Browser `localStorage`
* **Assets**: Unsplash (royalty-free images)

---

## 📁 Project Structure

```
src/
├── App.js
├── App.css
├── index.js
├── index.css
├── components/
│   ├── WallCalendar.js
│   ├── CalendarBinding.js
│   ├── CalendarHero.js
│   ├── CalendarGrid.js
│   ├── CalendarNotes.js
├── hooks/
│   └── useCalendar.js
├── utils/
│   └── calendarUtils.js
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js ≥ 16
* npm ≥ 8

### Steps

```bash
# Clone repository
git clone https://github.com/your-username/wall-calendar.git

# Navigate into project
cd wall-calendar

# Install dependencies
npm install

# Run development server
npm start
```

App will run at:

```
http://localhost:3000
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🌐 Deployment

You can deploy easily using:

* Vercel
* Netlify
* GitHub Pages

---

## 🎨 Design Philosophy

* Mimic **real-world tactile elements** (paper, wood, ink)
* Focus on **micro-interactions** for delight
* Keep logic **modular and reusable**
* Avoid heavy libraries — rely on **custom hooks and pure CSS**

---

## 🧠 Learning Highlights

This project demonstrates:

* Advanced **React component architecture**
* Custom hooks for **state abstraction**
* Complex **UI state handling** (range selection)
* CSS **3D transforms & animations**
* Persistent UI state using `localStorage`

---

## 🚧 Future Improvements

* Add backend sync for notes
* Drag-to-select date range
* Dark mode toggle
* Event reminders & notifications
* Calendar export (Google Calendar integration)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Your Name**

* GitHub: https://github.com/SagarSingh03
* Portfolio : https://sagarsingh03.github.io/Portfolio-SagarSingh03/

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
