import {Encoder, decode_uint, decode_uint_sorted, decode_emojis} from '../src/coder.js';
import {compare_arrays, unique_sorted} from '../src/utils.js';

function rng_int(n) {
	return Math.random()*n|0
}
function rng_array(max, len) {
	return Array.from({length: len ?? rng_int(1024)}, () => rng_int(max));
}

let enc = new Encoder();
let bits = Array.from({length: 100000}, () => Math.round(Math.random()))
bits.forEach(x => enc.write_bit(x));
for (let next = enc.reader, i = 0; i < bits.length; i++) {
	if (next() !== bits[i]) {
		throw 1;
	}
}
console.log('OK bits');

for (let i = 0; i < 0x11000; i++) {
	enc.reset();
	enc.write_uint(i);
	let j = decode_uint(enc.reader);
	if (i !== j) {
		console.log({i, j});
		throw 1;
	}
}
console.log('OK uint');

for (let i = 0; i < 1_000; i++) {
	let v0 = unique_sorted(rng_array());
	enc.reset();	
	enc.write_uint_sorted(v0);
	let v1 = decode_uint_sorted(enc.reader);
	if (compare_arrays(v0, v1)) {
		console.log({v0, v1});
		throw 1;
	}
}
console.log('OK sorted');

for (let id = x => x, i = 0; i < 100; i++) {
	let m0 = Array.from({length: 500}, () => rng_array(20, 1+rng_int(10)));
	m0 = Array.from(new Map(m0.map(x => [JSON.stringify(x), x])).values()).sort(compare_arrays); // dedup
	enc.reset();
	enc.write_emojis(m0, id);
	let m1 = decode_emojis(enc.reader, id).sort(compare_arrays);
	if (JSON.stringify(m0) !== JSON.stringify(m1)) {
		console.log({m0, m1});
		throw 1;
	}
}
console.log('OK emoji');

