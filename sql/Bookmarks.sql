CREATE TABLE public.bookmarks
(
	user_id    uuid REFERENCES PUBLIC.profile (userid) ON DELETE CASCADE,
	tweet_id   uuid REFERENCES PUBLIC.tweets (tweet_id) ON DELETE CASCADE,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id, tweet_id)
);

CREATE OR REPLACE FUNCTION public.add_bookmark(_user_id uuid, _tweet_id uuid)
	RETURNS void
	LANGUAGE plpgsql
AS
$$
BEGIN
	INSERT INTO public.bookmarks(user_id, tweet_id)
	VALUES (_user_id, _tweet_id);
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_bookmark(_user_id uuid, _tweet_id uuid)
	RETURNS void
	LANGUAGE plpgsql
AS
$$
BEGIN
	DELETE
	FROM public.bookmarks
	WHERE user_id = _user_id
	  AND tweet_id = _tweet_id;
END;
$$;

SELECT add_bookmark('9bc533a7-bf4c-4cc1-9075-bc02d6dce16c', 'e00316fb-3cbd-4851-945b-51dce5e8e1b5');
SELECT remove_bookmark('9bc533a7-bf4c-4cc1-9075-bc02d6dce16c', '6eb22c1a-9de4-4587-8db1-0dde4f5bb353');

CREATE OR REPLACE FUNCTION public.get_bookmarks(_user_id uuid)
	RETURNS JSON
AS
$$
BEGIN
	RETURN
	    (SELECT JSON_AGG(JSON_BUILD_OBJECT('tweet', t.*,
	                                          'author', p.*,
	                                          'user', JSON_BUILD_OBJECT('followsAuthor', EXISTS(SELECT *
	                                                                                            FROM public.follows f
	                                                                                            WHERE f.followed = t.author_id
		                                                                                          AND f.follower = _user_id)
	                                                                    'bookmarkedTweet', true ))))
		FROM (SELECT *
		      FROM PUBLIC.tweets
		      WHERE tweet_id IN (SELECT b.tweet_id FROM PUBLIC.bookmarks b WHERE b.user_id = _user_id)
		      ORDER BY created_at) t
			JOIN PUBLIC.profile p ON t.author_id = p.userid;
END;
$$ LANGUAGE plpgsql;

SELECT get_bookmarks('9bc533a7-bf4c-4cc1-9075-bc02d6dce16c');


CREATE OR REPLACE FUNCTION public.clear_bookmarks(_user_id uuid)
	RETURNS void
AS
$$
BEGIN
		DELETE FROM public.bookmarks
		WHERE user_id = _user_id;
END;
$$ LANGUAGE plpgsql;

SELECT clear_bookmarks('9bc533a7-bf4c-4cc1-9075-bc02d6dce16c');