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
    // reading of the message template and the data for the executions
    const message = readFileSync('./assets/message.txt', { encoding: 'utf-8' });
    const message_data = readFileSync('./assets/message_data.csv', { encoding: 'utf-8' })
        .split('\n')
        .map(line => line.split(';'))
        .map(data => { return { number: data[0].trim(), args: data.slice(1) } });
    // creating and opening the browser
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
        if (number.length <= 3) continue;
        console.info(`Sending message to ${number}`);
        await page.goto(encodeURI(`${WHATSAPP_PAGE_URL}/send?phone=${number}&text=${fillTemplate(message, args)}`));
        await page.waitForNavigation();
        await wait(5000);
        await page.waitForSelector(config.selector, { timeout: 60000 })
            .then(async () => {
                await page.click(config.selector);
            })
            .then(() => console.info(`Message successfully sent to the number ${number}.`))
            .catch(error => {
                console.warn(`An error occurred while trying to send the message to ${number}. Please try again later.\nError information: ${error}`)
            }).finally(async () => {
                await wait(1000);
            });
    }
    console.info('The process is complete and your browser will close.')
    browser.close();
})();