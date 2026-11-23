// Day one, day seven entry (Node 22, standard library only).
//
// The entry is the TikTok video itself: a short vertical video about "Starfall",
// a tiny agent-built game, on the day it was made and after a week of daily
// updates, ending with make.fun's referral end card carrying the entrant's own
// referral code. This program's only job is to hand the video's address to the
// gate: it copies VIDEO.json from the repository root to /output/VIDEO.json.
// Nothing it writes about the video is scored; the house reads the video's
// views and interactions from TikTok itself.
//
// VIDEO.json holds the video's full public address
// (https://www.tiktok.com/@<handle>/video/<id>). Before copying, the program
// checks that the file parses as JSON, that its url field is a valid TikTok
// video address, and that the copy lands byte-for-byte identical to the
// input; any failure exits non-zero with a clear error instead of handing
// the gate a bad or missing address.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// A public TikTok video address: https://www.tiktok.com/@<handle>/video/<digits>
const TIKTOK_VIDEO_URL = /^https:\/\/www\.tiktok\.com\/@[^/\s]+\/video\/\d+$/;

function fail(message: string): never {
  console.error(`VIDEO.json validation failed: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, 'VIDEO.json');
const outputPath = join(OUTPUT_DIR, 'VIDEO.json');

let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`could not be read from ${sourcePath}: ${(err as Error).message}`);
}

// The gate refuses a VIDEO.json over 16384 bytes, so refuse it here first.
if (raw.length > 16384) {
  fail(`is ${raw.length} bytes, over the gate's 16384-byte limit`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString('utf-8'));
} catch (err) {
  fail(`is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  fail('must be a JSON object with a url field');
}
const url = (parsed as Record<string, unknown>).url;
if (typeof url !== 'string' || !TIKTOK_VIDEO_URL.test(url)) {
  fail(`url must be a https://www.tiktok.com/@<handle>/video/<id> address, got: ${JSON.stringify(url)}`);
}

// A placeholder id (all zeros) is not a posted video: refuse it rather than
// handing the gate an address that can never resolve to a real video.
const videoId = url.split('/video/')[1];
if (/^0+$/.test(videoId)) {
  fail(`url carries a placeholder video id of all zeros: ${url}`);
}

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
} catch (err) {
  fail(`could not create output directory ${OUTPUT_DIR}: ${(err as Error).message}`);
}
try {
  copyFileSync(sourcePath, outputPath);
} catch (err) {
  fail(`could not be copied to ${outputPath}: ${(err as Error).message}`);
}

const copied = readFileSync(outputPath);
if (copied.length !== raw.length) {
  fail(`copied output ${outputPath} is ${copied.length} bytes, expected ${raw.length}`);
}
if (!copied.equals(raw)) {
  fail(`copied output ${outputPath} does not match ${sourcePath} byte-for-byte`);
}
