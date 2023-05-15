import {RGI_EMOJI, RGI_REGEX, POSSIBLE_REGEX} from '../src/lib.js';
import assert from 'node:assert/strict';

// TODO: add more

for (let emoji of RGI_EMOJI) {
	assert.equal(emoji.match(POSSIBLE_REGEX)?.[0], emoji);
}
console.log('OK RGI are Possible');

for (let emoji of RGI_EMOJI) {
	assert.equal(emoji.match(RGI_REGEX)?.[0], emoji);
}
console.log('OK RGI are RGI');

for (let emoji of RGI_EMOJI) {
	assert.equal(emoji.match(RGI_REGEX)?.[0], emoji);
}
console.log('OK RGI w/o FE0F are RGI');

for (let emoji of RGI_EMOJI) {
	let zwj = `${emoji}\u200D${emoji}`;	
	assert.equal(zwj.match(POSSIBLE_REGEX)?.[0], zwj); // matches all
	assert.equal(zwj.match(RGI_REGEX)?.[0], emoji); // only matches first
}
console.log('OK RGI+ZWJ+RGI');
