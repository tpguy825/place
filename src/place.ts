import { writeFileSync } from "fs";
import { linkCanvas } from "puppet-canvas";
import type { Browser } from "puppeteer";

export async function run(browser: Browser, callback?: (response: Uint8Array, filename: string) => void) {
	const page = await browser.newPage();
	await page.goto("https://reddit.com/r/place?cx=285&cy=-18&px=1151&screenmode=fullscreen");
	const wgat = await page
		.waitForSelector(
			`iframe[src="https://garlic-bread.reddit.com/embed?screenmode=fullscreen&cx=285&cy=-18&px=1151&locale=en-US"`,
		)
		.then((e) => e?.contentFrame());
	const whuy = await (
		await wgat?.waitForSelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed")
	)
		?.evaluateHandle(
			`document.querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed").shadowRoot.querySelector("div > garlic-bread-share-container > garlic-bread-camera > garlic-bread-canvas").shadowRoot.querySelector("div > canvas")`
		)
		.then((e) => e?.asElement()?.toElement("canvas"));
	if (!whuy) throw new Error("canvas not found");
	const linked = await linkCanvas(whuy);
	setTimeout(async () => {
		const response = await fetch(await linked.toDataURL("image/png"));
		const uint8 = new Uint8Array(await response.arrayBuffer())
		const filename = `place/place-${Date.now()}.png`
		writeFileSync(filename, uint8);
		if (callback) callback(uint8, filename)
		await page.close();
	}, 5000);
}