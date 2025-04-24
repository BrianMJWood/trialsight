import { test, expect } from '@playwright/test';

test.describe('Trialsight tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    expect(await page.locator('h2').innerText()).toContain('TrialSight');
  });

  test('shows 10 trials once the API call completes', async ({ page }) => {
    await expect(page.locator('ul > li')).toHaveCount(10);
  });

  test('can add a single trial to favourites', async ({ page }) => {
    await page.locator('ul > li').first().locator('button').click();
    await page.locator('#tab-link-favourites').click();
    await expect(page.locator('ul > li')).toHaveCount(1);
  });

  test('can remove a single trial from favourites', async ({ page }) => {
    await page.locator('ul > li').first().locator('button').click();
    await page.locator('#tab-link-favourites').click();
    await page.locator('ul > li').first().locator('button').click();
    await page.locator('#tab-link-favourites').click();
    await expect(page.locator('ul > li')).toHaveCount(0);
  });

  test('can add all displayed trials to favourites', async ({ page }) => {
    await page.locator('#add-all-to-favourites').click();
    await page.locator('#tab-link-favourites').click();
    await expect(page.locator('ul > li')).toHaveCount(10);
  });

  test('can clear all favourites', async ({ page }) => {
    await page.locator('#add-all-to-favourites').click();
    await page.locator('#tab-link-favourites').click();
    await page.locator('#clear-favourites').click();
    await expect(page.locator('ul > li')).toHaveCount(0);
  });
});
