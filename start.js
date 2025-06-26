#!/usr/bin/env node

// Universal startup script that works on Windows, Mac, Linux, and Replit
const { spawn } = require('child_process');
const path = require('path');

// Set environment variable
process.env.NODE_ENV = 'development';

// Start the server
const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

console.log('🚀 Starting Component Landing Page Builder...');
console.log('📍 Server will be available at: http://localhost:5000');

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  serverProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  serverProcess.kill();
  process.exit(0);
});