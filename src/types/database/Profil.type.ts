import type { TimelineType } from "$lib/timeline/timeline.type";

export type Profil = {
	id: string;
	first_name: string;
	last_name: string;
	birthday: string;
	about: string;
	best_memory: string;
	strong_points: string;
	better_promo: string;
	avatar: string;
	links: Links;
	promo_id: number;
	timeline: TimelineType;
	created_at: string;
	updated_at: string;
	promos: Promos;
}

export type Links = {
	website: string;
	twitter: string;
	github: string;
	facebook: string;
	instagram: string;
	linkedin: string;
}

export type Promos = {
	id: number;
	name: string;
	year: number;
}

export type Buro = {
	id: string;
	role: string;
	profils: Profil;
};
