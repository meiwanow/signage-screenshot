const { chromium } = require('playwright');

(async () => {
  const URL = 'https://solar-carport.meiwajp-dev.link/meiwa-rental';   // ← 対象URLに変更
  const OUTPUT = 'latest.png';

  const browser = await chromium.launch({
    args: ['--no-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },   // 取得サイズを固定
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  /* ============================
     1. ページ読み込み
     ============================ */
  await page.goto(URL, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  /* ============================
     2. 表示の「落ち着き」待ち
     ============================ */

  // ネットワークが静かになるまで待つ
  await page.waitForLoadState('networkidle');

  // さらにアニメーション・遷移対策で少し待機
  await page.waitForTimeout(2000);

  // フォントの描画完了を保証
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  /* ============================
     3. スクリーンショット取得
     ============================ */
  await page.screenshot({
    path: OUTPUT,
    fullPage: false,   // ビューポートサイズ固定
  });

  await browser.close();

  console.log(`Captured: ${OUTPUT}`);
})();
