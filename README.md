# emoji.js

0-dependency [UTS-51](https://www.unicode.org/reports/tr51/) Emoji Parser.

`npm i @adraffy/emoji` [&check;](https://www.npmjs.com/package/@adraffy/emoji)

* Unicode `16.0.0`
* Minified File Size: [`6KB`](./dist/index.min.js)
* ✅️ Passes **100%** [Unicode Emoji Tests](https://www.unicode.org/Public/emoji/16.0/emoji-test.txt)

[**Demo**](https://adraffy.github.io/emoji.js/test/demo.html) ⭐

```js
import {POSSIBLE_REGEX, RGI_REGEX, RGI_EMOJI} from '@adraffy/emoji';
// browser: https://cdn.jsdelivr.net/npm/@adraffy/emoji@latest/dist/index.min.js

// RegExp that matches UTS-51 "Possible" Emoji
// see: https://www.unicode.org/reports/tr51/#EBNF_and_Regex
// with some modifications:
// * matches 1-2 regional indicator instead of exactly 2
// * matches repeated inner/trailing FE0F
// * matches trailing FE0E
// * does NOT match isolated [#*0-9] w/o FE0F
let match = 'abc💩\u200D💩xyz'.match(POSSIBLE_REGEX);
// [
//   '💩‍💩',
//   '💩',
//   '💩',
//   index: 4,
//   input: 'abc 💩‍💩 xyz',
// ]

// RegExp that only matches RGI Emoji
// * FE0F are optional during matching
let match = 'abc👁️‍🗨️xyz'.match(RGI_REGEX);
// [
//   '👁️', 
//   index: 4, 
//   input: 'abc 👁️‍🗨️ 123'
// ]

// string[] of all **fully-qualified** RGI Emoji
// see: https://unicode.org/emoji/charts/full-emoji-list.html
console.log(RGI_EMOJI); 
// [ '⌚', '⌛', '⏩', ... ]
```

Split a string into tokens:
```js
// string -> Token[]
let tokens = tokenize('abc💩\uFE0Eabc💩\u200D💩abc');
// [
//   { index: 0, text: 'abc' },
//   { index: 3, emoji: '💩︎', RGI: '💩' },
//   { index: 6, text: 'abc' },
//   { index: 9, emoji: '💩‍💩' },
//   { index: 14, text: 'abc' }
// ]

// Usage examples:
//  Purge ALL Emoji: tokens.map(x => x.text || '').join('');
//  Keep Text & RGI: tokens.map(x => x.text || x.RGI || '').join('');
//   Upgrade to RGI: tokens.map(x => x.text || x.RGI || x.emoji).join('');
```

Convert an Emoji to fully-qualified RGI, if possible:
```Javascript
// string -> string?
qualifize('\u2639\uFE0F');       // "☹️" <2639 FE0F>
qualifize('\u2639\uFE0F\uFE0F'); // "☹️" <2639 FE0F>
qualifize('\u2639\uFE0E');       // "☹️" <2639 FE0F>
qualifize('\u2639');             // "☹️" <2639 FE0F>
qualifize('x');                  // undefined

// Note: qualifize(x) is truthy if x is RGI-able
// x === qualifize(x) iff x is fully-qualified RGI
```

## Build

* `git clone` this repo, then `npm install` 
* `node download <version>` — download [Unicode files](./src/15.0.0/)
	* Edit version in [`spec.js`](./src/spec.js)
* `npm run make`
	* Creates [`include.js`](./src/include.js) and [`data.json`](./dist/data.json)
* `npm run test`
* `npm run build` — create `/dist/`
