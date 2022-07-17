exports.up = async (client) => {
	// create the table
	await client`
        insert into storage.buckets (id, name)
        values ('avatars', 'avatars');
	`;

	// create the policy
	await client`
		create policy "Avatar images are publicly accessible."
			on storage.objects for select
				using ( bucket_id = 'avatars' );
	`;

	await client`
		create policy "Authenticaded user can upload an avatar."
		on storage.objects for insert
			with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );
	`;

	await client`
		create policy "Authenticaded user can update an avatar."
		on storage.objects for update
			with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );
	`;
};

exports.down = async (client) => {
	// drop the policy
	await client`
		drop policy "Avatar images are publicly accessible."
			on storage.objects;
	`;
	await client`
		drop policy "Authenticaded user can upload an avatar."
		on storage.objects;
	`;
	await client`
		drop policy "Authenticaded user can update an avatar."
		on storage.objects;
	`;

	// drop the table
	await client`
        delete
        from storage.buckets
        where id = 'avatars';
	`;
};
