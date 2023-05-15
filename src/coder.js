export function bit_reader_from_b64(encoded) {
	let v = Array.from(atob(encoded), c => c.charCodeAt(0));
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

export function flatten_runs(runs) {
	return runs.flatMap(([x, n]) => Array.from({length: n}, (_, i) => x+i));
}

export function runs_from_b64(encoded) {
	let runs = [];
	let next = bit_reader_from_b64(encoded);
	let prev = -1;
	while (true) {
		let dx = read_pos_int(next);
		if (!dx) break;
		let n = read_pos_int(next);
		runs.push([prev += dx, n]);
		prev += n;
	}
	return runs;
}

export function seq_from_b64(encoded) {
	let seq = [];
	let next = bit_reader_from_b64(encoded);
	let prev = -1;
	while (true) {
		let dx = read_pos_int(next);
		if (!dx) break;
		prev += to_signed(dx);
		let n = read_pos_int(next);
		while (n--) seq.push(prev);
	}
	return seq;
}

export function read_pos_int(next) {
	let w = 0;
	while (next()) w++;
	let x = 0;
	while (w--) x = (x << 1) | next();
	return x
}

export function find_runs(sorted, dx = 1) {
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

export function encode_seq(values) {
	let enc = new Encoder();
	let prev = -1;
	for (let [x, n] of find_runs(values, 0)) {
		enc.write_pos_int(from_signed(x - prev));
		enc.write_pos_int(n);
		prev = x;
	}
	return enc;
}

export function encode_sorted(sorted) {
	let enc = new Encoder();
	let prev = -1;
	for (let [x, n] of find_runs(sorted)) {
		enc.write_pos_int(x - prev);
		enc.write_pos_int(n);
		prev = x + n;
	}
	return enc;
}


export class Encoder {
	constructor() {
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
		return this.encoded.toString('base64');
	}
	get encoded() {
		this.flush();
		return Buffer.from([...this.bytes].reverse().map(flip_byte)); // write backwards
	}
	write_pos_int(x) {
		if (!Number.isInteger(x) || x <= 0 || x >= 0xFFFFFFF) throw new TypeError(`bad int ${x}`);
		let w = 32 - Math.clz32(x);
		for (let i = 0; i < w; i++) this.write_bit(1);
		this.write_bit(0);
		while (w > 0) this.write_bit(x & (1 << --w));
	}
}



