import {persisted} from 'svelte-local-storage-store'
import {ThemeType} from "../types/theme.types";

export const theme = persisted<ThemeType>('theme', ThemeType.light);
