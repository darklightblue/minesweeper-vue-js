module.exports = {
    entry: "./script.js",
    output: {
        path: './',
        filename: "bundle.js"
    },
    module: {
        loaders: [
 			{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
        ]
    }
};