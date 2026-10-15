
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('PopoverWidget Puppeteer E2E Tests', () => {
  let browser = null;
  let page= null;
  let server = null;
  let puppeteer = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    const puppeteerModule = await import('puppetter');
    puppeteer = puppeteerModule.default || puppeteerModule;
    server = fork(`./src/js/__tests__/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (page) await page.close();
    if (browser) await browser.close();
    if (server) server.kill('SIGKILL');
  });

  test('should show and hide popover on real page', async () => {
    await page.goto(baseUrl);

    const buttonSelector = '#popover-btn';
    await page.waitForSelector(buttonSelector);

    let popover = await page.$('.popover');
    expect(popover).toBeNull();

    await page.click(buttonSelector);

    await page.waitForSelector('.popover');
    popover = await page.$('.popover');
    expect(popover).not.toBeNull();

    const titleText = await page.$eval('.popover-title', el => el.textContent);
    const contentText = await page.$eval('.popover-content', el => el.textContent);
    expect(titleText).toBe('Popover title');
    expect(contentText).toBe(`And here's some amazing content. It's very engaging. Right?`);

    await page.click(buttonSelector);

    await page.waitForSelector('.popover', { hidden: true, timeout: 2000 });
  });
});
