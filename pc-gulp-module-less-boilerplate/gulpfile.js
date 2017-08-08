"use strict"

var gulp = require("gulp"),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	jade = require("gulp-jade"),
	browserify = require('browserify'),
	babel = require('./gulpconfig/babelConfig.js'),
	less = require('./gulpconfig/lessConfig.js'),
	compenent = require('./gulpconfig/compenentConfig.js'),
	clean = require('del'),
	runSequence = require('gulp-run-sequence'),
	imagemin = require('gulp-imagemin'),
	fileinclude = require('gulp-file-include');

/**********************************************************
	开发模式(默认)
**********************************************************/
gulp.task('default', ['dev']);

// 设置监控 
// gulp.task('dev', ['lessDev', 'jadeDev', 'babelDev', 'imgDev', 'libDev',
// 	'browser-start', 'watchCompenents'
// ], function() {
// 	console.log("正在努力开启开发模式_(:з)∠)_");
// 	gulp.watch('./src/assets/images/*', ['imgDev']);
// 	gulp.watch('./src/assets/css/*.less', ['lessDev']);
// 	gulp.watch('./src/views/*.jade', ['jadeDev']);
// 	gulp.watch('./src/assets/js/*.js', ['babelDev']);
// 	//监控build文件下的变化
// 	gulp.watch(['./dist/views/*.html', './dist/assets/js/*.js', './dist/assets/css/*.css',
// 		'./dist/compenents/**/*.{html,js,css}'
// 	], ['browser-reload']);
// });
gulp.task('dev', ['css', 'lessDev', 'html', 'babelDev', 'imgDev', 'libDev', 'includeDev',
	'browser-start'], function() {
	console.log("正在努力开启开发模式_(:з)∠)_");
	gulp.watch('./src/assets/images/*', ['imgDev']);
	gulp.watch('./src/assets/css/**/*.css', ['css']);
	gulp.watch('./src/assets/css/**/*.less', ['lessDev']);
	gulp.watch('./src/views/**/*.html', ['html']);
	gulp.watch('./src/assets/js/**/*.js', ['babelDev', 'libDev', 'includeDev']);
	//监控build文件下的变化
	gulp.watch(['./dist/views/**/*.html', './dist/assets/js/**/*.js', './dist/assets/css/*.css'], ['browser-reload']);
});

// 编译Less
gulp.task('lessDev', function() {
	console.log('LESS正在努力编译_(:з)∠)_');
	return less.compileLess();
});

// 编译ES6
gulp.task('babelDev', function(cb) {
	console.log('ES6正在努力编译_(:з)∠)_');
	return babel.runWebPack(cb);
});


//html文件处理
gulp.task('html', function() {
	console.log('HTML正在努力编译_(:з)∠)_');
	return gulp.src('./src/views/**/*.html')
	    .pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
		.pipe(gulp.dest('./dist/views/'));
});

//css文件处理
gulp.task('css', function() {
	console.log('HTML正在努力编译_(:з)∠)_');
	return gulp.src('./src/assets/css/**/*.css')
		.pipe(gulp.dest('./dist/assets/css'));
});

// 编译Jade
gulp.task('jadeDev', function() {
	console.log('JADE正在努力编译_(:з)∠)_');
	var YOUR_LOCALS = {};
	return gulp.src('./src/views/*.jade')
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe(gulp.dest('./dist/views/'));
});

// 图片处理
gulp.task('imgDev', function() {
	console.log('图片正在努力复制_(:з)∠)_');
	return gulp.src('./src/assets/images/*')
		.pipe(gulp.dest('./dist/assets/images'));
});

// 复制第三方库
gulp.task('libDev', function() {
	console.log('第三方Lib也在努力复制_(:з)∠)_');
	return gulp.src('./src/assets/js/lib/**')
		.pipe(gulp.dest('./dist/assets/js/lib/'));
});

// 复制公共js
gulp.task('includeDev', function() {
	console.log('第三方Lib也在努力复制_(:з)∠)_');
	return gulp.src('./src/assets/js/include/**')
		.pipe(gulp.dest('./dist/assets/js/include/'));
});

/**********************************************************
	搭建静态服务器
**********************************************************/
gulp.task('browser-start', function() {
	console.log('服务器正在努力开启,等服务器提供IP吧_(:з)∠)_');
	return browserSync.init({
		files: ['views/**/*.html'],
		server: {
			baseDir: "./dist/",
			index: "views/index.html",
			online: true
		}
	});
});

// 服务器重载（刷新）
gulp.task('browser-reload', function() {
	console.log('浏览器正在努力刷新_(:з)∠)_');
	browserSync.reload();
});

/**********************************************************
	生产模式
**********************************************************/

// gulp.task('publish', function(cb) {
// 	console.log('_(:з」∠)_正在努力为你生产最终代码_(:з」∠)_');
// 	runSequence('clean', 'imgMinPublish',
// 		'jadePublish', 'libPublish', 'babelPublish', 'lessPublish',
// 		'publishCompents', cb);
// });
gulp.task('publish', function(cb) {
	console.log('_(:з」∠)_正在努力为你生产最终代码_(:з」∠)_');
	runSequence('clean', 'imgMinPublish',
		'html', 'libPublish', 'includePublish', 'babelPublish', 'css', 'lessPublish', cb);
});

//清空文件夹
gulp.task('clean', function() {
	return clean([
		'./dist'
	], {
		force: true
	});
});

// 图片压缩 发布模式
gulp.task('imgMinPublish', function() {
	console.log('图片正在努力压缩_(:з)∠)_');
	return gulp.src('./src/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/assets/images'));
});

// 发布jade
gulp.task('jadePublish', ['jadeDev'], function() {
	console.log('JADE正在努力生产_(:з)∠)_');
	var YOUR_LOCALS = {};
	return gulp.src('./src/views/*.jade')
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe(gulp.dest('./dist/views/'));
});

// 发布第三方库
gulp.task('libPublish', function() {
	console.log('第三方Lib也在努力复制_(:з)∠)_');
	return gulp.src('./src/assets/js/lib/**')
		.pipe(gulp.dest('./dist/assets/js/lib/'));
});

// 发布公共js
gulp.task('includePublish', function() {
	console.log('第三方Lib也在努力复制_(:з)∠)_');
	return gulp.src('./src/assets/js/include/**')
		.pipe(gulp.dest('./dist/assets/js/include/'));
});

// 生产ES6
gulp.task('babelPublish', function(cb) {
	console.log('ES6正在努力生产_(:з)∠)_');
	return babel.publishWebPack(cb);
});

// 生产LESS
gulp.task('lessPublish', function() {
	console.log('LESS正在努力生产_(:з)∠)_');
	return less.publishLess();
});

/**********************************************************
	组件开发模式
**********************************************************/
gulp.task('watchCompenents', ['devCompenents'], function() {
	console.log('观察Compenents发生的变化ing _(:з」∠)_');
	return compenent.addCompenentsWatch();
});

gulp.task('devCompenents', function() {
	console.log('编译Compenents中 _(:з」∠)_');
	return compenent.handleCompenents();
});

gulp.task('publishCompents', function() {
	console.log("迁移组件中的文件");
	return compenent.publishCompenentsImage();
})
