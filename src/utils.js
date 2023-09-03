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

export function unique_sorted(v) {
	return Array.from(new Set(v)).sort((a, b) => a > b ? 1 : -1);
}

export function is_linear_span(v) {
	let x0 = v[0];
	return !v.length || v.every((x, i) => x - x0 === i);
}

export function remove_fe0f(s) {
	return s.replaceAll('\uFE0F', '');
}
