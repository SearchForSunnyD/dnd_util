\echo 'Delete and recreate dnd_util db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dnd_util;
CREATE DATABASE dnd_util;
\connect dnd_util

\i dnd-util-schema.sql

\echo 'Delete and recreate dnd_util_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE dnd_util_test;
CREATE DATABASE dnd_util_test;
\connect dnd_util_test

\i dnd-util-schema.sql
