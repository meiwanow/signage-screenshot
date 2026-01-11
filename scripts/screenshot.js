import { chromium } from 'playwright';

const URL = 'https://solar-carport.meiwajp-dev.link/meiwa-rental';   // 対象URLに変更
const OUTPUT = 'latest.png';

(async () => {
  const browser = await chromium.launch({
    args: ['--no-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  await page.goto(URL, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  // 表示安定化
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  await page.screenshot({
    path: OUTPUT,
    fullPage: false,
  });

  await browser.close();
})();
