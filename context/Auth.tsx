import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@utils/supabaseClient";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

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
                if (data.error) {
                    toast(data.error.message, {
                        position: "bottom-center",
                        style: {
                            padding: "5px",
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#329eeb",
                        },
                    });
                }
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
                        if (data.error) {
                            toast(data.error.message, {
                                position: "bottom-center",
                                style: {
                                    padding: "5px",
                                    color: "white",
                                    borderRadius: "5px",
                                    backgroundColor: "#329eeb",
                                },
                            });
                        }
                    });
            });
    };

    const logInWithProvider = async (provider: "google" | "github") => {
        supabase.auth
            .signIn({ provider }, { redirectTo: "/home" })
            .then((data) => {
                if (data.error) {
                    toast(data.error.message, {
                        position: "bottom-center",
                        style: {
                            padding: "5px",
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#329eeb",
                        },
                    });
                }
            });
    };

    useEffect(() => {
        supabase.auth.onAuthStateChange((_, session) => {
            console.log(session);
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{ session, signUp, logIn, logInWithProvider }}
        >
            {children}
        </AuthContext.Provider>
    );
};
