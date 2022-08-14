import { createContext, useContext, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@utils/supabaseClient";
import toast from "react-hot-toast";
import { UserProfile } from "@utils/types";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState<Session>(supabase.auth.session());
    const [userProfile, setUserProfile] = useState<UserProfile>(
        supabase.auth.session()?.user?.user_metadata?.userProfile
    );

    const signUp = async (
        username: string,
        email: string,
        password: string
    ) => {
        supabase.auth
            .signUp(
                { email, password },
                {
                    data: {
                        username,
                    },
                }
            )
            .then((data) => {
                if (data.error) {
                    const message =
                        data.error.message ==
                        'duplicate key value violates unique constraint "profile_username_key"'
                            ? "Username has already been taken."
                            : data.error.message;
                    toast(message);
                }
            });
    };

    const logIn = async (email: string, password: string) => {
        supabase
            .from("profile")
            .select("email")
            .ilike("username", email)
            .then((data) => {
                supabase.auth
                    .signIn({
                        email: data.data[0] ? data?.data[0]?.email : email,
                        password,
                    })
                    .then((data) => {
                        if (data.error) {
                            toast(data.error.message);
                        }
                    });
            });
    };

    const logInWithProvider = async (provider: "google" | "github") => {
        supabase.auth
            .signIn({ provider })
            .then((data) => {
                if (data.error) {
                    toast(data.error.message);
                }
            });
    };

    const signOut = () => supabase.auth.signOut();

    supabase.auth.onAuthStateChange((event, userSession) => {
        setSession(userSession);
        setUserProfile(userSession?.user?.user_metadata?.userProfile);
    });

    return (
        <AuthContext.Provider
            value={{
                session,
                userProfile,
                signUp,
                logIn,
                logInWithProvider,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
