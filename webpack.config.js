const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require("path");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
  entry: "./public/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  mode: "development",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
  ],

  plugins: [
    new WebpackPwaManifest({
      // the name of the generated manifest file
      filename: "manifest.json",
      inject: false,
      // set fingerprints to `false` to make the names of the generated
      // files predictable making it easier to refer to them in our code
      fingerprints: false,
      name: "IndexBudget Tracker PWA",
      short_name: "Index Budget",
      theme_color: "#e6f542",
      background_color: "#e6f542",
      start_url: "/",
      display: "fullscreen",
      orientation: "landscape",
      icons: [
        {
          src: path.resolve(__dirname, "public/icons/icon-512x512.png"),
          // the plugin will generate an image for each size

          size: [72, 96, 128, 144, 152, 192, 384, 512],
        },
      ],
    }),
  ],
  // For files ending with .js, we will use babel-loader with preset-env
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: "./public",
    publicPath: "/dist",
  },
};

module.exports = config;
