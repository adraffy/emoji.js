import {EmojiNode} from './emoji-node.js';
import {unique_sorted} from './utils.js';

export const MAX_UINT = 0x7FFFFFFF;

export function bit_reader_from_b64(encoded) {
	return bit_reader_from_bytes(Array.from(atob(encoded), c => c.charCodeAt(0)));
}
export function bit_reader_from_bytes(v) {
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

export function from_signed(x) {
	return (x < 0) ? ~(x << 1) : (x << 1)
}
export function to_signed(x) {
	return (x & 1) ? (~x >> 1) : (x >> 1);
}

export function decode_uint(next) {
	let w = 0;
	while (next()) w++;
	let x = 0;
	while (w--) x = (x << 1) | next();
	return x
}
export function decode_uint_sorted(next) {
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
export function decode_emojis(next, fn) {
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

export function find_runs(sorted, dx) {
	let runs = [];
	for (let i = 0, e = sorted.length; i < e; ) {
		let start = i;
		let first = sorted[i];
		for (let x = first; ++i < sorted.length && sorted[i] === (x += dx); ) {}
		runs.push([first, i-start]);
	}
	return runs;
}

export function flip_byte(x) {
	x = (x & 0xF0) >> 4 | (x & 0x0F) << 4;
	x = (x & 0xCC) >> 2 | (x & 0x33) << 2;
	x = (x & 0xAA) >> 1 | (x & 0x55) << 1;
	return x;
}

export class Encoder {
	constructor() {
		this.reset();
	}
	reset() {
		this.value = 0;
		this.width = 0;
		this.bytes = [];
	}
	write_bit(x) {
		let {value, width} = this;
		value = (value << 1) | !!x;
		width++;
		if (width == 8) {
			this.bytes.push(value);
			value = 0;
			width = 0;
		}
		this.value = value;
		this.width = width;
	}
	flush() {
		while (this.width) this.write_bit(0);
	}
	get b64() {
		return Buffer.from(this.encoded).toString('base64');
	}
	get encoded() {
		this.flush();
		return [...this.bytes].reverse().map(flip_byte); // write backwards
	}
	get reader() {
		return bit_reader_from_bytes(this.encoded);
	}
	write_uint(x) {
		if (!Number.isInteger(x) || x < 0 || x >= MAX_UINT) throw new TypeError(`bad uint ${x}`);
		let w = 32 - Math.clz32(x);
		for (let i = 0; i < w; i++) this.write_bit(1);
		this.write_bit(0);
		while (w > 0) this.write_bit(x & (1 << --w));
	}
	write_uint_sorted(v) {
		 v = unique_sorted(v);
		 let prev = 0;
		 for (let [x, n] of find_runs(v, 1)) {
			 this.write_uint(x - prev);
			 this.write_uint(n);
			 prev = x + n + 1;
		 }
		 this.write_uint(0);
		 this.write_uint(0);
	}
	write_emojis(m, fn) {
		this.write_emoji_node(EmojiNode.from(m), fn);
	}
	write_emoji_node(node, fn) {
		this.write_bit(node.valid);
		this.write_bit(node.save_mod);
		this.write_bit(node.check_mod);
		for (let [keys, x] of Object.entries(node.branches)) {
			this.write_uint_sorted(keys.split(',').map(k => fn(parseInt(k))));
			this.write_emoji_node(x, fn);
		}
		this.write_uint_sorted([]);
	}
}



