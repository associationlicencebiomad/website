import {persisted} from 'svelte-persisted-store'
import {ThemeType} from "../types/theme.types";

export const theme = persisted<ThemeType>('theme', ThemeType.light);
