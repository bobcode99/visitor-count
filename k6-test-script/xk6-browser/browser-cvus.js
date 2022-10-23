import http from "k6/http";
import { sleep } from "k6";
import { chromium } from "k6/x/browser";

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: "constant-vus",
      vus: 3,
      duration: "10s",
    },
  },
};

// export const options = {
//     discardResponseBodies: true,
//     scenarios: {
//       contacts: {
//         executor: 'shared-iterations',
//         vus: 3,
//         iterations: 200,
//         maxDuration: '30s',
//       },
//     },
//   };

export default function() {
    const browser = chromium.launch({
        headless: false,
        slowMo: '500ms' // slow down by 500ms
    });
    const context = browser.newContext();
    const page = context.newPage();

    // Goto front page, find login link and click it
    page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });

    const elem = page.$('a[href="/my_messages.php"]');
    elem.click().then(() => {
        // Enter login credentials and login
        page.$('input[name="login"]').type('admin');
        page.$('input[name="password"]').type('123');
        return page.$('input[type="submit"]').click();
    }).then(() => {
        // Wait for next page to load
        page.waitForLoadState('networkidle');
    }).finally(() => {
        // Release the page and browser.
        page.close();
        browser.close();
    });
}
