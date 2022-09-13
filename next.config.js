/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  compiler: {
    emotion:
      true |
      {
        // default is true. It will be disabled when build type is production.
        sourceMap: true,
        // default is 'dev-only'.
        autoLabel: 'dev-only',
        // default is '[local]'.
        // Allowed values: `[local]` `[filename]` and `[dirname]`
        // This option only works when autoLabel is set to 'dev-only' or 'always'.
        // It allows you to define the format of the resulting label.
        // The format is defined via string where variable parts are enclosed in square brackets [].
        // For example labelFormat: "my-classname--[local]", where [local] will be replaced with the name of the variable the result is assigned to.
        labelFormat: '[local]',
      },
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['images.prismic.io', 'betterbetter.cdn.prismic.io'],
  },
};

module.exports = nextConfig;
