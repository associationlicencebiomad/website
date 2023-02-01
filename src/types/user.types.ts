import type {Database} from "./database.types";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type PromoRow = Database['public']['Tables']['promos']['Row'];

type GodparentProfile = Pick<ProfileRow, 'id' | 'first_name' | 'last_name'>

export interface LoggedInUser extends ProfileRow {
	promo: PromoRow,
	godparents: GodparentProfile[]
}

export interface Profile extends Pick<ProfileRow, 'id' | 'first_name' | 'last_name' | 'avatar' | 'timeline'> {
	promo: Pick<PromoRow, 'name' | 'year'>
}