import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@context/Theme";
import "@styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Twitter</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
