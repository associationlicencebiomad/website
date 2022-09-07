import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({parent}) => {
	return await parent();
}
