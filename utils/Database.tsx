import { supabase } from "@utils/supabaseClient";
import { TweetType, UserPageProfile } from "./types";

export const getUser = async (
    username: string,
    userRequestingProfile: string
) => {
    const { data, error } = await supabase
        .rpc("get_user_profile", {
            _username: username,
            _user_requesting_profile: userRequestingProfile,
        })
        .select();

    console.info("Request: Get user");
    error && console.log(error);
    return data as unknown as UserPageProfile;
};

export const updateUserProfile = async (
    userID: string,
    name: string,
    username: string,
    description: string,
    location: string,
    url: string,
    profileImageURL: string,
    bannerImageURL: string
) => {
    const { error } = await supabase.rpc("update_userprofile", {
        _userid: userID,
        _name: name,
        _username: username,
        _location: location,
        _description: description,
        _url: url,
        _profile_image_url: profileImageURL,
        _banner_image_url: bannerImageURL,
    });

    console.info("Request: Update Profile");
    error && console.log(error);
    return;
};

export const followUser = async (followedUser: string, follower: string) => {
    const { error } = await supabase.rpc("follow_user", {
        _followed: followedUser,
        _follower: follower,
    });

    console.info("Request: Follow");
    error && console.log(error);
    return;
};

export const unfollowUser = async (followedUser: string, follower: string) => {
    const { error } = await supabase.rpc("unfollow_user", {
        _followed: followedUser,
        _follower: follower,
    });

    console.info("Request: Unfollow");
    error && console.log(error);
    return;
};

export const create_tweet = async (authorID: string, text: string) => {
    const { error } = await supabase.rpc("create_tweet", {
        _text: text,
        _author_id: authorID,
        _conversation_id: null,
    });

    console.info("Creating tweet");
    error && console.log(error);
    return;
};

export const getTweets = async (userID: string) => {
    const { data, error } = await supabase.rpc("get_tweets", {
        _user_id: userID,
    });

    console.info("Loading Tweets");
    error && console.log(error);
    return data as TweetType[];
};

export const getUserTweets = async (username: string) => {
    const { data, error } = await supabase.rpc("get_user_tweets", {
        _username: username,
    });

    console.info("Loading User Tweets");
    error && console.log(error);
    return data as TweetType[];
};
