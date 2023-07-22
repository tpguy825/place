import { exec } from "child_process";
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

app.get("/upload", (req: Request<{}, {}, Body>, res) => {
	try {
		exec(`git pull`, (err, stdout, stderr) => {
			if (err) {
				res.status(500).json({ success: false, error: err.message });
			} else {
				res.status(200).json({ success: true });
			}
		})
	} catch (e: any) {
		res.status(500).json({ success: false, error: e.message });
	}
});

app.listen(3001, () => {
	console.log("Listening on port 3001");
})