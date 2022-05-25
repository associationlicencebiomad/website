import type { RequestHandler, RequestHandlerOutput } from "@sveltejs/kit";
import { supabase } from "$lib/supabase-client";

export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData(); // or .json(), or .text(), etc
	
	if (data.get("password") !== data.get("confirm")) {
		return returnError(400, "Les mots de passe ne correspondent pas.", data);
	}

	let { error } = await supabase.auth.signUp({
		email: data.get("email") as string,
		password: data.get("password") as string,
	},
	{
		data: {
			first_name: data.get("first_name") as string,
			last_name: data.get("last_name") as string,
			birthday: data.get("birthday") as string,
			key: data.get("key") as string,
		},
		redirectTo: `${request.headers.get("origin")}/auth/login?active`,
	})
	console.log(error)
	if (error) return returnError(error.status, error.message, data);
	
	return {
		status: 302,
		headers: {
			location: `/auth/login?success&email=${data.get("email") as string}`,
		},
		
	};
}


function returnError(status: number, message: string, data: FormData): RequestHandlerOutput {
	return {
		status,
		body: {
			toasts: [
				{
					color: "error",
					message: message,
				},
			],
			first_name: data.get("first_name") as string,
			last_name: data.get("last_name") as string,
			birthday: data.get("birthday") as string,
			email: data.get("email") as string,
			key: data.get("key") as string,
		},
	};
}
