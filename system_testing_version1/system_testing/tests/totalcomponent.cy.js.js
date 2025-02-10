test.describe('Total Component Tests', () => {
    test('should calculate total price correctly', async ({ page }) => {
      await page.goto('http://localhost:3000/total'); // Adjust URL
      const totalPrice = await page.innerText('.total-price-selector'); // Adjust selector
      expect(totalPrice).toBe('Expected Total Price'); // Adjust according to expected behavior
    });
  
    test('should display items in the total section', async ({ page }) => {
      await page.goto('http://localhost:3000/total');
      const itemVisible = await page.isVisible('.your-item-selector'); // Adjust selector
      expect(itemVisible).toBe(true);
    });
  
    test('should toggle the total section visibility', async ({ page }) => {
      await page.goto('http://localhost:3000/total');
      await page.click('.toggle-button-selector'); // Adjust selector
      const totalSectionVisible = await page.isVisible('.total-section-selector'); // Adjust selector
      expect(totalSectionVisible).toBe(true);
    });
  });