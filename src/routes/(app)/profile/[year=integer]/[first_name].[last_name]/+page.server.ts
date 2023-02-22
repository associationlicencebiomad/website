import type { Actions } from './$types';
import {createClient} from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_URL} from '$env/static/public';
import {SUPABASE_SERVICE_KEY} from '$env/static/private';
import {transporter} from "$lib/mail";


export const actions = {
	sendMessage: async ({request}) => {
		const data = await request.formData();

		const supabase = createClient(
			PUBLIC_SUPABASE_URL,
			SUPABASE_SERVICE_KEY
		);

		const user = (await supabase.auth.admin.getUserById(data.get('to') as string)).data.user;

		await transporter.sendMail({
			from: `${data.get('from')} <website@albm.fr>, `, // sender address
			to: user?.email, // list of receivers
			replyTo: `${data.get('from')} <${data.get('from_email')}>`,
			cc: data.get('from_email') as string,
			subject: data.get('subject') as string, // Subject line
			text: `${data.get(
				'message'
			)} \n\nMessage envoyé depuis le site de l'ALBM vous pouvez répondre directement a ce mail.` // plain text body
		});
	}
} satisfies Actions;