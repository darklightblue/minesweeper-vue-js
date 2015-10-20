module.exports = {
    entry: "./js/script.js",
    output: {
        path: './js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
 			{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
        ]
    }
};