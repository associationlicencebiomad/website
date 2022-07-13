import { createTransport } from 'nodemailer';

export const transporter = createTransport({
	host: import.meta.env.VITE_MAIL_HOST,
	port: import.meta.env.VITE_MAIL_PORT,
	secure: import.meta.env.VITE_MAIL_SECURE, // true for 465, false for other ports
	auth: {
		user: import.meta.env.VITE_MAIL_USER, // generated ethereal user
		pass: import.meta.env.VITE_MAIL_PASSWORD // generated ethereal password
	}
});
