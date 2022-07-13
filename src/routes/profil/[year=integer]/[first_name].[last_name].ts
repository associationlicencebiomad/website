import { transporter } from '$lib/mail';
import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData(); // or .json(), or .text(), etc
	const to = data.get('to');

	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_SERVICE_KEY
	);

	const { data: user } = await supabase.auth.api.getUserById(to as string);

	await transporter.sendMail({
		from: `${data.get('from')} <website@albm.fr>`, // sender address
		to: user?.email, // list of receivers
		cc: data.get('from_email') as string,
		subject: data.get('subject') as string, // Subject line
		text: `${data.get(
			'message'
		)} \n\nMessage envoyé depuis le site de l'ALBM, veuillez répondre à ${data.get(
			'from'
		)} : ${data.get('from_email')} ` // plain text body
		// html: "<b>Hello world?</b>", // html body
	});

	return {};
};
