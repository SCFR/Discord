var webpack = require("webpack");


module.exports = {
    entry: "./bundle.js",
    context: __dirname,
    node: {
      __dirname: true,
    },
    externals: "betterdiscord",
    output: {
        path: 'C:/Users/David/AppData/Local/Discord/app-0.0.296/resources/node_modules/StarCitizenFR/lib',
        filename: "StarCitizenFR.plugin.js",
        //libraryTarget: "var",
        //library: "StarCitizenFR",
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
        ]
    },
    plugins: [
      new webpack.BannerPlugin('var StarCitizenFR = function(){};', {raw:true}),
      //new webpack.optimize.UglifyJsPlugin({compress:true}),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('dev'),
          'API_URL': JSON.stringify('https://www.starcitizen.fr/wp-json/')
        }
      }),
    ],
};
