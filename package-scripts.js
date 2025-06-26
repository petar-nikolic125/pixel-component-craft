module.exports = {
  scripts: {
    "dev:frontend": "cd client && vite --port 3000",
    "dev:backend": "cd server && tsx index.ts --port 4000",
    "export:png": "node scripts/export-png.js",
    "build:full": "npm run build && npm run build:client",
    "build:client": "cd client && vite build",
    "build:server": "cd server && esbuild index.ts --bundle --platform=node --outfile=../dist/index.js",
    "start:dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write ."
  }
};