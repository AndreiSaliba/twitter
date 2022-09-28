import { supabase } from "@utils/supabaseClient";
import { UserPageProfile } from "./types";

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

    error && console.log(error);
};

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
    error && console.log(error);
    return data as unknown as UserPageProfile;
};

export const followUser = async (followedUser: string, follower: string) => {
    const { error } = await supabase.rpc("follow_user", {
        _followed: followedUser,
        _follower: follower,
    });

    error && console.log(error);
};

export const unfollowUser = async (followedUser: string, follower: string) => {
    const { error } = await supabase.rpc("unfollow_user", {
        _followed: followedUser,
        _follower: follower,
    });

    error && console.log(error);
};
