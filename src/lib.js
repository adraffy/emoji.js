import {RI_REGEX, EMOD_REGEX, TAG_REGEX, EMOJI_DATA, RGI_TAG_SEQS} from './include.js';
import {bit_reader_from_b64, decode_uint_sorted, decode_emojis, find_runs} from './coder.js';
import {fcp, regex_range, remove_fe0f} from './utils.js';

let next = bit_reader_from_b64(EMOJI_DATA);
const EMOJI_CPS = decode_uint_sorted(next);
let replace = [0x200D, 0xFE0F, ...EMOJI_CPS, 0x20E3];
let upgrade_map = new Map();
export const RGI_EMOJI = [];
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

export const POSSIBLE_REGEX = new RegExp(`${ZWJ_ELEMENT}(?:\u200D${ZWJ_ELEMENT})*\uFE0E*`, 'gmu');

// emoji are sorted so reversed will match longest sequence first
export const RGI_REGEX = new RegExp([...RGI_EMOJI].reverse().map(s => s.replaceAll('*', '\\*').replaceAll('\uFE0F', '\uFE0F?')).join('|'), 'mu');

// frozen prevents iteration
// is this a bug? TypeError: Cannot assign to read only property 'lastIndex' of object '[object RegExp]'
//Object.freeze(RGI_REGEX);
//Object.freeze(POSSIBLE_REGEX);

// prevent mutation
Object.freeze(RGI_EMOJI);

// if single RGI emoji, return upgraded
export function qualifize(emoji) {
	let match = emoji.match(RGI_REGEX);
	if (match && match.index === 0) {
		let rest = emoji.slice(match[0].length);
		if (rest.match(/^[\uFE0E\uFE0F]*$/u)) { // allow arbitrary final styling
			return upgrade_map.get(remove_fe0f(match[0])) || emoji;
		}
	}
}

export function tokenize(input) {
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
