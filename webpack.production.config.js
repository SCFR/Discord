var webpack = require("webpack");
var WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = {
    entry: "./bundle.js",
    context: __dirname,
    node: {
      __dirname: true,
    },
    output: {
        path: __dirname + "/dist/win",
        filename: "StarCitizenFR.plugin.js",
        //libraryTarget: "var",
        //library: "StarCitizenFR",
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.BannerPlugin('var StarCitizenFR = function(){};', {raw:true}),
      new webpack.optimize.UglifyJsPlugin({compress:true}),
      new webpack.BannerPlugin('//META{"name":"StarCitizenFR"}*//', {raw:true}),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production'),
          'API_URL': JSON.stringify('https://www.starcitizen.fr/wp-json/')
        }
      }),
      new WebpackShellPlugin({onBuildEnd: ['prod.bat']}),
    ],
};
