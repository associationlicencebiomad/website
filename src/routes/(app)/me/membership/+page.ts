import type {PageLoad} from './$types';
import type {Membership} from "src/types/user.types";

export const load = (async ({parent}) => {
	const {supabase, session} = await parent()

	const {data, error: supabaseErr} = await supabase
		.from('memberships')
		.select('*')
		.eq('user_id', session?.user.id);

	if (supabaseErr) {
		console.error(supabaseErr);
		return {errors: [supabaseErr.message]};
	}

	if (supabaseErr || !data) {
		return {error: supabaseErr};
	}

	// check if user has a membership payment from less than 1 year ago
	// const hasActiveMembership = data.some((membership ) => {
	// 	const paymentDate = new Date(membership.date);
	// 	const now = new Date();
	// 	const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
	// 	return paymentDate > oneYearAgo;
	// });

	// check if user as a membership payment from this year
	const hasActiveMembership = data.some((membership ) => {
		const now = new Date();
		const paymentYear = new Date(membership.date).getFullYear();
		const thisYear = now.getFullYear();
		return paymentYear === thisYear;
	});

	return {
		payments: data as Membership[],
		hasActiveMembership
	};
}) satisfies PageLoad;

