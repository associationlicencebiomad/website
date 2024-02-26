import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = async ({locals: {getSession, getUser}}) => {
    return {
        session: await getSession(),
        user: await getUser()
    };
};