const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const LodashWebPackPlugin = require('lodash-webpack-plugin');
const config = {
    resolve: {
        extensions: ['.js', 'json'],
        fallback: {
          'buffer': require.resolve('buffer'),
          'stream': false,
        },
        alias: {
          'crypto-browserify$': path.resolve(__dirname, 'src/crypto-fallback.ts'),
        },
      },
    entry: {
        main: {
            import: './src/index.js'
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React App',
            template: path.resolve(__dirname, './public', 'index.html'),
          }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveReportTo: 'report.html',
            saveOnlyStats: false,
            open: false,
        }),
        new LodashWebPackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use:
                  [
                    'style-loader',
                    'css-loader',
                  ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    ['@babel/preset-react', { runtime: 'automatic' }],
                  ],
                  plugins: ['lodash'],
                },
                exclude: /node_modules/,
                resolve: { extensions: ['.js', '.jsx'] },
            }
        ],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            minChunks: 1,
            chunks: 'all',
            minSize: 100,
        },
        usedExports:true,
        removeAvailableModules: true,
        runtimeChunk: 'single',
        concatenateModules: true,
        moduleIds: 'deterministic',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      open: true,
      hot: true,
      port: 9000,
    },
    devtool: 'inline-source-map',
};
module.exports = config;
