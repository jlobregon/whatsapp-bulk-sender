const puppeteer = require('puppeteer');
const { readFileSync } = require('fs')
const input = require('./modules/input');
const wait = require('./modules/wait');

const WHATSAPP_PAGE_URL = 'https://web.whatsapp.com';
const config = require('./config');

function fillTemplate(message, args) {
    const regex = /\{(\d+)\}/g;
    return message.replaceAll(regex, (match, index) => args[index - 1]);
}

(async () => {
    const message = readFileSync('./assets/message.txt', { encoding: 'utf-8' });
    const message_data = readFileSync('./assets/message_data.csv', { encoding: 'utf-8' })
        .split('\n')
        .map(line => line.split(';'))
        .map(data => { return { number: data[0].trim(), args: data.slice(1) } });

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const [page] = await browser.pages();
    await page.goto(WHATSAPP_PAGE_URL);
    await input('Once logged into WhatsApp press Enter to continue.');
    console.info('The bulk sending of messages will start, please supervise the process. If anything goes wrong, press Ctrl+C.')
    for ({ number, args } of message_data) {
        console.log('Sending message to ' + number);
        await page.goto(encodeURI(`${WHATSAPP_PAGE_URL}/send?phone=${number}&text=${fillTemplate(message, args)}`));
        await page.waitForNavigation();
        await wait(5000);
        await page.click(config.selector);
        await wait(1000)
        console.log('Message successfully sent to the number ' + number);
    }
    browser.close();
})();