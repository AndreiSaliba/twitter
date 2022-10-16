export interface UserProfile {
    userid: string;
    email: string;
    username: string;
    name: string;
    url: string;
    location: string;
    description: string;
    verified: boolean;
    protected: boolean;
    created_at: string;
    listed_count: number;
    statuses_count: number;
    followers_count: number;
    following_count: number;
    favourites_count: number;
    profile_image_url: string;
    profile_banner_url: string;
    default_profile_image: boolean;
    default_profile_banner: boolean;
}

export interface UserPageProfile {
    profile: UserProfile;
    isFollowedByRequest?: boolean;
    currentUser?: boolean;
}

export interface TweetType {
    tweet: {
        tweet_id: string;
        public_id: bigint;
        author_id: string;
        created_at: string;
        like_count: number;
        tweet_text: string;
        quote_count: number;
        reply_count: number;
        retweet_count: number;
        reply_settings: "everyone";
        conversation_id: string;
        referenced_tweets: any;
        in_reply_to_user_id: number;
    };
    author: UserProfile;
    isFollowedByRequest?: boolean;
}
