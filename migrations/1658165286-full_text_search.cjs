exports.up = async client => {
	await client`
		CREATE TEXT SEARCH CONFIGURATION fr ( COPY = french );
	`

	await client`
		ALTER TEXT SEARCH CONFIGURATION fr
			ALTER MAPPING FOR hword, hword_part, word
			WITH unaccent, french_stem;
	`

	await client`
        alter table
            profiles
            add column
                fts tsvector generated always as (
                    --                         to_tsvector(
--                                 'simple',
--                                 first_name || ' ' ||
--                                 last_name || '' ||
--                                 about || '' ||
--                                 best_memory || '' ||
--                                 better_promo || '' ||
--                                 strong_points
--                             ) || 
                                            to_tsvector('fr', first_name) ||
                                            to_tsvector('fr', last_name) ||
                                            to_tsvector('fr', coalesce(about, '')) ||
                                            to_tsvector('fr', coalesce(best_memory, '')) ||
                                            to_tsvector('fr', coalesce(better_promo, '')) ||
                                            to_tsvector('fr', coalesce(strong_points, '')) ||
                                            json_to_tsvector('fr', timeline, '"all"')) stored;
	`

	await client`
        create index profiles_fts on profiles using gin (fts); -- generate the index
	`
};

exports.down = async client => {
	// await client`

	//     drop index profiles_fts;
	// `
	await client`

        alter table public.profiles
            drop column fts;
	`
	await client`
		DROP TEXT SEARCH CONFIGURATION fr;
	`
};
