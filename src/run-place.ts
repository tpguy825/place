import puppeteer from "puppeteer";
import { run } from "./place";
import config from "./config";
import { writeFileSync } from "fs";
import { Body } from "./server";

(async () => {
	const browser = await puppeteer.launch(config.puppeteer);
	function callback(data: Uint8Array, filename: string) {
		writeFileSync(
			"recent.json",
			JSON.stringify({
				date: Number(filename.split("-")[1].split(".")[0]),
				filename,
			}),
		);
		fetch("https://place.tobypayne.co.uk:3000/upload", {
			method: "POST",
			body: JSON.stringify({
				filename,
				data,
				date: Number(filename.split("-")[1].split(".")[0]),
			} satisfies Body),
		})
			.then((e) => e.json())
			.then(console.log)
			.catch(console.error);
	}
	await run(browser, callback);
	setInterval(async () => {
		await run(browser, callback);
	}, config.interval);
})();
