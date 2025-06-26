const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function exportPNG() {
  console.log('Starting PNG export process...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to the editor
    await page.goto('http://localhost:5000/editor', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for the canvas to load
    await page.waitForSelector('[data-testid="canvas"]', { timeout: 10000 });
    
    // Create exports directory
    const exportDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    
    // Take screenshot of the canvas
    const canvas = await page.$('[data-testid="canvas"]');
    if (canvas) {
      await canvas.screenshot({
        path: path.join(exportDir, `componentforge-export-${Date.now()}.png`),
        type: 'png'
      });
      console.log('PNG export completed successfully');
    } else {
      console.log('Canvas not found, taking full page screenshot');
      await page.screenshot({
        path: path.join(exportDir, `componentforge-fullpage-${Date.now()}.png`),
        type: 'png',
        fullPage: true
      });
    }
    
  } catch (error) {
    console.error('PNG export failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  exportPNG().catch(console.error);
}

module.exports = { exportPNG };