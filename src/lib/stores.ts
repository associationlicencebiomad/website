import {writable} from "svelte/store";
import {ThemeType} from "../types/theme.types";

export const theme = writable<ThemeType>(ThemeType.light)