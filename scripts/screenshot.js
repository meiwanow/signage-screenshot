import { chromium } from 'playwright';
import fs from 'fs';

const URL = 'https://solar-carport.meiwajp-dev.link/meiwa-rental';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-gpu']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  // タイムアウトを長めに
  page.setDefaultTimeout(60000);

  console.log('open:', URL);
  await page.goto(URL, { waitUntil: 'domcontentloaded' });

  // 常時アニメーション対策：
  // 「通信が落ち着いた」+「固定待機」
  try {
    await page.waitForLoadState('networkidle', { timeout: 20000 });
  } catch (e) {
    console.log('networkidle not reached, continue');
  }

  // さらに安全マージン
  await page.waitForTimeout(5000);

  // 保存先
  const path = 'latest.png';

  await page.screenshot({
    path,
    fullPage: false
  });

  console.log('saved:', path);

  await browser.close();
})();
