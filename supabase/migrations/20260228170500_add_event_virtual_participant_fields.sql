ALTER TABLE events
  ADD COLUMN IF NOT EXISTS participant_count INTEGER;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'attendance_count'
  ) THEN
    UPDATE events
    SET participant_count = COALESCE(participant_count, attendance_count)
    WHERE participant_count IS NULL;
  END IF;
END $$;

UPDATE events
SET participant_count = 0
WHERE participant_count IS NULL;

ALTER TABLE events
  ALTER COLUMN participant_count SET DEFAULT 0;

ALTER TABLE events
  ALTER COLUMN participant_count SET NOT NULL;

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS is_virtual BOOLEAN;

UPDATE events
SET is_virtual = FALSE
WHERE is_virtual IS NULL;

ALTER TABLE events
  ALTER COLUMN is_virtual SET DEFAULT FALSE;

ALTER TABLE events
  ALTER COLUMN is_virtual SET NOT NULL;
