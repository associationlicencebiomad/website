import type {Handle} from '@sveltejs/kit';
import {sequence} from "@sveltejs/kit/hooks";
import {handleSupabase} from "$lib/supabase";

export const handle: Handle = sequence(
	handleSupabase,
)