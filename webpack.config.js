// const path = require('path');
// const webpack = require('webpack');
// const CURRENT_WORKING_DIR = process.cwd();

// const config = {
//     name: "browser",
//     mode: "development",
//     devtool: 'eval-source-map',
//     entry: [
//         'babel-polyfill',
//         'webpack-hot-middleware/client?reload=true',
//         path.join(CURRENT_WORKING_DIR, 'client/src/index.js')
//     ],
//     output: {
//       path: path.join(__dirname,'client', 'public', 'dist'),
//       filename: 'bundle.js',
//       publicPath: '/dist/'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 use: [
//                     'babel-loader'
//                 ]
//             },
//             {
//                 test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
//                 use: 'file-loader'
//             }
//         ]
//     },  plugins: [
//           new webpack.HotModuleReplacementPlugin(),
//           new webpack.NoEmitOnErrorsPlugin()
//       ],
//       devServer: {
//         contentBase: path.join(__dirname, 'client', 'public'),
//         historyApiFallback: true,
//         publicPath: '/dist/'
//       }
// };

// module.exports = config;