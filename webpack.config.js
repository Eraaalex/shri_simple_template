const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
    resolve: {
        extensions: ['.js', 'json'],
        fallback: {
          'buffer': require.resolve('buffer'),
          
          'stream': false,
        },
        alias: {
          'crypto-brwserify$': path.resolve(__dirname, 'src/crypto-fallback.ts'),
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
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: 'auto',
    },
    mode : 'producton',
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
                test: /\.js$/i,
                use: {
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                  options: {
                    presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic'}]],
                    plugins: ['lodash']
                  },
                },
            }
        ],
    },
    resolve: {
        extentions: ['.js', '.json']
    },
    optimization: {
        minimize: true,
        splitChunks: {
            minChunks: true,

            chunks: 'all',
            minSize: 0,
        },
        usedExports:true,
        removeAvailableModules: true,
        runtimeChunk: 'single',
        concatenateModules: true,
        moduleIds: 'deterministic',
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        hot: true,
        port: 9000,
        open: true
    },
    devtool: 'inline-source-map',
    
};

module.exports = config;
