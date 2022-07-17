exports.up = async (client) => {
	await client`
		CREATE OR REPLACE FUNCTION trigger_set_timestamp()
		RETURNS TRIGGER AS $$
		BEGIN
		  NEW.updated_at = NOW();
		  RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
	`;

	await client`
		CREATE TRIGGER set_timestamp
		BEFORE UPDATE ON public.profils
		FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
	`;

	await client`
		CREATE TRIGGER set_timestamp
		BEFORE UPDATE ON public.buro
		FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
	`;
};

exports.down = async (client) => {
	// Drop trigger
	await client`
		DROP TRIGGER set_timestamp
		ON public.profils;
	`;
	await client`
		DROP TRIGGER set_timestamp
		ON public.buro;
	`;

	// Drop function
	await client`
		DROP FUNCTION trigger_set_timestamp();
	`;
};
