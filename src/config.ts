import { PuppeteerLaunchOptions } from "puppeteer";

export default {
	puppeteer: {
		headless: false,
		executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	},
	interval: 1000 * 60 * 3,
} satisfies {
	puppeteer?: PuppeteerLaunchOptions;
	/** in ms, not used for `once` script */
	interval: number;
};
