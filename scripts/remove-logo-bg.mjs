import sharp from "sharp";
import { resolve } from "node:path";

const input = resolve("public/logo.jpg");
const output = resolve("public/logo.png");

const { width, height } = await sharp(input).metadata();
const size = Math.min(width, height);
const cx = width / 2;
const cy = height / 2;
const r = size / 2;

const mask = Buffer.from(
	`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
		<circle cx="${cx}" cy="${cy}" r="${r}" fill="white"/>
	</svg>`
);

await sharp(input)
	.ensureAlpha()
	.composite([{ input: mask, blend: "dest-in" }])
	.png()
	.toFile(output);

console.log(`Wrote ${output} (${width}x${height}, circle r=${r})`);
