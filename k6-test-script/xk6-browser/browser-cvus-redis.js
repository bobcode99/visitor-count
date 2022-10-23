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
    page.goto('http://localhost:8889/', { waitUntil: 'networkidle' });
    
    // Release the page and browser.
    page.close();
    browser.close();

}
