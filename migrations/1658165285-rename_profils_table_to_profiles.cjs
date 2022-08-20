exports.up = async client => {
	await client`
        ALTER TABLE "profils"
            RENAME TO "profiles";
	`
};

exports.down = async client => {
	await client`
        ALTER TABLE "profiles"
            RENAME TO "profils";
	`
};
