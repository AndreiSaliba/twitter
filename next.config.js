/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "abs.twimg.com",
            "pbs.twimg.com",
        ],
    },
    experimental: { images: { allowFutureImage: true } },
};
