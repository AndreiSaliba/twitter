CREATE TABLE profile
(
	userid                 uuid                                NOT NULL
		PRIMARY KEY
		REFERENCES auth.users
			ON DELETE CASCADE,
	email                  varchar                             NOT NULL
		REFERENCES auth.users (email),
	username               varchar(15)                         NOT NULL
		UNIQUE,
	name                   varchar(50),
	location               varchar(30),
	url                    varchar(100),
	description            varchar(160),
	created_at             timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	protected              boolean   DEFAULT FALSE             NOT NULL,
	verified               boolean   DEFAULT FALSE             NOT NULL,
	followers_count        integer   DEFAULT 0                 NOT NULL,
	following_count        integer   DEFAULT 0                 NOT NULL,
	listed_count           integer   DEFAULT 0                 NOT NULL,
	favourites_count       integer   DEFAULT 0                 NOT NULL,
	statuses_count         integer   DEFAULT 0                 NOT NULL,
	profile_image_url      varchar   DEFAULT 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'::character varying,
	profile_banner_url     varchar,
	default_profile_banner boolean   DEFAULT TRUE              NOT NULL,
	default_profile_image  boolean   DEFAULT TRUE              NOT NULL
);

-- Update user profile function
CREATE OR REPLACE FUNCTION public.update_userprofile(
	_userid uuid,
	_name varchar(50),
	_username varchar(15),
	_location varchar(30),
	_description varchar(160),
	_url varchar(100),
	_profile_image_url varchar,
	_banner_image_url varchar)
	RETURNS VOID
	LANGUAGE plpgsql
AS
$$
BEGIN
	UPDATE public.profile p
	SET "name"               = COALESCE(_name, p.name),
	    "username"           = COALESCE(_username, p.username),
	    "location"           = COALESCE(_location, p.location),
	    "description"        = COALESCE(_description, p.description),
	    "url"                = COALESCE(_url, p.url),
	    "profile_image_url"  = COALESCE(_profile_image_url, p.profile_image_url),
	    "profile_banner_url" = COALESCE(_banner_image_url, p.profile_banner_url)
	WHERE p.userid = _userid;
END;
$$;

SELECT update_userprofile('9bc533a7-bf4c-4cc1-9075-bc02d6dce16c', NULL, 'AndreiSaliba', NULL, NULL, NULL, NULL, NULL);

-- Twitter ID Function
CREATE SEQUENCE public.global_id_seq;
ALTER SEQUENCE public.global_id_seq OWNER TO postgres;

CREATE OR REPLACE FUNCTION public.gen_twitter_id()
	RETURNS bigint
	LANGUAGE 'plpgsql'
AS
$BODY$
DECLARE
	our_epoch  bigint := 1477420021721;
	seq_id     bigint;
	now_millis bigint;
	shard_id   int    := 1;
	result     bigint := 0;
BEGIN
	SELECT NEXTVAL('public.global_id_seq') % 1024 INTO seq_id;

	SELECT FLOOR(EXTRACT(EPOCH FROM CLOCK_TIMESTAMP()) * 1000) INTO now_millis;
	result := (now_millis - our_epoch) << 23;
	result := result | (shard_id << 10);
	result := result | (seq_id);
	RETURN result;
END;
$BODY$;

ALTER FUNCTION public.gen_twitter_id() OWNER TO postgres;

SELECT public.gen_twitter_id()