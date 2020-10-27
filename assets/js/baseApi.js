//开发地址
var local = 'http://ajax.frontend.itheima.net'
// ................................

$.ajaxPrefilter(function(param) {
    console.log(param.url);
    param.url = local + param.url
    console.log(param.url);
})