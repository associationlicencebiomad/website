import type { User } from '@supabase/supabase-js';
import type { Profile } from 'src/types/database/Profile.type';
import { writable } from 'svelte/store';

export const user = writable<null|User>(null);

export const profile = writable<null|Profile>(null);
