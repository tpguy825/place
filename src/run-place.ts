import puppeteer from "puppeteer";
import { run } from "./place";
import config from "./config";
import { writeFileSync } from "fs";

(async () => {
	const browser = await puppeteer.launch(config.puppeteer);
	function callback(filename: string) {
		writeFileSync(
			"recent.json",
			JSON.stringify({
				date: Number(filename.split("-")[1].split(".")[0]),
				filename,
			}),
		);
	}
	await run(browser, (_, a) => callback(a));
	setInterval(async () => {
		await run(browser, (_, a) => callback(a));
	}, config.interval);
})();
