import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState();
    const [accent, setAccent] = useState();

    const changeTheme = (theme) => {
        theme.includes("theme") ? setTheme(theme) : setAccent(theme);
    };

    useEffect(() => {
        changeTheme(localStorage.getItem("theme"));
        changeTheme(localStorage.getItem("accent"));
    }, []);

    useEffect(() => {
        Array.from(document.documentElement.classList).map((item) => {
            console.log;
            item.includes("theme") &&
                document.documentElement.classList.remove(item);
        });
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        Array.from(document.documentElement.classList).map((item) => {
            item.includes("accent") &&
                document.documentElement.classList.remove(item);
        });
        document.documentElement.classList.add(accent);
        localStorage.setItem("accent", accent);
    }, [accent]);

    return (
        <ThemeContext.Provider value={{ theme, accent, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
