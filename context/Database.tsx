import { createContext, useContext } from "react";
import { supabase } from "@utils/supabaseClient";

const DatabaseContext = createContext(null);

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
    const getUser = async (username: string) => {
        const { data } = await supabase
            .from("profile")
            .select()
            .ilike("username", username);
        return data[0];
    };

    return (
        <DatabaseContext.Provider value={{ getUser }}>
            {children}
        </DatabaseContext.Provider>
    );
};
