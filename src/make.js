import {SPEC} from './spec.js';
import {Encoder} from './coder.js';
import {writeFileSync} from 'node:fs';
import {regex_escape, regex_range, is_linear_span, unique_sorted} from './utils.js';

/*
console.log(Object.keys(SPEC.data));
console.log(Object.keys(SPEC.seq));
console.log(Object.keys(SPEC.zwj));
*/

const RI = SPEC.props.Regional_Indicator;
const EMOD = SPEC.data.Emoji_Modifier;
const TAG_START = 0xE0020;
const TAG_END = 0xE007F;

if (!is_linear_span(RI)) throw new Error(`RI not linear`);
if (!is_linear_span(EMOD)) throw new Error(`EMOD not linear`);

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

for (let cp of [0x200D, 0xFE0F, 0x20E3]) {
	console.log(cp.toString(16), rgi.reduce((a, v) => v.reduce((a, x) => a + +(x === cp), a), 0));
}

let sorted = unique_sorted(SPEC.data.Emoji);
let sorted_map = new Map([0x200D, 0xFE0F, ...sorted, 0x20E3].map((x, i) => [x, i]));

let enc = new Encoder();
enc.write_uint_sorted(sorted);
enc.write_emojis(rgi, cp => sorted_map.get(cp));

writeFileSync(new URL('./include.js', import.meta.url), [
	//export_var('FE0F', 0xFE0F),
	//export_var('ZWJ', 0x200D),
	//export_var('KEYCAP', 0x20E3),
	export_var('UNICODE_VERSION', SPEC.version.unicode),
	export_var('BUILT', new Date()),
	export_var('TAG_REGEX', `[${regex_range(TAG_START, TAG_END-1)}]+${regex_escape(TAG_END)}`),
	export_var('RI_REGEX', `[${regex_range(RI[0], RI.at(-1))}]`),
	export_var('EMOD_REGEX', `[${regex_range(EMOD[0], EMOD.at(-1))}]`),
	export_var(`EMOJI_DATA`, enc.b64),
	export_var(`RGI_TAG_SEQS`, rgi_tags),
].join('\n'));

writeFileSync(new URL('../dist/data.json', import.meta.url), JSON.stringify(SPEC, null, '\t'));

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
