import type { ParamMatcher } from '@sveltejs/kit';

export function match(param: ParamMatcher) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return /^\d+$/.test(param);
}
