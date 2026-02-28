ALTER TABLE events
  DROP COLUMN IF EXISTS is_virtual;

ALTER TABLE events
  DROP COLUMN IF EXISTS participant_count;
