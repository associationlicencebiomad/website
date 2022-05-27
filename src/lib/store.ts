import type { User } from '@supabase/supabase-js';
import type { profil } from 'src/types/database/profil.type';
import { writable } from 'svelte/store';

export const user = writable<null|User>(null);

export const profil = writable<null|profil>(null);
