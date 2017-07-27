var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), './src/assets/');
// 获取入口文件
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log("_(:з」∠)_我们需要编译这些js文件：");
    console.log(files);
    return files;
}

module.exports = {
    entry: getEntry(), //获取项目入口js文件
    output: {
        path: path.join(__dirname, "../dist/assets/js/"), //文件输出目录
        filename: "[name].js", //根据入口文件输出的对应多个文件名
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};