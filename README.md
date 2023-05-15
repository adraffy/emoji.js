# emoji.js

0-dependency [UTS-51](https://www.unicode.org/reports/tr51/) Emoji parser.

* Unicode `15.0.0`
* Minified File Size: [`8KB`](./dist/index.min.js)

```Javascript
import {POSSIBLE_REGEX, RGI_REGEX, RGI_EMOJI} from '@adraffy/emoji.js';
// npm i @adraffy/emoji
// browser: https://cdn.jsdelivr.net/npm/@adraffy/emoji@latest/dist/index.min.js

// RegExp that matches UTS-51 "Possible" Emoji
let match = 'abc💩\u200D💩xyz'.match(POSSIBLE_REGEX);
// [
//     '💩‍💩',
//     '💩',
//     '💩',
//     index: 4,
//     input: 'abc 💩‍💩 xyz',
// ]

// RegExp that only matches RGI Emoji
let match = 'abc👁️‍🗨️xyz'.match(RGI_REGEX);
// [
//     '👁️', 
//     index: 4, 
//     input: 'abc 👁️‍🗨️ 123'
// ]

// string[] of all RGI emoji
console.log(RGI_EMOJI);
// [ '⌚', '⌛', '⏩', ... ]
```

## Build

1. `node.js download 15` — download Unicode files
	* Creates [`src/15.0.0/`](./src/15.0.0/)
	* Edit version in [`make.js`](./src/make.js)
1. `npm run make`
	* Creates [`include.js`](../src/include.js)
1. `npm run test`
1. `npm run build` — create `/dist/`
