import {RI_REGEX, EMOD_REGEX, TAG_REGEX, EMOJI_DATA, RGI_SOLO, RGI_DATA, RGI_TAG_SEQS} from './include.js';
import {runs_from_b64, seq_from_b64, flatten_runs} from './coder.js';
import {fcp, regex_range} from './utils.js';

let emoji_runs = runs_from_b64(EMOJI_DATA);
let replace = [0xFE0F, 0x200D].concat(flatten_runs(emoji_runs), [0x20E3]);
export const RGI_EMOJI = flatten_runs(runs_from_b64(RGI_SOLO)).map(cp => fcp(cp));
for (let m of RGI_DATA) {
	m = m.map(seq_from_b64);
	m[0].map((_, i) => RGI_EMOJI.push(fcp(...m.map(v => replace[v[i]]))));
}
Object.freeze(RGI_EMOJI);

const ZWJ_ELEMENT = `(${RI_REGEX}{2}|[${emoji_runs.map(([x, n]) => regex_range(x, x+n-1)).join('')}](?:${EMOD_REGEX}|\uFE0F\u20E3?|${TAG_REGEX})?)`;

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
export const POSSIBLE_REGEX = new RegExp(`${ZWJ_ELEMENT}(?:\u200D${ZWJ_ELEMENT})*`, 'mu');

// emoji are sorted so reversed will match longest sequence first
export const RGI_REGEX = new RegExp([...RGI_EMOJI].reverse().map(s => s.replace('*', '\\*').replaceAll('\uFE0F', '\uFE0F?')).join('|'), 'mu');
