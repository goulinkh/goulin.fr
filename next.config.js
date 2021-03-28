const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')(['react-spring']);

const baseUrl = '';

module.exports = withTM(
  withBundleAnalyzer({
    images: {
      domains: ['github.com'],
    },
    poweredByHeader: false,
    trailingSlash: true,
    basePath: baseUrl,
    env: {
      baseUrl: baseUrl,
    },
    i18n,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      });

      return config;
    },
  })
);
