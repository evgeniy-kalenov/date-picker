const webpack = require("webpack");
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{loader: "ts-loader"}]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.less$/, use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            plugins: [
                                new LessPluginCleanCSS({advanced: true}),
                                new LessPluginAutoPrefix({browsers: ["last 5 versions"]}),
                                // new webpack.ProvidePlugin({
                                //     $: "jquery",
                                //     jQuery: "jquery",
                                //     "window.jQuery": "jquery",
                                //     moment: "moment",
                                //     "window.moment": "moment",
                                //     "_": "underscore"
                                // })
                            ],
                            paths: __dirname + '/node_modules'
                        }
                    }]
            },

        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx']
    },
    devServer: {
        contentBase: './dist'
    }
};