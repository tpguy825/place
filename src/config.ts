import { PuppeteerLaunchOptions } from "puppeteer";

export default {
	puppeteer: {
		headless: false,
		executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	},
	interval: 1000 * 60,
} satisfies {
	puppeteer?: PuppeteerLaunchOptions;
	/** in ms, not used for `once` script */
	interval: number;
};
