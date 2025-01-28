// Import necessary functions from Playwright
const { test, expect } = require('@playwright/test');

// Group tests related to the App component
test.describe('App Component Tests', () => {
  
  // Test case to check if the Cart button is visible
  test('should display the Cart button', async ({ page }) => {
    await page.goto('http://localhost:5173/'); // Adjust URL if necessary
    const cartButtonVisible = await page.isVisible('text=cart'); // Ensure the casing matches
    expect(cartButtonVisible).toBe(true); // Assert that the Cart button is visible
  });

  // Test case to add an item to the cart
  test('should add an item to the cart', async ({ page }) => {
    await page.goto('http://localhost:5173/'); // Adjust URL if necessary
    await page.click('text=Apple'); // Click on the Apple item (assuming it's displayed)
    await page.click('text=+'); // Click the '+' button to add the item
    const appleCount = await page.innerText('text=Apple'); // Adjust selector for item count
    expect(appleCount).toContain('1'); // Check if the item count is updated
  });

  // Test case to remove an item from the cart
  test('should remove an item from the cart', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Apple'); // Click on the Apple item
    await page.click('text=+'); // Add item first
    await page.click('text=-'); // Click the '-' button to remove the item
    const appleCount = await page.innerText('text=Apple'); // Adjust selector for item count
    expect(appleCount).toContain('0'); // Check if the item count is updated to 0
  });

  // Test case to ensure items are displayed in the cart
  test('should display items in the cart', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Apple'); // Add item first
    await page.click('text=cart'); // Click the Cart button
    const itemVisible = await page.isVisible('text=Apple'); // Check if Apple is visible in the cart
    expect(itemVisible).toBe(true); // Assert that the item is displayed
  });

  // Test case to check total price calculation
  test('should calculate total price correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('text=Apple'); // Add item first
    await page.click('text=+'); // Click to increase quantity
    await page.click('text=Cart'); // Go to the Cart
    const totalPrice = await page.innerText('.total-price-selector'); // Adjust selector for total price
    expect(totalPrice).toContain('120'); // Check if the total price is correct (adjust according to your logic)
  });

  // Test case to check button functionality in Total component
  test('should toggle visibility of total section', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const toggleButton = await page.isVisible('text=|||'); // Adjust selector for the toggle button
    expect(toggleButton).toBe(true); // Check if the toggle button is visible
    await page.click('text=|||'); // Click to toggle the section
    const totalSectionVisible = await page.isVisible('.total-section-selector'); // Adjust selector for total section
    expect(totalSectionVisible).toBe(true); // Assert that the total section is visible
  });

});