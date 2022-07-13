import { goto } from '$app/navigation';

export async function route(path: string, delay = 500) {
	if (delay) await new Promise((r) => setTimeout(r, delay));
	await goto(path);
}
