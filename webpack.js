import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

export default {
    entry:path.resolve("src/index.jsx"),
    output:{
        path:path.resolve("./Build/"),
        filename: "bundle.js",
        publicPath: "",
        clean: true
    },
    resolve:{
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.css', 
            '.scss',
            '.jpg',
            '.jpeg',
            '.png',
            '.svg',
            '.webp',
            '...'
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve("src/index.html"),
            minify:false,
            scriptLoading:"blocking",
            inject:"body"
        }),
        new MiniCssExtractPlugin({
            filename:"all.css"
        }),
        new CopyPlugin({
            patterns:[{
                from:"src/public",
                to:""
            }]
        })
    ],
    optimization:{
        splitChunks:{
            chunks: 'async'
        },
        chunkIds: "size",
        moduleIds: "size",
        mangleExports: "size"
    },
    performance:{
        hints: false
    },
    devtool:'hidden-source-map',
    target:"web",
    module: {
        rules: [{
            test: /\.ttf/i,
            exclude: /node_modules/,
            loader:"file-loader",
            options: {
                name: 'fonts/ttf/[name]-[contenthash:5].[ext]',
            },
        },{
            test: /\.woff2?/i,
            exclude: /node_modules/,
            loader:"file-loader",
            options: {
                name: 'fonts/woff2/[name]-[contenthash:5].[ext]',
            },
        },{
            test: /\.eot$/i,
            exclude: /node_modules/,
            loader:"file-loader",
            options: {
                name: 'fonts/eot/[name]-[contenthash:5].[ext]',
            },
        },{
            test: /\.(jpe?g|png|svg|web[pm])$/i,
            exclude: /node_modules/,
            loader:"file-loader",
            options: {
                name: 'images/[name]-[contenthash:5].[ext]',
            },
        },/*{
            test: /\.svg$/i,
            exclude: /node_modules/,
            loader:"file-loader",
            options: {
                name: 'images/svg/[name]-[contenthash].[ext]',
            }
        },*/{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            "targets": {
                                "browsers": ["last 2 Chrome versions"]
                            }
                        }
                    ],
                    "@babel/preset-react"
                ],
                plugins: [
                    '@babel/transform-runtime'
                ]
              }
            }
        },{
            test: /\.s[ac]ss$|\.css$/i,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ]
        },{
            test: /\.tsx?$/i,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader',
            }
        }]
    }/*,
    devServer: {
        port: 8080,
        host: '127.0.0.1',
        index:path.resolve(__dirname,"build/index.html"),
        contentBase:path.resolve(__dirname,"build/"),
        open:true
    }*/
}