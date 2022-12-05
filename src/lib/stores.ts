import {writable} from 'svelte/store';
import {ThemeType} from "../types/Theme.type";

export const session = writable({
	user: null,
	accessToken: null,
})

export const theme = writable<ThemeType>(ThemeType.light)