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


-- Get User Profile by username
CREATE OR REPLACE FUNCTION public.get_user_profile(_username varchar(15), _user_requesting_profile varchar(15))
	RETURNS json
	LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN (SELECT JSON_BUILD_OBJECT(
			               'profile', ((SELECT ROW_TO_JSON(p.*) FROM public.profile p WHERE p.username = _username)),
			               'isFollowedByRequest', EXISTS(SELECT *
			                                             FROM public.follows f
			                                             WHERE f.followed = (SELECT userid
			                                                                 FROM public.profile p
			                                                                 WHERE p.username = _username)
				                                           AND f.follower = (SELECT userid
				                                                             FROM public.profile p
				                                                             WHERE p.username = _user_requesting_profile))
		               ));
END;
$$;

-- Get User Profile by userid
CREATE OR REPLACE FUNCTION public.get_user_profile_by_userid(_userid uuid, _user_requesting_profile uuid)
	RETURNS json
	LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN (SELECT JSON_BUILD_OBJECT(
			               'profile', ((SELECT ROW_TO_JSON(p.*) FROM public.profile p WHERE p.userid = _userid)),
			               'isFollowedByRequest', EXISTS(SELECT *
			                                             FROM public.follows f
			                                             WHERE f.followed = _userid
				                                           AND f.follower = _user_requesting_profile)
		               ));
END;
$$;