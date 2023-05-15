import {RI_REGEX, EMOD_REGEX, TAG_REGEX, EMOJI_DATA, RGI_SOLO, RGI_DATA, RGI_TAG_SEQS} from './include.js';
import {runs_from_b64, seq_from_b64, flatten_runs} from './coder.js';
import {fcp, regex_range, remove_fe0f} from './utils.js';

let emoji_runs = runs_from_b64(EMOJI_DATA);
let upgrade_map = new Map();
let replace = [0xFE0F, 0x200D].concat(flatten_runs(emoji_runs), [0x20E3]);
export const RGI_EMOJI = flatten_runs(runs_from_b64(RGI_SOLO)).map(cp => fcp(cp));
for (let m of RGI_DATA) {
	m = m.map(seq_from_b64);
	m[0].map((_, i) => add(fcp(...m.map(v => replace[v[i]]))));
}
RGI_TAG_SEQS.map(add);
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
// change: RI_REGEX{2} => RI_REGEX{1,2}
// allow arbitrary FE0F
// change: \uFE0F\u20E3? => \u20E3
const ZWJ_ELEMENT = `(${RI_REGEX}{1,2}|[${emoji_runs.map(([x, n]) => regex_range(x, x+n-1)).join('')}]\uFE0F*(?:(?:${EMOD_REGEX}|\u20E3|${TAG_REGEX})\uFE0F*)?)`;
export const POSSIBLE_REGEX = new RegExp(`${ZWJ_ELEMENT}(?:\u200D${ZWJ_ELEMENT})*`, 'gmu');

// emoji are sorted so reversed will match longest sequence first
export const RGI_REGEX = new RegExp([...RGI_EMOJI].reverse().map(s => s.replace('*', '\\*').replaceAll('\uFE0F', '\uFE0F?')).join('|'), 'gmu');

// prevent mutation
Object.freeze(RGI_EMOJI);

// frozen prevents iteration
// is this a bug? TypeError: Cannot assign to read only property 'lastIndex' of object '[object RegExp]'
//Object.freeze(RGI_REGEX);
//Object.freeze(POSSIBLE_REGEX);

// this is trivial
/*
export function strip_emoji(input) {
	return input.replaceAll(POSSIBLE_REGEX, '');
}
*/

export function qualifize(emoji) {
	let match = emoji.match(RGI_REGEX);
	if (match && match[0] === emoji) return upgrade_map.get(remove_fe0f(emoji)) || emoji;
}

export function tokenize(input) {
	let tokens = [];
	let prev = 0;
	for (let match of input.matchAll(POSSIBLE_REGEX)) {
		let {index} = match;
		if (index) {
			tokens.push({index: prev, text: input.slice(prev, index)});
		}
		let emoji = match[0];
		prev = index + emoji.length;
		while (input.charCodeAt(prev) === 0xFE0E) prev++; // eat text-styling
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
