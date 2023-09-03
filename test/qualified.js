import {SPEC} from '../src/spec.js';
import {qualifize} from '../src/lib.js';
import {explode_cps} from '../src/utils.js';

for (let test of SPEC.tests) {
	switch (test.type) {
		case 'fully-qualified': {
			let form = qualifize(test.form);
			if (form !== test.form) {
				console.log(test, explode_cps(form));
				throw 1;
			}
			continue;
		}
		case 'unqualified':
		case 'minimally-qualified': {
			let match = qualifize(test.form);
			if (!match) throw new Error('bug: expected upgrade');
			if (match === test.form) throw new Error('bug: expected mismatch');
			continue;
		}
		case 'component': continue;
		default: {
			console.log(test);
			throw new Error(`bug: unhandled test`);
		}
	}
}
console.log('OK qualified');
