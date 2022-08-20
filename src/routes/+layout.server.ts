import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = ({locals}) => {
	return {
		session: {
			user: locals.user,
			accessToken: locals.accessToken
		},
	}
}