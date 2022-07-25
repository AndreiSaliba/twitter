import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@context/Theme";
import { AuthProvider } from "@context/Auth";
import { Toaster } from "react-hot-toast";
import "@styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Twitter</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <ThemeProvider>
                <AuthProvider>
                    <Toaster />
                    <Component {...pageProps} />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
