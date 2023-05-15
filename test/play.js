import {RGI_REGEX, RGI_EMOJI, POSSIBLE_REGEX, tokenize, qualifize} from '../src/lib.js';

console.log('abc💩\u200D💩xyz'.match(POSSIBLE_REGEX));

console.log('abc👁️‍🗨️xyz'.match(RGI_REGEX));

console.log(tokenize('abc💩\uFE0Eabc💩\u200D💩abc'));

console.log(qualifize('☹️')); // 2639 FE0F 
console.log(qualifize('☹')); // 2639 FE0F 
console.log(qualifize('x')); // undefined


console.log(RGI_EMOJI);
console.log(`RGI Emoji Count: ${RGI_EMOJI.length}`);
console.log(`RGI Regex Size: ${RGI_REGEX.toString().length}`);
console.log(`Possible Regex Size: ${POSSIBLE_REGEX.toString().length}`);