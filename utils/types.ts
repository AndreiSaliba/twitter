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
