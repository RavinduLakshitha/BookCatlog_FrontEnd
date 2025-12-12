# Book Catalog

A modern book management interface built with React, TypeScript, and RTK Query. Features a responsive design, smooth UI, and real-time updates.

## 🚀 Features

- Add, view, update, and delete books
- Real-time data synchronization
- Responsive grid layout
- Modern UI with Tailwind CSS
- Loading and error states

## 🛠️ Tech Stack

- React + TypeScript
- Redux Toolkit & RTK Query
- Tailwind CSS
- Vite

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Getting Started

### Development

```bash
npm run dev
```

Starts dev server at `http://localhost:5173` with API proxy to `http://localhost:5125/api`

### Build

```bash
npm run build
```

Outputs optimized build to `dist/`

### Testing

```bash
npm test
```

Runs all Jest unit tests. Test files are in `src/**/*.test.tsx` and `src/**/*.test.ts`.

## API Configuration

The API base URL is configured in [src/config.ts](src/config.ts). The Vite dev server proxies `/api` requests to `http://localhost:5125` (see [vite.config.ts](vite.config.ts)).

## ⚙️ Configuration
Update the API URL in src/config.ts if needed:

export const API_BASE_URL = 'http://localhost:5125/api';


## 🚀 Usage
Start the development server:

Visit http://localhost:5173 in your browser.
