import { useState, useEffect, createContext, useContext } from "react";

type ThemeType = "theme" | "accent";
type Theme = "light-theme" | "dim-theme" | "dark-theme";
type Accent =
    | "blue-accent"
    | "yellow-accent"
    | "pink-accent"
    | "purple-accent"
    | "orange-accent";

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState<Theme>();
    const [accent, setAccent] = useState<Accent>();

    const changeTheme = (input: Theme | Accent) => {
        input.includes("theme")
            ? setTheme(input as Theme)
            : setAccent(input as Accent);
    };

    const updateTheme = (input: ThemeType) => {
        const newTheme = input == "theme" ? theme : accent;
        Array.from(document.documentElement.classList).forEach((item) => {
            item.includes(input) &&
                document.documentElement.classList.remove(item);
        });
        document.documentElement.classList.add(newTheme);
        localStorage.setItem(input, newTheme);
    };

    useEffect(() => {
        localStorage.getItem("theme")
            ? changeTheme(localStorage.getItem("theme") as Theme)
            : changeTheme(
                  !window?.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "light-theme"
                      : "dark-theme"
              );
        localStorage.getItem("accent")
            ? changeTheme(localStorage.getItem("accent") as Accent)
            : changeTheme("blue-accent");
    }, []);

    useEffect(() => theme && updateTheme("theme"), [theme]);
    useEffect(() => accent && updateTheme("accent"), [accent]);

    return (
        <ThemeContext.Provider value={{ theme, accent, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
