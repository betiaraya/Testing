test.describe('Header Component Tests', () => {
    test('should display the header title', async ({ page }) => {
      await page.goto('http://localhost:3000');
      const titleVisible = await page.isVisible('text=Patal Paradise'); // Adjust selector
      expect(titleVisible).toBe(true);
    });
  });