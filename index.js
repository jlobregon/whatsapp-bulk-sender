const puppeteer = require('puppeteer');
const { readFileSync } = require('fs')
const input = require('./modules/input');
const wait = require('./modules/wait');

const WHATSAPP_PAGE_URL = 'https://web.whatsapp.com';

(async () => {
    const message = readFileSync('./assets/message.txt', { encoding: 'utf-8' });
    const numbers = readFileSync('./assets/numbers.txt', { encoding: 'utf-8' }).split('\n').map(number => number.trim());
    const selector = readFileSync('./assets/selector.txt', { encoding: 'utf-8' });

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.goto(WHATSAPP_PAGE_URL);
    await input('Once logged into WhatsApp press Enter to continue.');
    // const selector = await input('Find and insert the selector of the send message element in the chat. If you don\'t know how to do it, watch this tutorial TODO.\n');
    for (number of numbers) {
        console.log('Sending message to ' + number);
        await page.goto(encodeURI(`${WHATSAPP_PAGE_URL}/send?phone=${number}&text=${message}`));
        await page.waitForNavigation();
        await wait(5000);
        await page.click(selector);
        await wait(1000)
        console.log('Message successfully sent to the number ' + number);
    }
    browser.close();
})();