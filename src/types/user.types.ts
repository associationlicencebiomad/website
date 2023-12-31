import type {Database} from "./database.types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type PromoRow = Database['public']['Tables']['promos']['Row'];
type GodparentRow = Database['public']['Tables']['godparents']['Row'];

export type Membership = Database['public']['Tables']['memberships']['Row'];

export interface GodparentProfile extends Pick<GodparentRow, 'is_adopted'> {
	id?: number,
	profile: Pick<ProfileRow, 'id' | 'first_name' | 'last_name' | 'avatar'>
}

export interface LoggedInUser extends ProfileRow {
	promo: PromoRow,
	godparents: GodparentProfile[]
}

export interface ProfileResumed extends Pick<ProfileRow, 'id' | 'first_name' | 'last_name' | 'avatar' | 'timeline'> {
	promos: Pick<PromoRow, 'name' | 'year'>
}

export interface Profile extends ProfileRow {
	promos: Pick<PromoRow, 'name' | 'year'>
	godparents: GodparentProfile[]
}

export interface Links {
	instagram: string,
	facebook: string,
	twitter: string,
	linkedin: string,
	website: string,
	github: string,
}

