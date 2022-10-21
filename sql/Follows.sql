-- Follow Function
CREATE OR REPLACE FUNCTION public.follow_user(_followed uuid, _follower uuid)
	RETURNS void
	LANGUAGE plpgsql AS
$$
BEGIN
	INSERT INTO public.follows(followed, follower)
	VALUES (_followed, _follower);

	UPDATE public.profile
	SET followers_count = followers_count + 1
	WHERE userid = _followed;

	UPDATE public.profile
	SET following_count = following_count + 1
	WHERE userid = _follower;
END
$$;


-- Unfollow Function
CREATE OR REPLACE FUNCTION public.unfollow_user(_followed uuid, _follower uuid)
	RETURNS void
	LANGUAGE plpgsql AS
$$
BEGIN
	IF (EXISTS(SELECT * FROM public.follows f WHERE f.followed = _followed AND f.follower = _follower)) THEN
		DELETE
		FROM public.follows f
		WHERE f.followed = _followed
		  AND f.follower = _follower;

		UPDATE public.profile
		SET followers_count = followers_count - 1
		WHERE userid = _followed;

		UPDATE public.profile
		SET following_count = following_count - 1
		WHERE userid = _follower;
	ELSE
		RAISE EXCEPTION 'Follow relation doesn''t exist.' USING HINT =
				'The follower user entered doesn''t follow the followed user entered.';
	END IF;
END
$$;

DROP FUNCTION public.follow_user;
DROP FUNCTION public.unfollow_user;

SELECT public.follow_user('9bc533a7-bf4c-4cc1-9075-bc02d6dce16c', '867fab73-e4f3-4db3-bd37-93b327ec517b');
SELECT public.unfollow_user('867fab73-e4f3-4db3-bd37-93b327ec517b', '9bc533a7-bf4c-4cc1-9075-bc02d6dce16c');