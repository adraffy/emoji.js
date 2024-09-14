import {Spec} from './unicode.js';


// the Unicode version used by the library
// download others with download.js

// 20230514: it's kinda shitty that "1F3FB..1F3FF" are considered RGI emoji (currently EMOD)
// 20230902: upgrade to 15.1
// 20240913: upgrade to 16.0
export const SPEC = new Spec('16.0.0'); 
