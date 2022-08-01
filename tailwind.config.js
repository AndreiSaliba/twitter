const { themeVariants } = require("tailwindcss-theme-variants");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dim: "#15202b",
                blue: "#1d9bf0",
                yellow: "#ffd400",
                pink: "#f91880",
                purple: "#7856ff",
                orange: "#ff7a00",
                green: "#00ba7c",
            },
            screens: {
                xs: { max: "440px" },
                xl: { max: "1264px" },
            },
            scale: {
                80: ".80",
                85: ".85",
            },
            fontFamily: {
                TwitterChirp: [
                    '"TwitterChirp"',
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [
        themeVariants({
            themes: {
                light: {
                    selector: ".light-theme",
                },
                dim: {
                    selector: ".dim-theme",
                },
                dark: {
                    selector: ".dark-theme",
                },
            },
        }),
        themeVariants({
            themes: {
                blue: {
                    selector: ".blue-accent",
                },
                yellow: {
                    selector: ".yellow-accent",
                },
                pink: {
                    selector: ".pink-accent",
                },
                purple: {
                    selector: ".purple-accent",
                },
                orange: {
                    selector: ".orange-accent",
                },
                green: {
                    selector: ".green-accent",
                },
            },
        }),
    ],
};
