# Book Finder

A fast React + Vite app to search books from Open Library with a modern, futuristic UI styled with Tailwind CSS.

## Features
- Search books by title (Open Library Search API)
- Clean, modern UI: gradients, glassmorphism cards, Inter font
- Responsive grid of book cards with covers, author, and year
- Read and Details buttons
  - Read opens Internet Archive reader (when available) or edition/work page
- Client-side pagination (12 per page) with animated page transitions
- Error and loading states

## Tech Stack
- React 18
- Vite
- Tailwind CSS 3

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
cd book-finder
npm install
```

### Run Dev Server
```bash
npm run dev
```
Then open the local URL shown (usually http://localhost:5173).

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure
```
book-finder/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ BookCard.jsx
│  │  ├─ ErrorMessage.jsx
│  │  ├─ Loader.jsx
│  │  └─ SearchBar.jsx
│  ├─ hooks/
│  │  └─ useFetchBooks.js
│  ├─ pages/
│  │  └─ Home.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
```

## API
Using Open Library:
- Search: `https://openlibrary.org/search.json?title={query}`
- Covers: `https://covers.openlibrary.org/b/id/{coverId}-{S|M|L}.jpg`
- Work details (optional): `https://openlibrary.org/works/{workId}.json`
- Edition details (optional): `https://openlibrary.org/books/{OLID}.json`
- Availability (optional): `https://openlibrary.org/api/volumes/brief/json/OLID:{OLID}`

Helpers in `src/services/api.js`:
- `fetchBooks(title)`
- `fetchWorkDetails(workKey)`
- `fetchEditionDetails(olid)`
- `fetchReadAvailability(olid)`
- `buildCoverUrl(coverId, size)`
- `buildReadInfoFromDoc(doc)` → `{ readUrl, canRead, workUrl }`

## Notes
- Some books may not have an online reader; the Read button disables when not available.
- Font errors for other families (e.g., DMSans) are external; we use Inter via Google Fonts.

## License
For educational use. Open Library content is subject to their terms.