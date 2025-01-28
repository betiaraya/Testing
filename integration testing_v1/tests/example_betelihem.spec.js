// tests/integration.test.js
const { test, expect } = require('@playwright/test');

test('should load the app and check the title', async ({ page }) => {
  await page.goto('http://localhost:5173/'); // Ensure your React app is running
  const title = await page.title();
  expect(title).toBe('Vite + React'); // Replace with your actual app title
});