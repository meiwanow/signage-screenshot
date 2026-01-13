import { chromium } from 'playwright';

const URL = 'https://solar-carport.meiwajp-dev.link/meiwa-rental';
const OUTPUT = 'latest.png';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);  // 表示安定化
  await page.evaluate(async () => document.fonts?.ready && await document.fonts.ready);

  await page.screenshot({ path: OUTPUT, fullPage: false });
  await browser.close();
})();
