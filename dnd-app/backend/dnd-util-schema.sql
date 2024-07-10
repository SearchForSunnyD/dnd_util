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

CREATE TABLE
  character_sheet (
    id SERIAL PRIMARY KEY,
    user_owner VARCHAR(25) NOT NULL,
    character_bio JSONB NOT NULL,
    attributes JSONB NOT NULL,
    skills JSONB NOT NULL,
    FOREIGN KEY (user_owner) REFERENCES users (username)
  );

CREATE TABLE
  character_links (
    character_id INT NOT NULL,
    slug_id INT NOT NULL,
    PRIMARY KEY (character_id, slug_id),
    FOREIGN KEY (character_id) REFERENCES character_sheet (id) ON DELETE CASCADE,
    FOREIGN KEY (slug_id) REFERENCES search_slugs (id) ON DELETE CASCADE
  );
