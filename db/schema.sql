DROP DATABASE IF EXISTS sodapop;

CREATE DATABASE sodapop;

\c sodapop;

CREATE TYPE addiction_type AS ENUM ('Alcohol', 'Drugs', 'Sex', 'Gambling', 'Shopping', 'Food', 'Work', 'Pain', 'Exercise');
CREATE TYPE connection_type AS ENUM ('Friend', 'NeedSponsor', 'BeSponsor', 'Relationship');
CREATE TYPE gender AS ENUM ('Male', 'Female', 'Transgender', 'Other');
CREATE TYPE sexual_orientation AS ENUM ('Straight', 'Gay', 'Bi');
CREATE TYPE time_unit AS ENUM ('Day', 'Month', 'Year');

DROP TABLE IF EXISTS locations;

Create TABLE locations(
    id serial PRIMARY KEY,
    city TEXT,
    zipcode TEXT, -- text and not int because some zip codes have dashes (12345-12321)
    state TEXT,
    country TEXT NOT NULL,
    latitude INT,
    longitude INT
);

DROP TABLE IF EXISTS user_profile;

CREATE TABLE user_profile(
    id serial PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    firstname TEXT,
    password TEXT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    picture_url TEXT,
    bio TEXT,
    struggle TEXT,
    location INTEGER REFERENCES locations (id),
    clean_date TIMESTAMP
);

DROP TABLE IF EXISTS user_profile_addiction;

Create TABLE user_profile_addiction(
    id serial PRIMARY KEY,
    user_profile_id serial REFERENCES user_profile (id) ON DELETE CASCADE,
    addiction_type addiction_type NOT NULL
);

DROP TABLE IF EXISTS relationship_option;

Create TABLE relationship_option(
    id serial PRIMARY KEY REFERENCES user_profile (id) ON DELETE CASCADE,
    gender gender NOT NULL,
    sexual_orientation sexual_orientation NOT NULL
);

DROP TABLE IF EXISTS user_profile_connection;

Create TABLE user_profile_connection(
    id serial PRIMARY KEY,
    user_profile_id serial REFERENCES user_profile (id) ON DELETE CASCADE,
    connection_type connection_type NOT NULL,
    relationship_option serial REFERENCES relationship_option(id)
);

DROP TABLE IF EXISTS message;

Create TABLE message(
    id serial PRIMARY KEY,
    body TEXT NOT NULL,
    sender_id serial REFERENCES user_profile (id) ON DELETE CASCADE,
    recipient_id serial REFERENCES user_profile (id) ON DELETE CASCADE,
    created TIMESTAMP NOT NULL,
    CHECK (sender_id != recipient_id)
);

DROP TABLE IF EXISTS friend;

Create TABLE friend(
    id serial PRIMARY KEY,
    requestor_id serial REFERENCES user_profile (id) ON DELETE CASCADE,
    target_id serial REFERENCES user_profile (id) ON DELETE CASCADE,
    confirmed BOOLEAN NOT NULL, -- true when target accepts requestor's request
    CHECK (requestor_id != target_id)
);


COPY locations (city,country)
FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/locations.csv'
DELIMITER ',' CSV HEADER;

COPY user_profile (email,username,firstname,password,created_on,last_login,picture_url,bio,struggle,location,clean_date) FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/users.csv'
DELIMITER ',' CSV HEADER;

COPY user_profile_addiction (user_profile_id,addiction_type)
FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/addictions.csv' DELIMITER ',' CSV HEADER;

COPY relationship_option (gender,sexual_orientation)
FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/relationships.csv' DELIMITER ',' CSV HEADER;

COPY user_profile_connection (user_profile_id,connection_type,relationship_option)
FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/connections.csv' DELIMITER ',' CSV HEADER;

COPY message (body,sender_id,recipient_id, created)
FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/messages.csv' DELIMITER ',' CSV HEADER;

COPY friend (requestor_id,target_id,confirmed)
FROM '/Users/nas/Documents/soda/Soda_Pop/db/csv/friends.csv' DELIMITER ',' CSV HEADER;
