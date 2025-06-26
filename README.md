# Component Landing Page Builder

A full-stack web application for creating landing pages using a drag-and-drop visual editor.

## Running Locally

### Prerequisites
- Node.js 18+ installed on your machine
- Git installed

### Setup Instructions

1. **Clone or download this project** to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

The application will be running with:
- Frontend: React with Vite
- Backend: Express.js server
- Hot reload enabled for development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript checks

### Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   └── hooks/       # Custom hooks
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage
└── shared/          # Shared types and schemas
```

### Features

- Visual drag-and-drop editor
- 40+ component templates
- Export to HTML/CSS, React, PNG
- Responsive design
- Real-time preview
- Advanced canvas with smart guides
- Layer management
- Blend modes and masking
- Keyboard shortcuts

### Development

The app runs on a single port (5000) serving both the API and frontend. The Vite development server provides hot module replacement for instant updates during development.