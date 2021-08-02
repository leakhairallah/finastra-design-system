const RemarkHTML = require('remark-html')

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        type: "asset/resource",
        generator: {
          filename: "[name].html",
        },
      },
      {
        test: /\.md?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'remark-loader',
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          }
        ]
      }
    ]
  }
}