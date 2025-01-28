test.describe('Cart Component Tests', () => {
    test('should display items in the cart', async ({ page }) => {
      await page.goto('http://localhost:3000/cart'); // Adjust URL
      const item = await page.isVisible('.your-item-selector'); // Adjust selector
      expect(item).toBe(true);
    });
  
    test('should increase item quantity when + button is clicked', async ({ page }) => {
      await page.goto('http://localhost:3000/cart');
      await page.click('.your-add-button-selector'); // Adjust selector
      const updatedQuantity = await page.innerText('.your-quantity-selector'); // Adjust selector
      expect(updatedQuantity).toBe('1'); // Adjust according to expected behavior
    });
  
    test('should decrease item quantity when - button is clicked', async ({ page }) => {
      await page.goto('http://localhost:3000/cart');
      await page.click('.your-reduce-button-selector'); // Adjust selector
      const updatedQuantity = await page.innerText('.your-quantity-selector'); // Adjust selector
      expect(updatedQuantity).toBe('0'); // Adjust according to expected behavior
    });
  });