exports.up = async client => {
	await client`
        DROP TABLE IF EXISTS public.user_godparent;
	`

	await client`
        create table godparents
        (
            user_id      uuid    not null references public.profiles (id) on delete cascade,
            godparent_id uuid    not null references public.profiles (id) on delete cascade,
            is_adopted   boolean not null default false,
            primary key (user_id, godparent_id)
        );
	`

	// await client`
	//     ALTER TABLE public.user_godparent
	//        drop column godparent_id
	// `
	//
	// await client`
	// 	ALTER TABLE public.user_godparent
	// 	    drop column user_id;
	// `

	// await client`
	// 	drop table public.godparents;
	// `
};

exports.down = async client => {
	await client`
        drop table godparents;
	`
};
