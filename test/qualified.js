import {SPEC} from '../src/spec.js';
import {qualifize, RGI_REGEX} from '../src/lib.js';
import assert from 'node:assert/strict';

for (let test of SPEC.tests) {
	switch (test.type) {
		case 'fully-qualified': {
			assert.strictEqual(qualifize(test.form), test.form);
			continue;
		}
		case 'unqualified':
		case 'minimally-qualified': {
			let match = qualifize(test.form);
			assert(match, test.form); // should exist
			assert.notStrictEqual(match, test.form);
			continue;
		}
		case 'component': continue;		
	}
}
console.log('OK qualified');
