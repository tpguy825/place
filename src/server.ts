import express, { type Request } from "express";
import { writeFileSync } from "fs";
const app = express();

export interface Body {
	data: Uint8Array;
	filename: string;
	date: number;
}

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.post("/upload", (req: Request<{}, {}, Body>, res) => {
	try {
		const { data, filename, date } = req.body;
		writeFileSync(filename, data);
		writeFileSync(
			"recent.json",
			JSON.stringify({
				date,
				filename,
			}),
		);
		res.status(200).json({ success: true });
	} catch (e: any) {
		res.status(500).json({ success: false, error: e.message });
	}
});
