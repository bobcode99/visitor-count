import { chromium } from 'k6/x/browser';
import { sleep } from "k6";

export default function() {
    const browser = chromium.launch({ headless: false });
    const context = browser.newContext();
    const page = context.newPage();
    page.goto('http://localhost:8889/');
    page.screenshot({ path: `example-chromium.png` });
    sleep(3);
    page.close();
    browser.close();
}