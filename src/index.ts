import { Command } from "commander";
import * as fs from "fs";
import * as qr from "qr-image";

const program = new Command();

program
	.version("1.0.0")
	.description("CLI tool to generate QR codes")
	.option("-d, --data <string>", "Data to encode in the QR code")
	.option("-o, --output <string>", "Output file (e.g., qr.png)")
	.parse(process.argv);

const options = program.opts();

if (!options.data) {
	console.error("Error: Data is required");
	process.exit(1);
}

const qrSvg = qr.image(options.data, { type: "png" });

if (options.output) {
	qrSvg.pipe(fs.createWriteStream(options.output));
	console.log(`QR code generated and saved to ${options.output}`);
} else {
	qrSvg.pipe(process.stdout);
}
