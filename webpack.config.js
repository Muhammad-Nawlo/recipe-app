const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ["babel-polyfill", path.resolve(__dirname, "src/js/index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name][contenthash].js",
    assetModuleFilename: "[name][ext]",
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    hot: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      { test: /\.(jpg|jpeg|gif|svg|png)$/i, type: "assets/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
