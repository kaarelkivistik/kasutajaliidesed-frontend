var webpack = require("webpack");

module.exports = {
    entry: "./index.js",
    context: __dirname,
    output: {
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ],
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
}