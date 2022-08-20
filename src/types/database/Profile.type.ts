import type {TimelineType} from '$lib/components/Timeline/timeline.type';

export type Profile = {
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
	godparent: Godparent;
};

export type Links = {
	website: string;
	twitter: string;
	github: string;
	facebook: string;
	instagram: string;
	linkedin: string;
};

export type Promos = {
	id: number;
	name: string;
	year: number;
};

export type Buro = {
	id: string;
	role: string;
	display: boolean;
	profils: Profile;
};

export type Godparent = {}