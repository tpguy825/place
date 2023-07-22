import puppeteer from "puppeteer";
import { run } from "./place";
import config from "./config";
import { existsSync, writeFileSync } from "fs";

(async () => {
	const browser = await puppeteer.launch(config.puppeteer);
	async function callback(data: Uint8Array, filename: string) {
		writeFileSync(
			"recent.json",
			JSON.stringify({
				date: Number(filename.split("-")[1].split(".")[0]),
				filename,
			}),
		);
		if (process.platform === "win32" && existsSync("C:\\projects\\place\\src\\hidden.ts"))
			(await import("./hidden")).upload(filename, data);
	}
	const page = await browser.newPage();
	const url = "https://reddit.com/r/place?cx=-17&cy=-76&px=276&screenmode=fullscreen";
	await page.goto(url);
	await run(url, page, callback);
	setInterval(async () => {
		await run(url, page, callback);
	}, config.interval);
})();
