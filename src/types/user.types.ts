import type {Database} from "./database.types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type PromoRow = Database['public']['Tables']['promos']['Row'];
type GodparentRow = Database['public']['Tables']['godparents']['Row'];

export interface GodparentProfile extends Pick<GodparentRow, 'is_adopted'> {
	id?: number,
	profile: Pick<ProfileRow, 'id' | 'first_name' | 'last_name' | 'avatar'>
}

export interface LoggedInUser extends ProfileRow {
	promo: PromoRow,
	godparents: GodparentProfile[]
}

export interface Profile extends Pick<ProfileRow, 'id' | 'first_name' | 'last_name' | 'avatar' | 'timeline'> {
	promo: Pick<PromoRow, 'name' | 'year'>
}

export interface Links {
	instagram: string,
	facebook: string,
	twitter: string,
	linkedin: string,
	website: string,
	github: string,
}