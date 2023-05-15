export const fcp = String.fromCodePoint.bind(String);

export function regex_escape(cp) {
	return cp < 0x80 ? `\\x${cp.toString(16).padStart(2, '0')}` : fcp(cp);	
}

export function regex_range(a, b) {
	return a == b ? regex_escape(a) : `${regex_escape(a)}-${regex_escape(b)}`;
}

export function explode_cps(s) {
	return Array.from(s, c => c.codePointAt(0));
}

export function compare_arrays(a, b) {
	let n = a.length;
	let c = n - b.length;
	for (let i = 0; c == 0 && i < n; i++) c = a[i] - b[i];
	return c;
}
