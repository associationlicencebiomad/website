import {transporter} from '../../../../../lib/mail';
import {createClient} from '@supabase/supabase-js';
// import type {RequestHandler} from "./$types";
import {error, type RequestHandler} from '@sveltejs/kit';

export const POST: RequestHandler = async ({request, locals}) => {

	if (!locals.user) {
		throw new error(403, 'not logged in');
	}

	const data = await request.formData(); // or .json(), or .text(), etc
	const to = data.get('to');

	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_SERVICE_KEY
	);

	const {data: user} = await supabase.auth.api.getUserById(to as string);

	await transporter.sendMail({
		from: `${data.get('from')} <website@albm.fr>, `, // sender address
		to: user?.email, // list of receivers
		replyTo: `${data.get('from')} <${data.get('from_email')}>`,
		cc: data.get('from_email') as string,
		subject: data.get('subject') as string, // Subject line
		text: `${data.get(
			'message'
		)} \n\nMessage envoyé depuis le site de l'ALBM vous pouvez répondre directement a ce mail` // plain text body
		// html: "<b>Hello world?</b>", // html body
	});

	return new Response();
};

