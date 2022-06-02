CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.profils
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.buro
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
