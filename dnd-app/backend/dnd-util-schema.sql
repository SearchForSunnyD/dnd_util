CREATE TABLE
  search_slugs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR NOT NULL,
    NAME TEXT NOT NULL,
    route_prefix TEXT NOT NULL
  );

CREATE TABLE
  users (
    username VARCHAR(25) PRIMARY KEY,
    PASSWORD TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL CHECK (POSITION('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
  );
