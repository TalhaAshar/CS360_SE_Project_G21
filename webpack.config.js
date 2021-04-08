module.exports = {
  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
    ]
  }
};