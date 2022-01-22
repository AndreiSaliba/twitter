import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light-theme");
    const [accent, setAccent] = useState("blue-accent");

    const changeTheme = (input) => {
        input.includes("theme") ? setTheme(input) : setAccent(input);
    };

    const updateTheme = (input) => {
        const newTheme = input == "theme" ? theme : accent;
        Array.from(document.documentElement.classList).map((item) => {
            item.includes(input) &&
                document.documentElement.classList.remove(item);
        });
        document.documentElement.classList.add(newTheme);
        localStorage.setItem(input, newTheme);
    };

    useEffect(() => {
        localStorage.getItem("theme") &&
            changeTheme(localStorage.getItem("theme"));
        localStorage.getItem("accent") &&
            changeTheme(localStorage.getItem("accent"));
    }, []);

    useEffect(() => updateTheme("theme"), [theme]);
    useEffect(() => updateTheme("accent"), [accent]);

    return (
        <ThemeContext.Provider value={{ theme, accent, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
