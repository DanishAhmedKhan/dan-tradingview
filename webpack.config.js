const path = require("path")

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/ChartMain.ts",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]-bundle.js",
        library: {
            name: "Danish",
            type: "umd",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
}
