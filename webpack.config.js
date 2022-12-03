const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin")

const distPath = path.resolve(__dirname, "dist")

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "/src/index.tsx"),

	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
    output: {
        filename: "[name].bundle.js",
        path: distPath
    },

    devtool: "inline-source-map",

	plugins: [
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: distPath
		}),
		new MiniCssExtractPlugin({
			filename: "[name].bundle.css"
		}),
		new HtmlWebPackPlugin()
    ],
    module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader"
			}, {
				test: /\.css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader }, 
					"css-loader"
				]
			}, {
				test: /\.(glsl)$/,
				use: "ts-shader-loader"
			}
		]
    },
	optimization: {
		splitChunks: {
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	devServer: {
		static: distPath,
		port: 3000,
		watchFiles: [path.resolve(__dirname, "/src")],
		liveReload: true
	},
}