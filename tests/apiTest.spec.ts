import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Visual regression test for drgrossmann.pl', () => {
  test('homepage visual comparison', async ({ page }) => {
    // 1. Wejdź na stronę
    await page.goto('https://drgrossmann.pl/', { waitUntil: 'networkidle' });
   await page.waitForTimeout(5000); // waits for 3 seconds


    // 2. Ustaw rozmiar okna (dla spójności)
    await page.setViewportSize({ width: 1280, height: 900 });

    // 3. Upewnij się, że folder istnieje
    const dir = path.resolve('screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    // 4. Ścieżka pliku
    const filePath = path.join(dir, 'homepage.png');

    // 5. Zrób screenshot i zapisz do pliku
    await page.screenshot({ path: filePath, fullPage: true });

    console.log(`Screenshot zapisany: ${filePath}`);

    // 6. Dodatkowo porównaj z poprzednim snapshotem (Playwright sam zarządza plikami referencyjnymi)
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    expect(screenshotBuffer).toMatchSnapshot('tests/__snapshots__/apiTest.spec.ts-snapshots/homepage-reference-chromium-darwin.png', {
      threshold: 0.01,
    });
  });
});
