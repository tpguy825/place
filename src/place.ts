import { writeFileSync } from "fs";
import { linkCanvas } from "puppet-canvas";
import type { Page } from "puppeteer";

function delay(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function run(url: string, page: Page, callback?: (response: Uint8Array, filename: string) => void) {
	// if (page.url() !== url) await page.goto(url);
	// TODO if you have better names for these variables please change them thanks i cba rn
	const wgat = await page
		.waitForSelector(
			`iframe[allow]`,
		)
		.then((e) => e?.contentFrame());
	const whuy = await (await wgat?.waitForSelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed"))
		?.evaluateHandle(
			`document.querySelector("body > garlic-bread-app > faceplate-alert-reporter > garlic-bread-embed").shadowRoot.querySelector("div > garlic-bread-share-container > garlic-bread-camera > garlic-bread-canvas").shadowRoot.querySelector("div > canvas")`,
		)
		.then((e) => e?.asElement()?.toElement("canvas"));
	if (!whuy) throw new Error("canvas not found");
	console.log("Got the canvas! You have 5 seconds to move the camera")
	await delay(5000);
	const linked = await linkCanvas(whuy);
	setTimeout(async () => {
		const response = await fetch(await linked.toDataURL("image/png"));
		const uint8 = new Uint8Array(await response.arrayBuffer())
		const filename = `place/place-${Date.now()}.png`
		writeFileSync(filename, uint8);
		if (callback) callback(uint8, filename)
	}, 5000);
}