import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {readFileSync, lstatSync} from 'node:fs';

export class Spec {
	constructor (dir) {
		if (!lstatSync(dir, {throwIfNoEntry: false})?.isDirectory) {
			dir = fileURLToPath(new URL(dir, import.meta.url));
		}
		this.dir = dir;
		this.version = JSON.parse(readFileSync(join(dir, 'version.json')));
		this.version.date = new Date(this.version.date);
		this.data = read_data_file(join(dir, 'emoji-data.txt'));
		this.seq = read_seq_file(join(dir, 'emoji-sequences.txt'));
		this.zwj = read_seq_file(join(dir, 'emoji-zwj-sequences.txt'));
	}
	get props() {
		return read_prop_file(join(this.dir, 'PropList.txt'));
	}
	get tests() {
		return read_test_file(join(this.dir, 'emoji-test.txt'));
	}
	toJSON() {
		let {dir, ...rest} = this;
		return rest;
	}
}

export function read_data_file(file) {
	// 0023 ; Emoji # E0.0 [1] (#️) hash sign
	let map = {};
	parse_semicolon_file(file, ([hex, type]) => {
		if (!type) return;
		let bucket = map[type];
		if (!bucket) map[type] = bucket = [];
		parse_hex_span(hex).forEach(cp => bucket.push(cp));
	});
	for (let v of Object.values(map)) v.sort((a, b) => a - b);
	return map;
}

export function read_seq_file(file) {
	// 231A..231B ; Basic_Emoji ; watch..hourglass done # E0.6 [2] (⌚..⌛)
	// 1F468 200D 1F469 200D 1F466 ; RGI_Emoji_ZWJ_Sequence ; family: man, woman, boy # E2.0 [1] (👨‍👩‍👦)
	let map = {};
	parse_semicolon_file(file, ([hex, type, name], comment) => {
		if (!type) return;
		name = name.replace(/\\x{([0-9a-f]+)}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16))); // keycap: \x{23}
		let match;
		let version;
		if (match = comment.match(/^E([\d.]+)/)) version = match[1];
		let bucket = map[type];
		if (!bucket) map[type] = bucket = [];
		if (match = try_parse_hex_span(hex)) {
			let [min, max] = match;
			let [first, last] = name.split('..');
			for (let cp = min; cp <= max; cp++) {
				let name;
				if (cp === min) name = first;
				if (cp === max) name = last;
				bucket.push({cps: [cp], form: String.fromCodePoint(cp), name, version});
			}
		} else {
			let cps = hex.split(/\s+/).map(parse_hex_cp);
			bucket.push({cps, form: String.fromCodePoint(...cps), name, version});
		}
	});
	return map;
}

export function read_test_file(file) {
	// # subgroup: face-smiling
	// 1F600 ; fully-qualified # 😀 E1.0 grinning face
	let ret = [];
	let subgroup;
	parse_semicolon_file(file, ([hex, type], comment) => {
		if (!type) {
			let match = comment.match(/^subgroup:(.*)$/);
			if (match) {
				subgroup = match[1];
			}
			return;
		}
		let cps = hex.split(/\s+/).map(parse_hex_cp);
		let match = comment.match(/E(\d+.\d+) (.*)$/);
		if (!match) throw new Error(`bad comment`);
		ret.push({
			cps, subgroup, type,
			form: String.fromCodePoint(...cps),
			version: match[1],
			name: match[2],
		});
	});
	return ret;
}

export function read_prop_file(file) {
	// 0009..000D ; White_Space # Cc [5] <control-0009>..<control-000D>
	let map = {};
	parse_semicolon_file(file, ([hex, name], comment) => {
		if (!name) return;
		let bucket = map[name];
		if (!bucket) map[name] = bucket = [];
		parse_hex_span(hex).forEach(cp => bucket.push(cp));
	});
	for (let v of Object.values(map)) v.sort((a, b) => a - b);
	return map;
}

function parse_hex_cp(hex) {
	if (!/^[0-9a-f]+$/i.test(hex)) {
		throw new TypeError(`expected hex "${hex}"`);
	}
	return parseInt(hex, 16);
}

function parse_hex_span(hex) {
	let match = try_parse_hex_span(hex);
	if (match) {
		let [min, max] = match;
		return Array.from({length: 1+max-min}, (_, i) => i+min);
	} else {
		return [parse_hex_cp(hex)];
	}
}

function try_parse_hex_span(hex) {
	let match = hex.match(/^([0-9a-f]+)\.\.([0-9a-f]+)$/i);
	if (match) {
		let min = parseInt(match[1], 16); // parse_hex_cp
		let max = parseInt(match[2], 16);
		return [min, max];
	}
}

function parse_semicolon_file(file, handler) {
	let index = 0;
	for (let line of readFileSync(file, {encoding: 'utf8'}).split('\n')) {
		++index;
		let comment = '';
		let pos = line.indexOf('#');
		if (pos >= 0) {
			comment = line.slice(pos + 1).trim();
			line = line.slice(0, pos);
		}
		line = line.trim();
		let args = line ? line.split(';').map(s => s.trim()) : [];
		try {
			handler(args, comment, line, index, file);
		} catch (err) {
			console.log(`Error parsing: ${file}`);
			console.log(`Line #${index}: ${line}`);
			throw err;
		}
	}
}
