const TAG_REGEX = "[󠀠-󠁾]+󠁿";
const RI_REGEX = "[🇦-🇿]";
const EMOD_REGEX = "[🏻-🏿]";
const EMOJI_DATA = "l/eXl3eL+9df95fu3h3+df9V99f7F/6XN+O/1eu7XbtXl9rF9di/hv2r+3u63pe2r2L9m/dey9Yvq129ZerLrpvF619xv1vr/394L/3a8r+vdWsO/rRfur/XV+XrpX719dW/pf1euu9ZvWCv+qb/qte3//7bNL/6b6tl/+l7m/Xl/fnf9Zdf+u+u+y/Yb9evt2XtpervvWr63u63ttq7W66ul6svW9dZX121derXXXr1l1rtde121ul9a6l+1dq168317bX2L17u6tdq6Xq1rq7L69Lrv7L6r187/vG/9l9fN+sr/pvX7X/X7261/rX6Nv+m+2P3/+l77f1fXrekvw==";
const RGI_SOLO = "Jf3l5d3i/vXX/eX7t4d/nX/VffX+xf+lzfjv+X9168uX2ve63Yv4b+q/tX+29a36l8b9L2/9+vdf9t4v+7uL5vrl9X5va/WL/Zeb4X7q/11f3a66V+jfrN/V66+v+qb/rqR3//6Xub9e1v/rvo393v7dl7bi/p31l73q6XtX3tX7XovXXXF9YvtvuX7q/N6b9dX1yC/+ruy9m/17GL//";
const RGI_DATA = [
	[
		"rrrrrrrrrrrrrrrrrhv666667W/66666666666666666666666665euuuuuS/rl6665euuuff64d/rrrt66666666666666666665X67vrrrrrrrrrrrrrrrpfrt67r+rrerq6urq6utfq6urrrpvrlfrrrrrov64l/rrrrrrrrri+uuuuu0v+rq6urq6urq6urq6urq6urq6urpeuuutuurq6urq666urq6tutuurq6u/q6Av+sr/rpv65euF+uuuuuXrrrrrq+uL666666666666666665euuuuuuuXrrrrrrrmv6666666666666666666667euuuul6Ev+rpekv6urq6urq6urq6urpvq6tutuuu3rt666667F/q6urq6urr364X64v+lfq6urq6urq6urrl/oX6X2ta6ta+6+64vrq+uuurd66s3r6+vXr16y69etuvL6265evusr66vri+N+rq6ut6urq6r6urq6ut6L6uu+rq6ul6urq6urq262666666ul63brq6Xrerpel6urpeq+rrel6urq6urq6ul6Xq6urq6urq6t+rq6urq6urq6urq6tuut6urq6urq63q6urq6urq6urperperq6r6ut6urq6urq6urq6urq6uvf",
		"Crq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urverq6urrHv/N9nv/q6urq6x7/7Z7/6urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6use/8r9nv/q6urq73q6urq73q6urq6x7/29nv/q6urq6x7/y9nv/q6urq6x7/7Z7/6urq6use//vZ7/6urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6use//L9nv/q6urq6x7/7Z7/6urq6use/+2e/+rq6urverq6urverq6urverq6urverq6urrHv/72e/+rq6urrHv/d97f+lfo37S/r37r776t+3frvqvpel6Xpexv6um+q+rpvpvsb+t6ul6Xrerq6urq6Xq6ul6ul7G/q6ul6Xq6ut6urq6urq6urperq6urur+l6XovpX6L76/pet6urovq6urrerq6ui+9fs36r63perret6Xq6ul6Xsb+rq6urq6urq6urq6urq6ut6urq6urpe+v63q6urq676Xpvq6uxv6ul6r6Xperovq6ul7V+rpehft36urq6Xq6urrvq6u4v6ul6L6ul7t+l6Xq6urq6ul6urrerq6urq6Xq7C/rel6Xq6u9fq6urpX6ul6Xpexv61+l6Xq63peyv6urq6urrel6urq6urperq6ul6ul7G/q6Xq6Xq6urperq6ul6urq6urq6Xq7G/perperq6urpel6ut6Xq6urq603/W/Z7/6urq6use/+2e/+rq6urrHv/tnv/q6urq73q6urq6x7/92e/+rq6urrHv/1f2e/+rq6urrHv/Ffr"
	],
	[
		"a+Kr/676Mr/+vr6+Qv+ov6t+se/+rq6urq6urq6urq63",
		"Akv6zes=",
		"Kupfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo369+hfqX6rf7Jr/63vKX/6upfq6urq6oL/6S/o1f+q+lb/q6Kv+rpu/6XrC/6L6N+uv6l+q3+63f/q6l+rq6urqgv/pL+jV/6r6Vv+roq/6um7/pesL/ovo366/qX6rf6fv+wwv/6jC//uHL/83smv/w=="
	],
	[
		"Wta1rWta1rWta1rWXW3jv5da1rWK/Wtae/1rWtZda1rWXW99Za/1rWtaL9al/WtZdYvWta1vfpsv/WtYvWtZX1i9Zda1rWtavNv6zb+tf6Yv+rrl/Wb1rWUL/1qV/w==",
		"Gv6e/9r62vra+tr62vke/9i/6e/+r66vrq+ur66vke//env/q+ur66vrq+ur5Hv/rrtbrWs=",
		"Crtq7au2rtq7au2rtq7au2rtq60v92/1F/6pf6upv6u2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtzf+nN/6u2rtq7au2rtq7au2rtq7autL/lv9Rf+qX+rqm/5b/UX/ql/q7Lf6mv+oL/vS/6u2rtq60v9Zc=",
		"a/xy//q6l+rq6urqgv/pL+jV/6r6Vv+rrTf+l6wv+i+jfr36F+pfqt/ut3/6upfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo369+hfqX6rf7rd/+rqX6urq6uqC/+kv6NX/qvpW/6utN/6XrC/6L6N+vfoX6l+q3+63f/q6l+rq6urqgv/pL+jV/6r6Vv+rrTf+l6wv+i+jfr36F+pfqt/ut3/6upfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo369+hfqX6rf6dL/2L/xy//q6l+rq6urqgv/pL+jV/6r6Vv+rrTf+l6wv+i+jfrr+pfqt/ut3/6upfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo366/qX6rf7rd/+rqX6urq6uqC/+kv6NX/qvpW/6utN/6XrC/6L6N+uv6l+q3+63f/q6l+rq6urqgv/pL+jV/6r6Vv+rrTf+l6wv+i+jfrr+pfqt/ut3/6upfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo366/qX6rf6dL/98cv/6upfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo366/qX6rf7rd/+rqX6urq6uqC/+kv6NX/qvpW/6utN/6XrC/6L6N+uv6l+q3+63f/q6l+rq6urqgv/pL+jV/6r6Vv+rrTf+l6wv+i+jfrr+pfqt/ut3/6upfq6urq6oL/6S/o1f+q+lb/q603/pesL/ovo366/qX6rf7rd/+rqX6urq6uqC/+kv6NX/qvpW/6utN/6XrC/6L6N+uv6l+q3+nS/+vn3/pff9v9K//okX/6sN/8="
	],
	[
		"AK+YX/V61etXrV61etXrV61eXV7cL5dXrV61eK/V61env9XrV7dXrV61eXV731eWv9XrV61ei/V6l/V61eXV4vV61etXrb/N4bf9XrV4vV61eV9Xi9Xl1etXl1eryvra+5f6sv+qX83rN61eb1etXuS/83hF/w==",
		"ALrLrLrLrL91rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta199r2va9r2R7/7p7/1rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtbHv/XZ7/1rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta191rWta1rX3Wta1rWtfda1rWta199r2va9r2R7/6+nv/2va9r2vZHv/7rXZ7/1rWta1rWx7/12e/9a1rWta1se/9dnv/Wta1rWtfda1rWta191rWta1rX3Wta1rWtbHv/Ws=",
		"C+/yIv/6oi//ir//Jf/WXWurJf/9/yX/1rWta6sl/8i/lw==",
		"Cvnyv/6u2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7/f6pf6u6X+qX+rul/ql/q7pf6pf6u6X+qX+rqm/70v+rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7/f6pf6u6X+qX+rul/ql/q7pf6pf6u6X+qX+rqm/69Rf+qX+rul/ql/q7pf6pf6u6X+qX+rul/ql/q6pv/vJt/+h9f/qF/q7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rtq7au2rqy/w==",
		"Aq6urvel6urverperverq6Xverq6uie/+W/+8v/6Hy//ir/3Jf/q7atZyX//fcl/+rtq7atZyX/yL+s="
	],
	[
		"Ba6il/8=",
		"DZc=",
		"2pX/",
		"A2s=",
		"DZc=",
		"CrWil/8="
	],
	[
		"JvuVf/1frW+il/8=",
		"rrrrrrrrr9xesXrF6xesXke//env/LrLrLrLrLke/9uX",
		"Agv/yX/9gpf/K/8l//a9opf/",
		"gv6iL//ciL/8r6iL/9uX",
		"gv+yX/1rqyX/yv7Jf/Wu1a68l/8=",
		"m+5V/8usvS6y9LrL0usvS6y7yX/93Jf/K+8l/9uX",
		"q6urq73q6urq73q6urq73q6urq73q6urq7Xq6urterq6u96Xq6u96Xq6u96ul6u96ul6u96urpe96urpe96urq7Xq6urtW/6tYW/6urq73perq73q6Xq73q6ul73q6urtW/6tdq1vJf/"
	],
	[
		"CvuVf/LfrW+il/8=",
		"Aususususv3V61etXrV61eR7/16e/+uuuuuuuuuR7/6X",
		"GL/RX/WxX/m/RX/qlf8=",
		"Yv4lf9fFf+b4lf+r",
		"Bi/1a5v2lw==",
		"GL/jl/9ZOX/5v45f/ouX/w==",
		"Ar7lX/6669rrr2uuva669rrrvJf/Xcl/+b7yX/6X",
		"q6urvel6urverperverq6Xverq6u16urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u96urq6u7b/q6lv+rq6urverq6urverq6urverq6urverq6urs2/6il/8="
	],
	[
		"CvuVf/Tfrm+il/8=",
		"ALrLrLrLrL91etXrV61etX96666666664nv/",
		"Pr+X",
		"A+v6lf8=",
		"D6/r",
		"Pr+X",
		"Pr+Ll/8=",
		"Pr+X",
		"K+5V/+uuva669rrr2uuva63vopf/",
		"Crq6u96Xq6u96ul6u96urpe96urq7Xq6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq73q6urq6J7/w=="
	]
];
const RGI_TAG_SEQS = [
	"🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	"🏴󠁧󠁢󠁷󠁬󠁳󠁿"
];

function bit_reader_from_b64(encoded) {
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
function to_signed(x) {
	return (x & 1) ? (~x >> 1) : (x >> 1);
}

function flatten_runs(runs) {
	return runs.flatMap(([x, n]) => Array.from({length: n}, (_, i) => x+i));
}

function runs_from_b64(encoded) {
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

function seq_from_b64(encoded) {
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

function read_pos_int(next) {
	let w = 0;
	while (next()) w++;
	let x = 0;
	while (w--) x = (x << 1) | next();
	return x
}

const fcp = String.fromCodePoint.bind(String);

function regex_escape(cp) {
	return cp < 0x80 ? `\\x${cp.toString(16).padStart(2, '0')}` : fcp(cp);	
}

function regex_range(a, b) {
	return a == b ? regex_escape(a) : `${regex_escape(a)}-${regex_escape(b)}`;
}

function remove_fe0f(s) {
	return s.replaceAll('\uFE0F', '');
}

let emoji_runs = runs_from_b64(EMOJI_DATA);
let upgrade_map = new Map();
let replace = [0xFE0F, 0x200D].concat(flatten_runs(emoji_runs), [0x20E3]);
const RGI_EMOJI = flatten_runs(runs_from_b64(RGI_SOLO)).map(cp => fcp(cp));
for (let m of RGI_DATA) {
	m = m.map(seq_from_b64);
	m[0].map((_, i) => add(fcp(...m.map(v => replace[v[i]]))));
}
RGI_TAG_SEQS.map(add);
function add(emoji) {
	let strip = remove_fe0f(emoji);
	if (emoji !== strip) upgrade_map.set(strip, emoji);
	RGI_EMOJI.push(emoji);
}

// https://www.unicode.org/reports/tr51/#EBNF_and_Regex
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
//const ZWJ_ELEMENT = `(${RI_REGEX}{1,2}|[${emoji_runs.map(([x, n]) => regex_range(x, x+n-1)).join('')}](?:${EMOD_REGEX}|\uFE0F\u20E3?|${TAG_REGEX})?)`;
// change: RI_REGEX{2} => RI_REGEX{1,2}
// allow arbitrary FE0F
// change: \uFE0F\u20E3? => \u20E3
const ZWJ_ELEMENT = `(${RI_REGEX}{1,2}|[${emoji_runs.map(([x, n]) => regex_range(x, x+n-1)).join('')}]\uFE0F*(?:(?:${EMOD_REGEX}|\u20E3|${TAG_REGEX})\uFE0F*)?)`;
const POSSIBLE_REGEX = new RegExp(`${ZWJ_ELEMENT}(?:\u200D${ZWJ_ELEMENT})*`, 'gmu');

// emoji are sorted so reversed will match longest sequence first
const RGI_REGEX = new RegExp([...RGI_EMOJI].reverse().map(s => s.replace('*', '\\*').replaceAll('\uFE0F', '\uFE0F?')).join('|'), 'gmu');

// prevent mutation
Object.freeze(RGI_EMOJI);

// frozen prevents iteration
// is this a bug? TypeError: Cannot assign to read only property 'lastIndex' of object '[object RegExp]'
//Object.freeze(RGI_REGEX);
//Object.freeze(POSSIBLE_REGEX);

// this is trivial
/*
export function strip_emoji(input) {
	return input.replaceAll(POSSIBLE_REGEX, '');
}
*/

function qualifize(emoji) {
	let match = emoji.match(RGI_REGEX);
	if (match && match[0] === emoji) return upgrade_map.get(remove_fe0f(emoji)) || emoji;
}

function tokenize(input) {
	let tokens = [];
	let prev = 0;
	for (let match of input.matchAll(POSSIBLE_REGEX)) {
		let {index} = match;
		if (index) {
			tokens.push({index: prev, text: input.slice(prev, index)});
		}
		let emoji = match[0];
		prev = index + emoji.length;
		while (input.charCodeAt(prev) === 0xFE0E) prev++; // eat text-styling
		let token = {
			index,
			emoji: input.slice(index, prev),
		};
		let norm = qualifize(emoji);
		if (norm) token.RGI = norm;
		tokens.push(token);
	}
	if (prev < input.length) {
		tokens.push({index: prev, text: input.slice(prev)});
	}
	return tokens;
}

export { POSSIBLE_REGEX, RGI_EMOJI, RGI_REGEX, qualifize, tokenize };
