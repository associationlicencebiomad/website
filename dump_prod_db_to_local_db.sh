export $(grep -v '^#' .env | xargs)

pg_dump \
  --clean \
  --if-exists \
  --quote-all-identifiers \
  --exclude-table-data 'storage.objects' \
  --exclude-schema 'extensions|graphql|graphql_public|net|pgbouncer|pgsodium|pgsodium_masks|realtime|supabase_functions|pg_toast|pg_catalog|information_schema' \
  --schema '*' \
  --dbname "$PROD_DB_URL" \
| sed 's/^DROP SCHEMA IF EXISTS "auth";$/-- DROP SCHEMA IF EXISTS "auth";/' \
| sed 's/^DROP SCHEMA IF EXISTS "storage";$/-- DROP SCHEMA IF EXISTS "storage";/' \
| sed 's/^CREATE SCHEMA "auth";$/-- CREATE SCHEMA "auth";/' \
| sed 's/^CREATE SCHEMA "storage";$/-- CREATE SCHEMA "storage";/' \
| sed 's/^ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin"/-- ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin"/' \
> dump.sql

psql \
  --single-transaction \
  --variable ON_ERROR_STOP=1 \
  --file dump.sql \
  --dbname "$LOCAL_DB_URL"

rm dump.sql