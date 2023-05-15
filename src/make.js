import {SPEC} from './spec.js';
import {encode_sorted, encode_seq} from './coder.js';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {regex_escape, regex_range, compare_arrays, explode_cps} from './utils.js';

/*
console.log(Object.keys(SPEC.data));
console.log(Object.keys(SPEC.seq));
console.log(Object.keys(SPEC.zwj));
*/

const OUT_DIR = fileURLToPath(new URL('.', import.meta.url));

const RI = SPEC.prop.Regional_Indicator;
const EMOD = SPEC.data.Emoji_Modifier;
const TAG_START = 0xE0020;
const TAG_END = 0xE007F;

assert(is_linear_span(RI));
assert(is_linear_span(EMOD));
function is_linear_span(v) {
	let x0 = v[0];
	return !v.length || v.every((x, i) => x - x0 === i);
}

// 20230514: it's kinda shitty that "1F3FB..1F3FF" are considered RGI emoji (currently EMOD)

// collect RGI emoji
let rgi = [];
let rgi_tags = [];
for (let [name, seqs] of [...Object.entries(SPEC.seq), ...Object.entries(SPEC.zwj)]) {	
	console.log(String(seqs.length).padStart(6), name);
	for (let seq of seqs) {
		if (seq.cps.some(x => x >= TAG_START && x <= TAG_END)) {
			rgi_tags.push(seq.form);
		} else {
			rgi.push(seq.cps);
		}
	}
}
rgi.sort(compare_arrays);

// emoji character -> index
let index_map = new Map();
function add(cp) {
	index_map.set(cp, index_map.size);
}
add(0xFE0F); // common
add(0x200D);
SPEC.data.Emoji.forEach(add);
add(0x20E3); // rare

// encode single emoji (unique-sorted)
let enc_rgi1 = encode_sorted(rgi.flatMap(v => v.length == 1 ? v[0] : [])).b64;

// encode sequences
let enc_rgiN = [...new Set(rgi.map(v => v.length))].filter(x => x > 1).sort((a, b) => a - b).map(w => {
	let chunk = rgi.filter(v => v.length === w).map(v => v.map(cp => index_map.get(cp)));
	let chunkT = Array.from({length: w}, (_, i) => chunk.map(v => v[i])); // transpose
	return chunkT.map(v => encode_seq(v).b64);
});

// size estimation
console.log(`Size: ${enc_rgiN.flat().reduce((a, x) => a + x.length, 0)}`);

writeFileSync(join(OUT_DIR, 'include.js'), [
	//export_var('FE0F', 0xFE0F),
	//export_var('ZWJ', 0x200D),
	//export_var('KEYCAP', 0x20E3),
	export_var('UNICODE_VERSION', SPEC.version.unicode),
	export_var('BUILT', new Date()),
	export_var('TAG_REGEX', `[${regex_range(TAG_START, TAG_END-1)}]+${regex_escape(TAG_END)}`),
	export_var('RI_REGEX', `[${regex_range(RI[0], RI.at(-1))}]`),
	export_var('EMOD_REGEX', `[${regex_range(EMOD[0], EMOD.at(-1))}]`),
	export_var('EMOJI_DATA', encode_sorted(SPEC.data.Emoji).b64),
	export_var(`RGI_SOLO`, enc_rgi1),
	export_var(`RGI_DATA`, enc_rgiN),
	export_var(`RGI_TAG_SEQS`, rgi_tags),
].join('\n'));

function export_var(name, x) {
	let value;
	if (Number.isInteger(x)) {
		let dec = x.toString();
		let hex = '0x' + x.toString(16);
		value = dec.length < hex.length ? dec : hex;
	} else {
		value = JSON.stringify(x, null, '\t');
	}
	return `export const ${name} = ${value};`;
}
