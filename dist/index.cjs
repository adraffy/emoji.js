'use strict';

const TAG_REGEX = "[󠀠-󠁾]+󠁿";
const RI_REGEX = "[🇦-🇿]";
const EMOD_REGEX = "[🏻-🏿]";
const EMOJI_DATA = "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";
const RGI_TAG_SEQS = [
	"🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	"🏴󠁧󠁢󠁷󠁬󠁳󠁿"
];

const fcp = String.fromCodePoint.bind(String);

function regex_escape(cp) {
	return cp < 0x80 ? `\\x${cp.toString(16).padStart(2, '0')}` : fcp(cp);	
}

function regex_range(a, b) {
	return a == b ? regex_escape(a) : `${regex_escape(a)}-${regex_escape(b)}`;
}

function remove_fe0f(s) {
	return s.replaceAll('\uFE0F', '');
}

function bit_reader_from_b64(encoded) {
	return bit_reader_from_bytes(Array.from(atob(encoded), c => c.charCodeAt(0)));
}
function bit_reader_from_bytes(v) {
	let w = 0;
	let r;
	return () => {
		if (!w) {
			r = v.pop()|0;
			w = 8;
		}
		let b = r&1;
		r >>= 1;
		--w;
		return b;
	};
}

function decode_uint(next) {
	let w = 0;
	while (next()) w++;
	let x = 0;
	while (w--) x = (x << 1) | next();
	return x
}
function decode_uint_sorted(next) {
	let sorted = [];
	let prev = 0;
	while (true) {
		let dx = decode_uint(next);
		let n = decode_uint(next);
		if (n == 0) break;
		prev += dx;
		for (let i = 0; i < n; i++) {
			sorted.push(prev++);
		}
		prev++;
	}
	return sorted;
} 
function decode_emojis(next, fn) {
	let ret = [];
	expand(decode([]), []);
	return ret; 
	function decode(Q) { 
		let V = next();
		let S = next();
		let C = next();
		let B = [];
		while (true) {
			let cps = decode_uint_sorted(next);
			if (!cps.length) break;
			B.push(decode(cps));
		}
		return {V, S, C, B, Q};
	}
	function expand({V, S, C, B}, cps, saved) {
		if (C && saved === cps[cps.length-1]) return;
		if (S) saved = cps[cps.length-1];
		if (V) ret.push(cps.map(fn)); 
		for (let br of B) {
			for (let cp of br.Q) {
				expand(br, [...cps, cp], saved);
			}
		}
	}
}

function find_runs(sorted, dx) {
	let runs = [];
	for (let i = 0, e = sorted.length; i < e; ) {
		let start = i;
		let first = sorted[i];
		for (let x = first; ++i < sorted.length && sorted[i] === (x += dx); ) {}
		runs.push([first, i-start]);
	}
	return runs;
}

let next = bit_reader_from_b64(EMOJI_DATA);
const EMOJI_CPS = decode_uint_sorted(next);
let replace = [0x200D, 0xFE0F, ...EMOJI_CPS, 0x20E3];
let upgrade_map = new Map();
const RGI_EMOJI = [];
decode_emojis(next, i => replace[i]).forEach(v => add(fcp(...v)));
RGI_TAG_SEQS.map(add);
RGI_EMOJI.sort((a, b) => {
	let aa = remove_fe0f(a);
	let bb = remove_fe0f(b);
	let c = aa.length - bb.length;
	if (c == 0) c = a > b;
	return c;
});
function add(emoji) {
	let strip = remove_fe0f(emoji);
	if (emoji !== strip) upgrade_map.set(strip, emoji);
	RGI_EMOJI.push(emoji);
}

// https://www.unicode.org/reports/tr51/#EBNF_and_Regex
/*
\p{RI} \p{RI} 
| \p{Emoji} 
  ( \p{EMod} 
  | \x{FE0F} \x{20E3}? 
  | [\x{E0020}-\x{E007E}]+ \x{E007F}
  )?
  (\x{200D}
    ( \p{RI} \p{RI}
    | \p{Emoji}
      ( \p{EMod} 
      | \x{FE0F} \x{20E3}? 
      | [\x{E0020}-\x{E007E}]+ \x{E007F}
      )?
    )
  )*
*/
//const ZWJ_ELEMENT = `(${RI_REGEX}{1,2}|[${emoji_runs.map(([x, n]) => regex_range(x, x+n-1)).join('')}](?:${EMOD_REGEX}|\uFE0F\u20E3?|${TAG_REGEX})?)`;

// 20230514: RI_REGEX{2} => RI_REGEX{1,2}
// 20230514: allow arbitrary FE0F, \uFE0F\u20E3? => \u20E3
const ZWJ_ELEMENT = `(${RI_REGEX}{1,2}|[${find_runs(EMOJI_CPS, 1).map(([x, n]) => regex_range(x, x+n-1)).join('')}]\uFE0F*(?:(?:${EMOD_REGEX}|\u20E3|${TAG_REGEX})\uFE0F*)?)`;

const POSSIBLE_REGEX = new RegExp(`${ZWJ_ELEMENT}(?:\u200D${ZWJ_ELEMENT})*\uFE0E*`, 'gmu');

// emoji are sorted so reversed will match longest sequence first
const RGI_REGEX = new RegExp([...RGI_EMOJI].reverse().map(s => s.replaceAll('*', '\\*').replaceAll('\uFE0F', '\uFE0F?')).join('|'), 'mu');

// frozen prevents iteration
// is this a bug? TypeError: Cannot assign to read only property 'lastIndex' of object '[object RegExp]'
//Object.freeze(RGI_REGEX);
//Object.freeze(POSSIBLE_REGEX);

// prevent mutation
Object.freeze(RGI_EMOJI);

// if single RGI emoji, return upgraded
function qualifize(emoji) {
	let match = emoji.match(RGI_REGEX);
	if (match && match.index === 0) {
		let rest = emoji.slice(match[0].length);
		if (rest.match(/^[\uFE0E\uFE0F]*$/u)) { // allow arbitrary final styling
			return upgrade_map.get(remove_fe0f(match[0])) || emoji;
		}
	}
}

function tokenize(input) {
	let tokens = [];
	let prev = 0;
	for (let match of input.matchAll(POSSIBLE_REGEX)) {
		let {index} = match;
		if (index) {
			tokens.push({index: prev, text: input.slice(prev, index)});
		}
		let emoji = match[0];
		prev = index + emoji.length;
		//while (input.charCodeAt(prev) === 0xFE0E) prev++; // eat text-styling
		let token = {
			index,
			emoji: input.slice(index, prev),
		};
		let norm = qualifize(emoji);
		if (norm) token.RGI = norm;
		tokens.push(token);
	}
	if (prev < input.length) {
		tokens.push({index: prev, text: input.slice(prev)});
	}
	return tokens;
}

// this is trivial
/*
export function strip_emoji(input) {
	return input.replaceAll(POSSIBLE_REGEX, '');
}
*/

exports.POSSIBLE_REGEX = POSSIBLE_REGEX;
exports.RGI_EMOJI = RGI_EMOJI;
exports.RGI_REGEX = RGI_REGEX;
exports.qualifize = qualifize;
exports.tokenize = tokenize;
