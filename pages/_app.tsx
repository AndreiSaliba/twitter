import Head from "next/head";
import { Toaster, resolveValue } from "react-hot-toast";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@context/Theme";
import { AuthProvider } from "@context/Auth";
import { supabase } from "@utils/supabaseClient";
import "@styles/globals.css";
import { DatabaseProvider } from "@context/Database";

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
                    <DatabaseProvider>
                        <Toaster position="bottom-center">
                            {(t) => (
                                <div
                                    className={`rounded-[5px] py-2.5 px-3 leading-none text-white ${
                                        supabase.auth.session()
                                            ? "bg-accent"
                                            : "bg-blue"
                                    }`}
                                >
                                    {resolveValue(t.message, t)}
                                </div>
                            )}
                        </Toaster>
                        <Component {...pageProps} />
                    </DatabaseProvider>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
