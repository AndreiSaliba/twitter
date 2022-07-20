import { createContext, useContext, useState } from "react";
import { supabase } from "@utils/supabaseClient";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

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
                    redirectTo: "/home",
                }
            )
            .then((data) => {
                console.log(data);
                setCurrentUser(data);
            });
    };

    const logIn = async (email: string, password: string) => {
        supabase
            .from("profile")
            .select("email")
            .eq("username", email)
            .then((data) => {
                supabase.auth
                    .signIn(
                        {
                            email: data.data[0] ? data?.data[0]?.email : email,
                            password,
                        },
                        {
                            redirectTo: "/home",
                        }
                    )
                    .then((data) => {
                        console.log(data);
                        setCurrentUser(data);
                    });
            });
    };

    const logInWithProvider = async (provider: "google" | "github") => {
        supabase.auth
            .signIn({ provider }, { redirectTo: "/home" })
            .then((data) => {
                console.log(data);
                setCurrentUser(data);
            });
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, signUp, logIn, logInWithProvider }}
        >
            {children}
        </AuthContext.Provider>
    );
};
