# Component Landing Page Builder

A full-stack web application for creating landing pages using a drag-and-drop visual editor.

## Running the Project

### Prerequisites
- Node.js 18+ installed on your machine

### Universal Setup (Works on Windows, Mac, Linux)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server** (choose the easiest option):

   **Option A: Universal Node.js script (works everywhere)**
   ```bash
   node start.js
   ```

   **Option B: Direct command with cross-env**
   ```bash
   npx cross-env NODE_ENV=development tsx server/index.ts
   ```

   **Option C: Platform-specific scripts**
   ```bash
   # Windows
   ./dev.bat
   
   # Mac/Linux/Git Bash
   ./dev.sh
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

### What You'll See
- Complete landing page builder interface
- Drag-and-drop visual editor with 40+ components
- Real-time preview and export capabilities
- Hot reload for development changes

### Available Scripts

- `npm run dev` - Start development server (after updating package.json)
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