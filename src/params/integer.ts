import type { ParamMatcher } from '@sveltejs/kit'

export function match(param:ParamMatcher) {
	return /^\d+$/.test(param);
}
