exports.up = async (client) => {
	// 1. Create table
	await client`
        create table user_godparent
        (
            user_id      uuid not null references auth.users (id) on delete cascade,
            godparent_id uuid not null references auth.users (id) on delete cascade
        );`;

	// 2. Enable RLS
	await client`
        alter table public.user_godparent
            enable row level security;
	`;

	// 3. Create Policy
	await client`
		create policy "Godparent are viewable by everyone."
		on user_godparent for select using (
			true
		);
	`;

	await client`
		create policy "Users can update their own godparents."
		on user_godparent for update using (
			auth.uid() = user_id
		);
	`;
};

exports.down = async (client) => {
	// Drop Policy
	await client`
		drop policy "Godparent are viewable by everyone."
		on user_godparent;
	`;
	await client`
		drop policy "Users can update their own godparents."
		on user_godparent;
	`;

	// Disable RLS
	await client`
		alter table public.user_godparent
			disable row level security;
	`;

	// Drop table
	await client`
		drop table user_godparent;
	`;
};
