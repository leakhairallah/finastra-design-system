const RemarkHTML = require('remark-html')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
          },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test',
      filename: 'pages/test.html',
      template: 'apps/fds-test-app/src/test.md'
    })
  ]
}