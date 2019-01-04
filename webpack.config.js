const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
    env = env ? env : {}; //环境变量
    const mode = env.production ? "production" : "development"; //开发或生产模式
    const devtool = env.production || env.nodevtool ? "" : "source-map"; //
    const entry = {}; 
    const plugins = [];
    const optimization = {};  //优化选项
    const minimizer = []; //优化选项：瘦身器
    const libraryTarget = env.amd ? 'amd' : env.umd ? 'umd' :  env.cjs ? 'commonjs' : env.old ? 'umd' : 'commonjs';
    const distDir = path.resolve(__dirname, 'dist');
    entry['http'] = "./src/index.js";
    optimization['minimizer'] = minimizer;  

    if (env.production) { //生产模式
        minimizer.push(
            new UglifyJsPlugin()
        )
    }


    return {
        mode: mode,
        entry: entry,
        devtool: devtool,
        output: {
            path: distDir,
            libraryTarget: libraryTarget,
            filename: "[name].js"
        },
        resolve: {
            extensions: [".js"]
        },

        plugins: plugins,
        optimization: optimization,
        plugins: plugins,
        // externals: {
        //     'fs': 'NodeFS', 
        //     // 'uws': 'NodeUWS',
        //     'http': 'NodeHTTP'
        // }
    }
}

