import puppeteer from "puppeteer";
import { run } from "./place";
import config from "./config";

(async () => {
	const browser = await puppeteer.launch(config.puppeteer);
	await run(browser);
})();
