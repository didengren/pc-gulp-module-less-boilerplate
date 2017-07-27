var gulp = require("gulp"),
	jade = require("gulp-jade"),
	path = require("path"),
	rename = require('gulp-rename'),
	less = require("./lessConfig.js"),
	babel = require("./babelConfig.js"),
	glob = require("glob"),
	imagemin = require('gulp-imagemin'),
	replace = require("gulp-replace");

// 编译Jade文件
function compileJade() {
	return gulp.src('./src/compenents/**/*.layout.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(rename(function(path) {
			path.basename = "index";
		}))
		.pipe(gulp.dest('./dist/compenents/'));
}
var options = {};
//图片迁移
function migirateImage() {

	gulp.src('./app/compenents/**/img/*')
		.pipe(gulp.dest('./build/compenents'));
	gulp.src('./app/compenents/**/asset/*')
		.pipe(gulp.dest('./build/compenents'));	

	gulp.src('./app/compenents/**/img/*')
		.pipe(rename(function(path) {
			path.dirname = "";
		}))
		.pipe(gulp.dest('./build/css/img/'));
	return gulp.src('./app/compenents/**/asset/*')
		.pipe(rename(function(path) {
			path.dirname = "";
		}))
		.pipe(gulp.dest('./build/asset'));
}

module.exports = {
	//添加对应的观察
	addCompenentsWatch: () => {
		//LESS
		gulp.watch('./app/compenents/**/*.less', function(event) {
			console.log("组件中的LESS发生了变化_(:з」∠)_");
			console.log('LESS File ' + event.path + ' was ' + event.type + ', running tasks...');

			less.devCompenentsLess();
		});
		//BABEL
		gulp.watch('./app/compenents/**/*.js', function(event) {
			console.log("组件中的JS发生了变化_(:з」∠)_");
			console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...');

			babel.devCompenentsBabel();
		});
		//JADE
		gulp.watch('../app/compenents/**/*.jade', function(event) {
			var fileDir = path.dirname(event.path);
			console.log("组件中的JADE发生了变化_(:з」∠)_");
			console.log('JADE File ' + event.path + ' was ' + event.type + ', running tasks...');
			return compileJade();
		});
		//图片
		gulp.watch('./app/asset/*', function(event) {
			var fileDir = path.dirname(event.path);
			console.log("组件中的图片发生了变化_(:з」∠)_");
			console.log('IMAGE File ' + event.path + ' was ' + event.type + ', running tasks...');
			return migirateImage();
		});
		gulp.watch('./app/less/img/*', function(event) {
			var fileDir = path.dirname(event.path);
			console.log("组件中的图片发生了变化_(:з」∠)_");
			console.log('IMAGE File ' + event.path + ' was ' + event.type + ', running tasks...');
			return migirateImage();
		});
	},
	//之前的预处理
	handleCompenents: () => {
		//LESS
		console.log('处理组件Less _(:з」∠)_');
		less.devCompenentsLess();
		//BABEL
		console.log('处理组件ES6 _(:з」∠)_');
		babel.devCompenentsBabel();
		//IMAGE
		console.log('组件图片正在努力复制_(:з)∠)_');
		migirateImage();
		//JADE
		console.log('处理组件Jade_(:з」∠)_');
		return compileJade();
	},
	publishCompenentsImage: () => {
		gulp.src('./app/compenents/**/img/*')
			.pipe(imagemin())
			.pipe(rename(function(path) {
				path.dirname = "";
			}))
			.pipe(gulp.dest('./public/css/img/'));
		return gulp.src('./app/compenents/**/asset/*')
			.pipe(imagemin())
			.pipe(rename(function(path) {
				path.dirname = "";
			}))
			.pipe(gulp.dest('./public/asset'));
	}
};