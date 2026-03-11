import { test, expect } from '@playwright/test';

test.describe('NBA Dashboard Smoke Test', () => {
  test('should mount and display the NBA dashboard', async ({ page }) => {
    // Navigate to the NBA dashboard route
    await page.goto('/nba');

    // Check for the main title
    const title = page.locator('.standalone-title');
    await expect(title).toContainText('NBA Player Analytics Dashboard');

    // Check for the search input
    const searchInput = page.locator('#player-search');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Type player name...');

    // Check for the rate limit status component
    const rateLimitStatus = page.locator('app-rate-limit-status');
    await expect(rateLimitStatus).toBeVisible();
    await expect(rateLimitStatus).toContainText('API Usage');
  });

  test('should perform a simple player search', async ({ page }) => {
    await page.goto('/nba');

    const searchInput = page.locator('#player-search');
    await searchInput.fill('LeBron');

    // Wait for debounce and MSW mock response
    // Using MSW, 'LeBron' should return LeBron James from src/mocks/handlers.ts
    const resultItem = page.locator('.nba-player-search__results-item');
    await expect(resultItem).toBeVisible({ timeout: 5000 });
    await expect(resultItem).toContainText('LeBron James');

    // Click on the result
    await resultItem.click();

    // Verify stats table appears
    const statsTable = page.locator('app-stats-table');
    await expect(statsTable).toBeVisible();
    await expect(statsTable).toContainText('Points Per Game');
  });
});
