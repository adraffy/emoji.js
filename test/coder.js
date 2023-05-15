import {
	encode_seq, seq_from_b64,
	encode_sorted, runs_from_b64, flatten_runs,
} from '../src/coder.js';
import {compare_arrays} from '../src/utils.js';
import assert from 'node:assert/strict';

// TODO: add more tests

function rng_int(n) {
	return Math.random()*n|0
}
function rng_array(max, len) {
	return Array.from({length: len ?? rng_int(1024)}, () => rng_int(max));
}

for (let i = 0; i < 1_000; i++) {
	let v0 = rng_array(1000);
	let v1 = seq_from_b64(encode_seq(v0).b64);
	if (compare_arrays(v0, v1)) {
		console.log({v0, v1});
		throw 1;
	}
}
console.log(`OK seq`);

for (let i = 0; i < 10_000; i++) {
	let v0 = [...new Set(rng_array(64))].sort((a, b) => a - b);
	let runs = runs_from_b64(encode_sorted(v0).b64);
	let v1 = flatten_runs(runs);
	if (compare_arrays(v0, v1)) {
		console.log({v0, v1, runs});
		throw 1;
	}
}
console.log('OK runs');

