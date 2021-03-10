const webpack = require('webpack');
const { getEnvironment } = require('universal-dotenv');

module.exports = {
  plugins: [
    new webpack.DefinePlugin(getEnvironment().webpack),
    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(new Date().getTime()), // This creates a unique ID for every build
      },
    }),
  ],
};
