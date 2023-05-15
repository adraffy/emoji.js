import {fileURLToPath} from 'node:url';
import {join, basename} from 'node:path';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';

const BASE_DIR = fileURLToPath(new URL('.', import.meta.url));

let match = process.argv[2]?.match(/^(\d+)(?:.(\d+)(?:.(\d+))?)?$/);
if (!match) throw new Error(`expected version`);
const major = parseInt(match[1]);
const minor = parseInt(match[2])|0;
const patch = parseInt(match[3])|0;

let out_dir = join(BASE_DIR, `${major}.${minor}.${patch}`);
rmSync(out_dir, {recursive: true, force: true});
mkdirSync(out_dir, {recursive: true});

console.log({major, minor, patch, out_dir});

let mmp = `${major}.${minor}.${patch}`;
let mm = `${major}.${minor}`;

let urls = [
	`https://unicode.org/Public/${mmp}/ucd/emoji/emoji-data.txt`,
	`https://www.unicode.org/Public/${mmp}/ucd/PropList.txt`,
	`https://unicode.org/Public/emoji/${mm}/emoji-zwj-sequences.txt`,
	`https://unicode.org/Public/emoji/${mm}/emoji-sequences.txt`,
	`https://unicode.org/Public/emoji/${mm}/emoji-test.txt`,
];

for (let url of urls) {
	let res = await fetch(url);
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	let buf = Buffer.from(await res.arrayBuffer());
	writeFileSync(join(out_dir, basename(url)), buf);
	console.log(url);
}
let out_file = join(out_dir, 'version.json');
writeFileSync(out_file, JSON.stringify({unicode: mmp, major, minor, patch, date: new Date()}, null, '\t'));
console.log(out_file);
