import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { Toaster, resolveValue } from "react-hot-toast";
import { supabase } from "@utils/supabaseClient";
import { ThemeProvider } from "@context/Theme";
import { AuthProvider } from "@context/Auth";
import { DatabaseProvider } from "@context/Database";
import "@styles/globals.css";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
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
                        {getLayout(<Component {...pageProps} />)}
                    </DatabaseProvider>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
