test.describe('Tocheckout Component Tests', () => {
    test('should alert when clicked with total price zero', async ({ page }) => {
      await page.goto('http://localhost:3000/checkout'); // Adjust URL
      const [alert] = await Promise.all([
        page.waitForEvent('dialog'),
        page.click('text=To checkout'), // Adjust selector
      ]);
      expect(alert.message()).toBe('pls add sth');
      await alert.dismiss();
    });
  
    test('should call checkout API when clicked with valid total price', async ({ page }) => {
      await page.goto('http://localhost:3000/checkout'); // Adjust URL
      // Mock the API call if necessary
      await page.click('text=To checkout'); // Adjust selector
      // Verify the expected behavior after the API call
    });
  });