import type { TimelineType } from "$lib/timeline/timeline.type";

export type Profile = {
	id: number;
	first_name: string;
	last_name: string;
	birthday: string;
	avatar: string;
	links: Links;
	promo_id: number;
	timeline: TimelineType;
	created_at: string;
	updated_at: string;
}

export type Links = {
	website: string;
	twitter: string;
	github: string;
	facebook: string;
	instagram: string;
	linkedin: string;
}
