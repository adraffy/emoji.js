import {Spec} from './unicode.js';

// 20230514: it's kinda shitty that "1F3FB..1F3FF" are considered RGI emoji (currently EMOD)

// the Unicode version used by the library
// download others with download.js

// 20230902: upgrade to 15.1 (beta)
export const SPEC = new Spec('15.1.0'); 
