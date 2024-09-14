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
// 20230902: allow digits{FE0F} but not digits
const ZWJ_ELEMENT = `(${RI_REGEX}{1,2}|([\*\#0-9]\uFE0F|[${find_runs(EMOJI_CPS.filter(x => x > 0x39), 1).map(([x, n]) => regex_range(x, x+n-1)).join('')}])\uFE0F*(?:(?:${EMOD_REGEX}|\u20E3|${TAG_REGEX})\uFE0F*)?)`;

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
		if (prev < index) {
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

export { POSSIBLE_REGEX, RGI_EMOJI, RGI_REGEX, qualifize, tokenize };
