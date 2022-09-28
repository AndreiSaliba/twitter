/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "abs.twimg.com",
            "pbs.twimg.com",
        ],
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //     },
        // ],
    },
    // experimental: { images: { allowFutureImage: true } },
    async rewrites() {
        return [
            {
                source: "/i/display",
                destination: "/home/?display=true",
            },
            {
                source: "/settings/profile",
                destination: "/home/?editProfile=true",
            },
        ];
    },
};
