const path = require("path");
// подключили плагины
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: { main: "./src/pages/index.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: "",
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: "babel-loader",
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: "/node_modules/",
            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource",
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",

                        // добавили объект options. Значение 1 говорит о том,
                        // что некоторые трансформации PostCSS нужно применить до css-loader
                        options: { importLoaders: 1 },
                    },
                    "postcss-loader",
                ],
            },
        ],
    },
    // добавили массив
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // путь к файлу index.html
        }),
        // используем плагины
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin(), // - плагин для объединения файлов
    ],
};
