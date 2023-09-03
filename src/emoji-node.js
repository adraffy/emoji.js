
export class EmojiNode {
	static from(m) {
		let root = new this();
		for (let cps of m) {
			let node = root;
			for (let cp of cps) {
				node = node.add(cp);
			}
			node.valid = true;
		}
		root.collapse_mods();
		root.collapse_nodes();
		root.collapse_keys();
		return root;
	}
	constructor() {
		this.branches = {};
		//this.valid = false;
		//this.save_mod = false;
		//this.check_mod = false;
	}
	get nodes() {
		return Object.values(this.branches).reduce((a, x) => a + 1 + x.nodes, 0);
	}
	add(cp) {
		let node = this.branches[cp];
		if (!node) this.branches[cp] = node = new this.constructor();
		return node;
	}
	scan(fn, path = []) {
		fn(this, path);
		for (let [k, node] of Object.entries(this.branches)) {
			node.scan(fn, [...path, [k, node]]);
		}
	}
	collapse_nodes(memo = {}) {
		for (let [k, node] of Object.entries(this.branches)) {
			node.collapse_nodes(memo);
			let key = JSON.stringify(node);
			let dup = memo[key];
			if (dup) {
				this.branches[k] = dup;
			} else {
				memo[key] = node;
			}
		}
	}
	collapse_keys() {
		let m = Object.entries(this.branches);
		let u = this.branches = {};
		while (m.length) {
			let [key, node] = m.pop();
			u[[...m.filter(kv => kv[1] === node).map(kv => kv[0]), key].sort().join()] = node;
			m = m.filter(kv => kv[1] !== node);
			node.collapse_keys();
		}
	}
	collapse_mods() {
		let modifier_set = new Set(['127995', '127996', '127997', '127998', '127999']); // 1F3FB..1F3FF
		this.scan((node, path) => {
			// find nodes that are missing 1 modifier
			let v = Object.keys(node.branches);
			if (v.length != modifier_set.size - 1) return; // missing 1
			if (!v.every(k => modifier_set.has(k))) return; // all mods
			// where another modifier already exists in the path
			let m = path.filter(kv => modifier_set.has(kv[0]));
			if (m.length == 0) return;
			let parent = m[m.length - 1][1]; // find closest
			// complete the map so we can collapse
			for (let cp of modifier_set) {
				if (!node.branches[cp]) {
					node.branches[cp] = node.branches[v[0]]; // fake branch
					break;
				}
			}
			// set save on the first modifier
			parent.save_mod = true;
			// set check on the second modifiers
			for (let b of Object.values(node.branches)) {
				b.check_mod = true;
			}
		});
	}
}
