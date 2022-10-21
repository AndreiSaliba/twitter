-- Tweets Table
CREATE TABLE public.tweets
(
	tweet_id            BIGINT PRIMARY KEY    DEFAULT public.gen_twitter_id(),
	tweet_text          VARCHAR(280) NOT NULL,
	created_at          timestamp    NOT NULL DEFAULT NOW(),
	author_id           uuid         NOT NULL REFERENCES profile (userid),
	conversation_id     BIGINT REFERENCES tweets (tweet_id),
	in_reply_to_user_id uuid REFERENCES profile (userid),
	referenced_tweets   jsonb[],
	reply_settings      varchar      NOT NULL,
	retweet_count       int          NOT NULL DEFAULT 0,
	reply_count         int          NOT NULL DEFAULT 0,
	like_count          int          NOT NULL DEFAULT 0,
	quote_count         int          NOT NULL DEFAULT 0
);

-- Create Tweet Function
CREATE OR REPLACE FUNCTION public.create_tweet(_text varchar(200), _author_id uuid, _conversation_id bigint)
	RETURNS void
	LANGUAGE plpgsql
AS
$$
BEGIN
	INSERT INTO public.tweets(tweet_text, author_id, conversation_id, in_reply_to_user_id, referenced_tweets,
	                          reply_settings)
	VALUES (_text, _author_id, _conversation_id, NULL, NULL, 'everyone');
END;
$$;

SELECT public.create_tweet('This is a test tweet', '867fab73-e4f3-4db3-bd37-93b327ec517b', NULL);

-- Get Tweets Function
CREATE OR REPLACE FUNCTION public.get_tweets(_user_id uuid)
	RETURNS JSON
	LANGUAGE plpgsql
AS
$$
BEGIN
	RETURN (SELECT JSON_AGG(JSONB_BUILD_OBJECT('tweet', t.*, 'author', p.*, 'isFollowedByRequest',
	                                           EXISTS(SELECT *
	                                                  FROM public.follows f
	                                                  WHERE f.followed = t.author_id
		                                                AND f.follower = _user_id)))
	        FROM (SELECT *
	              FROM public.tweets
	              WHERE author_id IN (SELECT followed FROM public.follows WHERE follower = _user_id)
		             OR author_id = _user_id
	              ORDER BY created_at DESC) t
		             JOIN public.profile p ON t.author_id = p.userid);
END;
$$;

SELECT get_tweets('867fab73-e4f3-4db3-bd37-93b327ec517b');

-- Get User Tweets Function
CREATE OR REPLACE FUNCTION public.get_user_tweets(_username varchar(15))
	RETURNS JSON
AS
$$
BEGIN
	RETURN (SELECT JSON_AGG(JSONB_BUILD_OBJECT('tweet', t.*, 'author', p.*))
	        FROM (SELECT *
	              FROM public.tweets
	              WHERE author_id = (SELECT userid FROM public.profile p WHERE p.username = _username)
	              ORDER BY created_at) t
		             JOIN public.profile p ON t.author_id = p.userid);
END;
$$ LANGUAGE plpgsql;

SELECT get_user_tweets('867fab73-e4f3-4db3-bd37-93b327ec517b');
