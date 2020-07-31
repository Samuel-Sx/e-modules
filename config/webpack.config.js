const Config = require('webpack-chain')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const Path = require('path');
const enters = require('./utils').getEntersInfo('package')
const config = new Config();


config
    .mode(process.env.PKG_ENV)
    .end()

config
    .target('web')
    .end()

config
    .entry('index')
    .add(Path.resolve(__dirname, '../package/main.js'))

for(let enter of enters){
    config.entry(enter.name).add(enter.path)
}

config
    // 出口
    .output
    .path(Path.resolve(__dirname, '../bundle'))
    .filename('[name].js')
    .libraryTarget('umd')
    .end()

config
    .module
    .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
            .loader('vue-loader')
            .end()
        .end()
    .rule('js')
        .test(/\.js$/)
        .exclude
            .add(Path.resolve(__dirname, '../node_modules'))
            .end()
        .use('babel-loader')
            .loader('babel-loader')
            .end()
        .end()
    .rule('less')
        .test(/\.less$/)
        .use('less-loader')
            .loader('css-loader')
                .options({
                    minimize:true
                })
            .loader('less-loader')
            .end()
        .end()

config
    .plugin('clean')
        .use(CleanWebpackPlugin)
        .end()
    .plugin('vue-loader')
        .use(VueLoaderPlugin)
        .end()

module.exports = config.toConfig()