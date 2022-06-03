import type { User } from '@supabase/supabase-js';
import type { Profil } from 'src/types/database/Profil.type';
import { writable } from 'svelte/store';

export const user = writable<null|User>(null);

export const profil = writable<null|Profil>(null);
