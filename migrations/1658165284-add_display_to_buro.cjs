exports.up = async client => {
	await client`
		ALTER TABLE "buro"
		ADD COLUMN "display" boolean NOT NULL DEFAULT true;
	`;
};

exports.down = async client => {
	await client`
		ALTER TABLE "buro"
		DROP COLUMN "display";
	`;
};
