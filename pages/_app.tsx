import { ElementType } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster, resolveValue } from "react-hot-toast";
import { supabase } from "@utils/supabaseClient";
import { ThemeProvider } from "@context/Theme";
import { AuthProvider } from "@context/Auth";
import DisplayModal from "@components/modals/DisplayModal";
import "@styles/globals.css";
import "../node_modules/draft-js/dist/Draft.css";
import { register } from "timeago.js";
import { tweetTimeFormat } from "@utils/FormatTime";
import "react-tooltip/dist/react-tooltip.css";

type ComponentWithPageLayout = AppProps & {
    Component: AppProps["Component"] & {
        PageLayout?: ElementType;
    };
};

export default function MyApp({
    Component,
    pageProps,
}: ComponentWithPageLayout) {
    register("tweet-format", tweetTimeFormat);

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
                    {Component.PageLayout ? (
                        <Component.PageLayout>
                            <Component {...pageProps} />
                        </Component.PageLayout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                    <DisplayModal />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
