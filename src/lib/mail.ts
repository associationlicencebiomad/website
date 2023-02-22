import { createTransport } from 'nodemailer';
import {MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_SECURE, MAIL_USER} from '$env/static/private';

export const transporter = createTransport({
	host: MAIL_HOST,
	port: MAIL_PORT,
	secure: MAIL_SECURE, // true for 465, false for other ports
	auth: {
		user: MAIL_USER, // generated ethereal user
		pass: MAIL_PASSWORD // generated ethereal password
	}
});