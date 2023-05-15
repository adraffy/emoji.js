import {RGI_REGEX, RGI_EMOJI, POSSIBLE_REGEX} from '../src/lib.js';

console.log('abc 💩\u200D💩 xyz'.match(POSSIBLE_REGEX)); // \u200D💩

console.log('abc 👁️‍🗨️ xyz'.match(RGI_REGEX));

console.log(RGI_EMOJI);
console.log(RGI_EMOJI.length);
