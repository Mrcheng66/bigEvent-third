//开发地址
var local = 'http://ajax.frontend.itheima.net'
// ................................

$.ajaxPrefilter(function(param) {
    // console.log(param.url);
    param.url = local + param.url
    // console.log(param.url);

    // 如果param的url 含有/my则 需要给页面添加headers属性 及其值
    if(param.url.indexOf('/my/') !==-1) {
        param.headers = {
            Authorization: localStorage.getItem('token')||''
        }
    }
})