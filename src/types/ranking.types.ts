import type {Database} from "src/types/database.types";

type ProfessorRow = Database['public']['Tables']['professors']['Row'];

export type Professor = Pick<ProfessorRow, 'id' | 'full_name' | 'courses' | 'image_url'>;

export interface Ranking extends ProfessorRow {
	ranking: number
}
