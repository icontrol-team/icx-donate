const TerserPlugin = require("terser-webpack-plugin");

let fs = require("fs");

const path = require('path')

var package = fs.readFileSync("package.json", "utf-8");
package = JSON.parse(package);

module.exports = {
    entry: "./index.js",
    // path: path.resolve(__dirname, 'dist'),
    output: {
        // filename:  "dist/" + package.name + ".js"
        filename:  package.name + ".js"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: false,
                parallel: false,
            })
        ]
    }


};
