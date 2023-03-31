const webpack = require("webpack");
const IgnorePlugin = webpack.IgnorePlugin;

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    path: require.resolve("path-browserify"),
    constants: require.resolve("constants-browserify"),
    zlib: require.resolve("browserify-zlib"),
    fs: false,
    net: false,
    tls: false,
    child_process: false,
    dns: false,
    http2: false,
    readline: false,
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.IgnorePlugin({ resourceRegExp: /^dns$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /^http2$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /^puppeteer$/ }),
  ]);
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
