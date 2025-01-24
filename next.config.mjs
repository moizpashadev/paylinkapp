/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['app2.kuickpay.com'], // Add your image host domain here
//     },
// };
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'app2.kuickpay.com',
            },
        ],
    },
};

export default nextConfig;
