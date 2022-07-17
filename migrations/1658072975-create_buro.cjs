exports.up = async (client) => {
	// 1. Create table
	await client`
        create table public.buro
        (
            id         uuid references public.profils (id) on delete cascade unique  not null primary key,
            role       text                                                          not null,

            created_at timestamp with time zone default timezone('utc'::text, now()) not null,
            updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
	`;

	// 2. Enable RLS
	await client`
        alter table public.buro
            enable row level security;
	`;

	// 3. Create Policy
	await client`
		create policy "buro members are viewable by everyone."
		on buro for select using (
			true
		);
	`;

	await client`
		create policy "Users can update their own buro."
		on buro for update using (
			auth.uid() = id
		);
	`;
};

exports.down = async (client) => {
	// Drop policy
	await client`
		drop policy "Users can update their own buro."
		on buro;
	`;
	await client`
		drop policy "buro members are viewable by everyone."
		on buro;
	`;

	// Disable RLS
	await client`
		alter table public.buro
			disable row level security;
	`;

	//Drop table
	await client`
		drop table public.buro;
	`;
};
