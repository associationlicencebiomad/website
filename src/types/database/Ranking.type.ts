export type Professor = {
	id: number;
	full_name: string;
	image_url: string;
	courses: string[];
}

export type Ranking = Professor & {
	ranking: number;
}