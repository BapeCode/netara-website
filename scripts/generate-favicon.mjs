import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sizes = [16, 32, 48, 64];
const input = resolve("public/logo.png");
const output = resolve("public/favicon.ico");

const pngBuffers = await Promise.all(
	sizes.map((size) =>
		sharp(input)
			.resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
			.png()
			.toBuffer()
	)
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);

const directory = Buffer.alloc(16 * sizes.length);
let offset = 6 + 16 * sizes.length;
const entries = [];

for (let i = 0; i < sizes.length; i++) {
	const size = sizes[i];
	const png = pngBuffers[i];
	const base = i * 16;
	directory.writeUInt8(size === 256 ? 0 : size, base + 0);
	directory.writeUInt8(size === 256 ? 0 : size, base + 1);
	directory.writeUInt8(0, base + 2);
	directory.writeUInt8(0, base + 3);
	directory.writeUInt16LE(1, base + 4);
	directory.writeUInt16LE(32, base + 6);
	directory.writeUInt32LE(png.length, base + 8);
	directory.writeUInt32LE(offset, base + 12);
	entries.push(png);
	offset += png.length;
}

const ico = Buffer.concat([header, directory, ...entries]);
await writeFile(output, ico);
console.log(`Wrote ${output} (${ico.length} bytes, sizes: ${sizes.join(", ")})`);
